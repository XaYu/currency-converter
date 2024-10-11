import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import './selectItem.css';

const DEFAULT_FLAG = 'Crypto';

const getAsset = (value) => `${process.env.PUBLIC_URL}/assets/${value}.png`;

export function CurrencyConverterSelectItem({ children }) {
  const image = useMemo(() => getAsset(children), [children]);

  const imgError = useCallback((event) => {
    const { target } = event;

    target.onerror = '';
    target.src = getAsset(DEFAULT_FLAG);
    return true;
  }, []);

  return (
    <div className="m-currencyConverterSelectItem">
      <img
        id={`flag-${children}`}
        className="a-currencyConverterSelectItem"
        src={image}
        onError={imgError}
        alt=""
      />
      <span>{children}</span>
    </div>
  );
}

CurrencyConverterSelectItem.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CurrencyConverterSelectItem;
