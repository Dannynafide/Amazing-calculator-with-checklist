import PropTypes from 'prop-types';
import {useParams, Link} from 'react-router-dom';
import {MdCheck, MdClose} from 'react-icons/md';
import IconButton from '../../../components/buttons/IconButton/IconButton';
import colors from '../../../theme/colors.scss';
import './itemDetails.scss';

export default function ItemDetails(props) {
  const {item, underline, removeItem, updateItem, children} = props;
  const {calculationId} = useParams();

  const isActive = item.complite ? 'btn-checked active' : 'btn-checked';

  return (
    <>
      <div className="history__item-details">
        <IconButton
          type="button"
          onClick={() => removeItem(item.id)}
          color={colors.error}
        >
          <MdClose />
        </IconButton>
        <Link
          className="history__item-details--name"
          to={`/edit-item/${calculationId}/${item.id}`}
        >
          {item.name || 'Brak nazwy'}
        </Link>
        <div className="history__item-details--cost">{children}</div>
        <button
          type="button"
          className={isActive}
          onClick={() => updateItem(item.id)}
        >
          <MdCheck />
        </button>
      </div>
      {underline ? <hr className="history__item-details--underline" /> : null}
    </>
  );
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    complite: PropTypes.bool,
  }).isRequired,
  underline: PropTypes.bool,
  removeItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ItemDetails.defaultProps = {
  underline: false,
};
