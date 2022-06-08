import {useRef} from 'react';

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    // eslint-disable-next-line no-unused-expressions
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

export default useFocus;

// Source:
// https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering
// TypeScript: https://gist.github.com/carpben/de968e377cbac0ffbdefe1ab56237573
