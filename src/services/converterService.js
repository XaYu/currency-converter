import sdk from '../data/api';

export const getTicker = (currency) => sdk.getTicker(currency).then((res) => res);

export default getTicker;
