import { useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import { getProductDetails, getProductMedia } from '../../store/slices/user';
import { ROUTES } from '../../utils/constants';
import Logger from '../../utils/logger';

const logger = new Logger('/src/components/Hooks/useLoadProductDetails.js');

const useLoadProductDetails = (productId) => {
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => get(state, `user.product[${productId}]`, undefined));
  const productMedia = useSelector((state) => get(state, `user.productMedia[${productId}]`, undefined));

  const loadProductDetail = useCallback(async () => {
    try {
      await dispatch(getProductDetails(productId));
      setLoaded(true);
    } catch (err) {
      logger.error(err);
      history.replace(ROUTES.DASHBOARD);
    }
  }, [history, productId]);

  useEffect(() => {
    if (!productDetail && +productId !== 0) {
      loadProductDetail();
    }
  }, [productDetail, productId]);


  useEffect(() => {
    if (+productId) {
      dispatch(getProductMedia(productId));
    }
  }, [productDetail])

  if (+productId === 0 || productDetail) {
    return { loaded: true, productDetail, productMedia };
  }

  return { productDetail, productMedia, loaded };
};

export default useLoadProductDetails;
