import { useCallback, useRef, useState } from 'react';

const INPUT_DEBOUCE_TIME = 500;

const useHandleInputOnChange = () => {
  const debounceIdRef = useRef();
  const [value, setValue] = useState(0);

  const handleOnChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const onChange = useCallback(
    (event, changeTo) => {
      if (debounceIdRef.current) {
        clearTimeout(debounceIdRef.current);
      }

      debounceIdRef.current = setTimeout(() => {
        handleOnChange(event, changeTo);
      }, INPUT_DEBOUCE_TIME);
    },
    [handleOnChange],
  );

  return { value, onChange };
};

export default useHandleInputOnChange;
