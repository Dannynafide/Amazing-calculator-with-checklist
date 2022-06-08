import PropTypes from 'prop-types';
import './progressBar.scss';

function ProgressBar({progress}) {
  return (
    <div className="wrapperProgressBar">
      <div
        className="progressBar"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number,
};

ProgressBar.defaultProps = {
  progress: 0,
};

export default ProgressBar;
