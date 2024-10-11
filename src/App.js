import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
} from 'react';

import { CurrencyConverterTitle } from './components/title/title';
import { CurrencyConverterText } from './components/text/text';
import { CurrencyConverter } from './components/converter/converter';
import { CurrencyConverterList } from './components/list/list';
import { CurrencyConverterSelectItem } from './components/converter/select/selectItem/selectItem';
import { getTicker } from './services/converterService';
import { useCachedRequestDataFetch } from './data/customHooks/useCachedRequestDataFetch';
import useHandleInputOnChange from './components/converter/input/customHooks/useHandleInputOnChange';

import logo from './logo.svg';
import './App.css';

const DEFAULT_CURRENCY_CODE = 'USD';
const NR_OF_CURRENCIES = 10;
const CACHE_KEY = 'cachedCurrencies';
const CACHE_TIMEOUT = 50000;
// const INPUT_DEBOUCE_TIME = 500;

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [shuffledCurrencies, setShuffledCurrencies] = useState([]);
  const [defaultCurrencyValue, setDefaultCurrencyValue] = useState();
  const [currencyValue, setCurrencyValue] = useState();

  const { value: inputValue, onChange: onInputChange } = useHandleInputOnChange();

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
        ({ currency }) => currency !== (currencyValue || DEFAULT_CURRENCY_CODE),
      )
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, NR_OF_CURRENCIES),

    [currencies, currencyValue],
  );

  const onSelectChange = useCallback(
    ({ value }) => {
      setCurrencyValue(value);
      fetchCurrencies(value);
    },
    [fetchCurrencies],
  );

  useEffect(() => {
    setDefaultCurrencyValue((prevValue) => {
      if (currenciesValues.length > 0 && !prevValue) {
        return currenciesValues.find(
          ({ value }) => value === DEFAULT_CURRENCY_CODE,
        );
      }
      return prevValue;
    });

    return () => {};
  }, [currenciesValues]);

  useEffect(() => {
    if (currenciesValues.length > 0) {
      setShuffledCurrencies(getShuffledCurrencies());
    }

    return () => {};
  }, [currenciesValues, getShuffledCurrencies]);

  useEffect(() => {
    fetchCurrencies();

    return () => {};
  }, [fetchCurrencies]);

  return (
    <div className="app">
      <header className="app__header">
        <img src={logo} className="app__logo" alt="logo" />
      </header>
      <div className="app__content">
        <CurrencyConverterTitle>Currency Converter</CurrencyConverterTitle>
        <CurrencyConverterText>
          Receive competitive and transparent pricing with no hidden spreads.
          See how we compare.
        </CurrencyConverterText>
        <CurrencyConverter
          selectDefaultValue={defaultCurrencyValue}
          selectOptions={currenciesValues}
          onInputChange={onInputChange}
          onSelectChange={onSelectChange}
        />
        {!!inputValue && (
          <CurrencyConverterList
            options={shuffledCurrencies}
            value={inputValue}
          />
        )}
        {!inputValue && defaultCurrencyValue && (
          <CurrencyConverterText className="app__text">
            Enter an amount to check the rates.
          </CurrencyConverterText>
        )}
      </div>
    </div>
  );
}

export default App;
