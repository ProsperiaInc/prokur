import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProposalDetails } from 'store/slices/user';
import get from 'lodash/get';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'utils/constants';

const useLoadProposalDetails = (proposalId) => {
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const proposalDetails = useSelector((state) => get(state, 'user.proposalDetails', {}));

  const loadProposalDetails = useCallback(() => {
    try {
      dispatch(getProposalDetails(proposalId));
    } catch (error) {
      this.logger.error('error getting proposal details', error);
      setLoaded(false);
      history.replace(ROUTES.DASHBOARD_MY_RFPS);
    }
  }, [history, proposalId]);

  useEffect(() => {
    if (!proposalDetails?.rfp && +proposalId) {
      loadProposalDetails();
    } else {
      setLoaded(true);
    }
  }, [proposalDetails, proposalId]);

  if (!+proposalId || proposalDetails?.rfp) {
    return { loaded: true, proposalDetails };
  }

  return { proposalDetails, loaded };
};

export default useLoadProposalDetails;
