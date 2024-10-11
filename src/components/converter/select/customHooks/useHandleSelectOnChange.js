import { useCallback } from 'react';

const useHandleSelectOnChange = (setCurrencyValue, fetchCurrencies) => {
  const onChange = useCallback(
    ({ value }) => {
      setCurrencyValue(value);
      fetchCurrencies(value);
    },
    [fetchCurrencies, setCurrencyValue],
  );

  return { onChange };
};

export default useHandleSelectOnChange;
