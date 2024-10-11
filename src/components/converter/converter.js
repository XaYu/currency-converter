import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

import './converter.css';

export function CurrencyConverter({
  selectDefaultValue,
  selectOptions,
  onSelectChange,
  onInputChange,
}) {
  return (
    <div className="m-currencyConverter">
      <input
        type="text"
        name="inputValue"
        onChange={onInputChange}
        className="a-currencyConverter__input"
      />
      {selectOptions && selectOptions.length > 0 && selectDefaultValue && (
        <Select
          defaultValue={selectDefaultValue}
          name="currencyValue"
          options={selectOptions}
          onChange={onSelectChange}
          className="a-currencyConverter__select"
        />
      )}
    </div>
  );
}

CurrencyConverter.propTypes = {
  selectDefaultValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CurrencyConverter;
