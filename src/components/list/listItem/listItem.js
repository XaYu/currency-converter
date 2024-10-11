import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyConverterSelectItem } from '../../converter/select/selectItem/selectItem';

import './listItem.css';

const FLOAT = 6;

export function CurrencyConverterListItem({ children, currency }) {
  return (
    <li className="a-currencyConverterListItem">
      <span>{parseFloat(children.toFixed(FLOAT))}</span>
      <CurrencyConverterSelectItem>{currency}</CurrencyConverterSelectItem>
    </li>
  );
}

CurrencyConverterListItem.propTypes = {
  children: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default CurrencyConverterListItem;
