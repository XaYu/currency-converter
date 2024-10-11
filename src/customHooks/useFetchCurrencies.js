import { useCallback, useState } from 'react';

import { getTicker } from '../services/converterService';
import { useCachedRequestDataFetch } from '../data/customHooks/useCachedRequestDataFetch';

const DEFAULT_CURRENCY_CODE = 'USD';
const CACHE_KEY = 'cachedCurrencies';
const CACHE_TIMEOUT = 50000;

export const useFetchCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);

  const doFetch = useCallback(
    (value) => getTicker(value || DEFAULT_CURRENCY_CODE)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),
    [],
  );

  const { doRequest } = useCachedRequestDataFetch(
    doFetch,
    CACHE_KEY,
    CACHE_TIMEOUT,
  );

  const fetchCurrencies = useCallback(
    (value) => {
      doRequest(value).then((res) => setCurrencies(res));
    },
    [doRequest],
  );

  return { currencies, fetchCurrencies };
};

export default useFetchCurrencies;
