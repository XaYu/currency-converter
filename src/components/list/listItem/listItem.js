import React from 'react';
import PropTypes from 'prop-types';

import './listItem.css';

export function CurrencyConverterListItem({ children, currency }) {
  return (
    <li className="a-currencyConverterListItem">
      <span>{parseFloat(children.toFixed(6))}</span>
      <span>{currency}</span>
    </li>
  );
}

CurrencyConverterListItem.propTypes = {
  children: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default CurrencyConverterListItem;
