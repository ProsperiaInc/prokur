import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanyRfpsDetails } from 'store/slices/user';
import get from 'lodash/get';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'utils/constants';

const useLoadRfpDetails = (rfpId) => {
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const myRfps = useSelector((state) => get(state, 'user.rfp', {}));
  const rfpDetail = useSelector((state) => get(state, `user.rfpDetails[${rfpId}]`, undefined));

  const loadRfpsDetail = useCallback(async () => {
    try {
      const myRfp = myRfps.find((rfp) => rfp.id === rfpId);
      if (myRfp) {
        await dispatch(getCompanyRfpsDetails(rfpId));
        setLoaded(true);
      } else {
        setLoaded(false);
      }
    } catch (error) {
      history.replace(ROUTES.DASHBOARD);
    }
  }, [history, rfpId]);

  useEffect(() => {
    if (!rfpDetail && +rfpId !== 0) {
      loadRfpsDetail();
    }
  }, [rfpDetail, rfpId]);

  if (+rfpId === 0 || rfpDetail) {
    return { loaded: true, rfpDetail };
  }

  return { rfpDetail, loaded };
};

export default useLoadRfpDetails;
