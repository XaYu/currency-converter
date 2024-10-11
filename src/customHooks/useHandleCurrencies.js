import React, {
  useCallback, useMemo, useState, useEffect,
} from 'react';

import { CurrencyConverterSelectItem } from '../components/converter/select/selectItem/selectItem';

const NR_OF_CURRENCIES = 10;

export const useHandleCurrencies = (currencies, defaultCurrencyCode) => {
  const [currencyValue, setCurrencyValue] = useState();
  const [shuffledCurrencies, setShuffledCurrencies] = useState([]);
  const [defaultCurrencyValue, setDefaultCurrencyValue] = useState();

  const currenciesValues = useMemo(() => {
    if (!currencies || currencies.length === 0) {
      return [];
    }

    const values = [...new Set(currencies.map((item) => item.currency))];

    const pairedValues = values.map((item) => ({
      value: item,
      label: (
        <CurrencyConverterSelectItem key={item}>
          {item}
        </CurrencyConverterSelectItem>
      ),
    }));

    return pairedValues;
  }, [currencies]);

  const getShuffledCurrencies = useCallback(
    () => currencies
      .filter(
        ({ currency }) => currency !== (currencyValue || defaultCurrencyCode),
      )
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, NR_OF_CURRENCIES),

    [currencies, currencyValue, defaultCurrencyCode],
  );

  useEffect(() => {
    setDefaultCurrencyValue((prevValue) => {
      if (currenciesValues.length > 0 && !prevValue) {
        return currenciesValues.find(
          ({ value }) => value === defaultCurrencyCode,
        );
      }
      return prevValue;
    });

    return () => {};
  }, [currenciesValues, defaultCurrencyCode]);

  useEffect(() => {
    if (currenciesValues.length > 0) {
      setShuffledCurrencies(getShuffledCurrencies());
    }

    return () => {};
  }, [currenciesValues, getShuffledCurrencies]);

  return {
    currenciesValues,
    setCurrencyValue,
    shuffledCurrencies,
    defaultCurrencyValue,
  };
};

export default useHandleCurrencies;
