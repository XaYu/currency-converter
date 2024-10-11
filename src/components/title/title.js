import React from 'react';
import PropTypes from 'prop-types';

import './title.css';

export function CurrencyConverterTitle({ children }) {
  return (
    <h3 className="m-currencyConverterTitle">
      {children}
    </h3>
  );
}

CurrencyConverterTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CurrencyConverterTitle;
