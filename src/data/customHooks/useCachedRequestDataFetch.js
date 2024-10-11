import { useCallback } from 'react';

const cache = {};
/**
 * Caches a request
 * @param {Promise} request - The request to the API
 * @param {String} key - The key for the cache, Must be something specific.
 * @param {Number} time - Debounce Time. Default 30 000ms
 * @returns The cached Request
 */
export const useCachedRequestDataFetch = (request, key, time = 30000) => {
  const doRequest = useCallback((...args) => {
    const stringArgs = JSON.stringify(args);
    const cached = cache[key];
    if (cached && cached.expires > Date.now() && stringArgs === cached.stringArgs) {
      return cached.promise;
    }
    cache[key] = {
      promise: Promise.resolve(request(...args)),
      expires: Date.now() + time, // 30 seconds
      stringArgs,
    };
    return cache[key].promise;
  }, [key, request, time]);

  return { doRequest };
};

export default useCachedRequestDataFetch;
