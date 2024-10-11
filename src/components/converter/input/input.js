import React from 'react';
import PropTypes from 'prop-types';

import './input.css';

export function CurrencyConverterInput({
  onChange,
}) {
  return (
    <input
      type="number"
      name="inputValue"
      placeholder={0}
      onChange={onChange}
      className="m-currencyConverterInput"
    />
  );
}

CurrencyConverterInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default CurrencyConverterInput;
