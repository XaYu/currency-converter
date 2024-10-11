import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyConverterInput } from './input/input';
import { CurrencyConverterSelect } from './select/select';

import './converter.css';

export function CurrencyConverter({
  selectDefaultValue,
  selectOptions = [],
  onSelectChange,
  onInputChange,
}) {
  return (
    <div className="m-currencyConverter">
      {selectOptions.length > 0 && selectDefaultValue && (
        <>
          <CurrencyConverterInput onChange={onInputChange} />
          <CurrencyConverterSelect
            defaultValue={selectDefaultValue}
            options={selectOptions}
            onChange={onSelectChange}
          />
        </>
      )}
    </div>
  );
}

CurrencyConverter.propTypes = {
  selectDefaultValue: PropTypes.shape({}),
  onInputChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({})),
};

export default CurrencyConverter;
