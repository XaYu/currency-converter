import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './text.css';

export function CurrencyConverterText({ children, className }) {
  return (
    <p className={classNames('m-currencyConverterText', className)}>
      {children}
    </p>
  );
}

CurrencyConverterText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CurrencyConverterText;
