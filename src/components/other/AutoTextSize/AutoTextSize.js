import {useState, useRef, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';

export default function AutoTextSize(props) {
  const {children} = props;

  const MIN_SIZE = 10;
  const MAX_SIZE = 68;

  const [size, setSize] = useState(MAX_SIZE);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    textRef.current.innerHTML = '';
    const parentContainerWidth = textRef.current.parentNode.clientWidth;
    textRef.current.innerHTML = children;
    const currentTextWidth = textRef.current.scrollWidth;
    const {fontSize} = getComputedStyle(textRef.current);

    const currentFontSize = parseInt(fontSize, 10);
    const newValue = Math.min(
      Math.max(
        MIN_SIZE,
        (parentContainerWidth / currentTextWidth) * currentFontSize
      ),
      MAX_SIZE
    );
    setSize(newValue);
  }, [children]);

  return (
    <p
      style={{
        fontSize: `${Math.floor(size)}px`,
        lineHeight: `${Math.floor(size)}px`,
      }}
      ref={textRef}
    >
      {children}
    </p>
  );
}

AutoTextSize.propTypes = {
  children: PropTypes.number,
};
AutoTextSize.defaultProps = {
  children: 0,
};
