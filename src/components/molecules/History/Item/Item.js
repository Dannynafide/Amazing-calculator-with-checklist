import PropTypes from 'prop-types';
import {MdClose} from 'react-icons/md';

import IconButton from 'components/atoms/IconButton/IconButton';
import colors from 'theme/colors.scss';
import './item.scss';

export default function Item({item, children, removeItem}) {
  return (
    <div className="history__item">
      <IconButton
        type="button"
        className="history__item__remove"
        onClick={() => removeItem(item.id)}
        color={colors.error}
      >
        <MdClose />
      </IconButton>
      <div className="history__item__cost">{children}</div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
