import { useCallback, useState, useEffect } from 'react';

import { getTicker } from '../services/converterService';
import { useCachedRequestDataFetch } from '../data/customHooks/useCachedRequestDataFetch';

const CACHE_KEY = 'cachedCurrencies';
const CACHE_TIMEOUT = 50000;

export const useFetchCurrencies = (defaultCurrencyCode) => {
  const [currencies, setCurrencies] = useState([]);

  const doFetch = useCallback(
    (value) => getTicker(value || defaultCurrencyCode)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),
    [defaultCurrencyCode],
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

  useEffect(() => {
    fetchCurrencies();

    return () => {};
  }, [fetchCurrencies]);

  return { currencies, fetchCurrencies };
};

export default useFetchCurrencies;
