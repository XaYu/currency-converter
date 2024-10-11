import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyConverterListItem } from './listItem/listItem';
import './list.css';

export function CurrencyConverterList({ options, value }) {
  return (
    <ul className="m-currencyConverterList">
      {options
        && options.map(({ ask, pair, currency }) => (
          <CurrencyConverterListItem key={pair} currency={currency}>
            {ask * value}
          </CurrencyConverterListItem>
        ))}
    </ul>
  );
}

CurrencyConverterList.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CurrencyConverterList;
