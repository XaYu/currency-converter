import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
} from 'react';

import { CurrencyConverterTitle } from './components/title/title';
import { CurrencyConverterText } from './components/text/text';
import { CurrencyConverter } from './components/converter/converter';
import { CurrencyConverterList } from './components/list/list';
import { getTicker } from './services/converterService';
import { useCachedRequestDataFetch } from './data/customHooks/useCachedRequestDataFetch';

import logo from './logo.svg';
import './App.css';

const DEFAULT_CURRENCY_CODE = 'USD';
const NR_OF_CURRENCIES = 20;
const CACHE_KEY = 'cachedCurrencies';
const CACHE_TIMEOUT = 5000;
const INPUT_DEBOUCE_TIME = 500;

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [shuffledCurrencies, setShuffledCurrencies] = useState([]);
  const [defaultCurrencyValue, setDefaultCurrencyValue] = useState();
  const [currencyValue, setCurrencyValue] = useState();
  const [inputValue, setInputValue] = useState(0);

  const doFetch = useCallback(
    (value) => getTicker(value || DEFAULT_CURRENCY_CODE)
      .then((res) => {
        console.table(res);
        return res;
      })
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

  // const fetchTicker = useCallback(
  //   () => getTicker()
  //     .then((res) => {~

  //       setCurrencies(res);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     }),
  //   [],
  // );

  const currenciesValues = useMemo(() => {
    if (!currencies || currencies.length === 0) {
      return [];
    }

    const values = [...new Set(currencies.map((item) => item.currency))];

    const pairedValues = values.map((item) => ({
      value: item,
      label: item,
    }));

    return pairedValues;
  }, [currencies]);

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

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   {
  //     value: 'strawberry',
  //     label: (
  //       <>
  //         <span style={{ paddingRight: '5px' }}>Strawberry</span>
  //         <img
  //           id="icon"
  //           src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/copy-duplicate-multiply-clone-512.png"
  //           alt="icon"
  //         />
  //       </>
  //     ),
  //   },
  //   { value: 'vanilla', label: 'Vanilla' },
  // ];

  // console.table(currencies);
  // console.table(defaultCurrencyValue);

  // RP FIXME -> must be only current currency pair values
  const getShuffledCurrencies = useCallback(() => {
    const temp = currencies.filter(
      ({ currency }) => currency !== (currencyValue || DEFAULT_CURRENCY_CODE),
    );

    console.log(temp.length);

    return temp
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, NR_OF_CURRENCIES);
  }, [currencies, currencyValue]);

  useEffect(() => {
    setShuffledCurrencies(getShuffledCurrencies());

    return () => {};
  }, [currenciesValues, getShuffledCurrencies]);

  useEffect(() => () => {}, [shuffledCurrencies]);

  const onSelectChange = useCallback(
    ({ value }) => {
      // setDefaultCurrencyValue(()=> {
      //   currencies.forEach(element => {
      //     if(element.currency)
      //   });
      // })
      setCurrencyValue(value);
      fetchCurrencies(value);
    },
    [fetchCurrencies],
  );

  const debounceIdRef = useRef();

  const handleOnChange = useCallback((event) => {
    setInputValue(event.target.value);

    // call calculations
  }, []);

  const onInputChange = useCallback(
    (event, changeTo) => {
      if (debounceIdRef.current) {
        clearTimeout(debounceIdRef.current);
      }

      debounceIdRef.current = setTimeout(() => {
        handleOnChange(event, changeTo);
      }, INPUT_DEBOUCE_TIME);
    },
    [handleOnChange],
  );

  useEffect(() => {
    fetchCurrencies();

    return () => {};
  }, [fetchCurrencies]);

  return (
    <div className="app">
      <header className="app__header">
        <img src={logo} className="app__logo" alt="logo" />
      </header>
      <div className="app_content">
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
        {inputValue ? (
          <CurrencyConverterList
            options={shuffledCurrencies}
            value={inputValue}
          />
        ) : (
          <CurrencyConverterText className="app__text">
            Enter an amount to check the rates.
          </CurrencyConverterText>
        )}
        <pre>{JSON.stringify(shuffledCurrencies, null, 2)}</pre>
        <pre>{inputValue}</pre>
      </div>
    </div>
  );
}

export default App;
