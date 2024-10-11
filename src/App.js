import React from 'react';
import PropTypes from 'prop-types';

import { CurrencyConverterTitle } from './components/title/title';
import { CurrencyConverterText } from './components/text/text';
import { CurrencyConverter } from './components/converter/converter';
import { CurrencyConverterList } from './components/list/list';
import { useFetchCurrencies } from './customHooks/useFetchCurrencies';
import { useHandleCurrencies } from './customHooks/useHandleCurrencies';
import useHandleInputOnChange from './components/converter/input/customHooks/useHandleInputOnChange';
import useHandleSelectOnChange from './components/converter/select/customHooks/useHandleSelectOnChange';

import logo from './logo.svg';
import './App.css';

const DEFAULT_CURRENCY_CODE = 'USD';

function AppComponent({
  inputValue,
  selectDefaultValue,
  selectOptions,
  listOptions,
  onInputChange,
  onSelectChange,
}) {
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
          selectDefaultValue={selectDefaultValue}
          selectOptions={selectOptions}
          onInputChange={onInputChange}
          onSelectChange={onSelectChange}
        />
        {!!inputValue && (
          <CurrencyConverterList options={listOptions} value={inputValue} />
        )}
        {!inputValue && selectDefaultValue && (
          <CurrencyConverterText className="app__text">
            Enter an amount to check the rates.
          </CurrencyConverterText>
        )}
      </div>
    </div>
  );
}

AppComponent.propTypes = {
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectDefaultValue: PropTypes.shape({}),
  onInputChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({})),
  listOptions: PropTypes.arrayOf(PropTypes.shape({})),
};

function App() {
  const { currencies, fetchCurrencies } = useFetchCurrencies(
    DEFAULT_CURRENCY_CODE,
  );

  const {
    currenciesValues,
    setCurrencyValue,
    shuffledCurrencies,
    defaultCurrencyValue,
  } = useHandleCurrencies(currencies, DEFAULT_CURRENCY_CODE);

  const { value: inputValue, onChange: onInputChange } = useHandleInputOnChange();

  const { onChange: onSelectChange } = useHandleSelectOnChange(
    setCurrencyValue,
    fetchCurrencies,
  );

  return (
    <AppComponent
      inputValue={inputValue}
      selectDefaultValue={defaultCurrencyValue}
      selectOptions={currenciesValues}
      listOptions={shuffledCurrencies}
      onInputChange={onInputChange}
      onSelectChange={onSelectChange}
    />
  );
}

export default App;
