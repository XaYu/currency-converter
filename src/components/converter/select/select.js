import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import './select.css';

export function CurrencyConverterSelect({
  defaultValue,
  options,
  onChange,
}) {
  return (
    <Select
      defaultValue={defaultValue}
      name="currencyValue"
      options={options}
      onChange={onChange}
      className="m-currencyConverterSelect"
    />
  );
}

CurrencyConverterSelect.propTypes = {
  defaultValue: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CurrencyConverterSelect;
