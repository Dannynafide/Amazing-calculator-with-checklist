import {useState, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';

import './rippleEffect.scss';

const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
  useLayoutEffect(() => {
    let bounce = null;
    if (rippleCount > 0) {
      clearTimeout(bounce);

      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration * 4);
    }

    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};

function Ripple(props) {
  const {duration, color} = props;
  const [rippleArray, setRippleArray] = useState([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  const addRipple = (event) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      x,
      y,
      size,
    };

    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    /* Element <div> ma element nadrzędny <button>, który wywołuje interakcję */
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
    <div
      className="ripple"
      duration={duration}
      color={color}
      onMouseDown={addRipple}
    >
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => (
          <span
            key={`span${index.toString()}`}
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
    </div>
  );
}

Ripple.propTypes = {
  duration: PropTypes.number,
  color: PropTypes.string,
};

Ripple.defaultProps = {
  duration: 850,
  color: '#fff',
};

export default Ripple;
