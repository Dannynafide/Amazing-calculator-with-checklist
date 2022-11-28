import PropTypes from 'prop-types';

import {useCalculatorState} from 'context/calculatorContext';
import ItemDetails from './ItemDetails/ItemDetails';
import './history.scss';
import Item from './Item/Item';

export default function History(props) {
  const {id, details} = props;

  const {getData, updateProject} = useCalculatorState();
  const data = getData(id);

  if (!data) {
    return <div className="history" />;
  }

  const removeItem = (idItem) => {
    const newData = data.filter((item) => item.id !== idItem);
    updateProject(id, null, newData);
  };

  const updateItem = (idItem) => {
    const newData = [...data];
    const indexItem = data.findIndex((element) => element.id === idItem);
    newData[indexItem].complite = !newData[indexItem].complite;

    updateProject(id, null, newData);
  };

  return (
    <div className="history">
      {!details
        ? data.map((item) => (
            <Item key={item.id} item={item} removeItem={removeItem}>
              {item.value}
            </Item>
          ))
        : data.map((item, itemIndex, wholeArray) => {
            const underline = wholeArray.length - 1 !== itemIndex;
            return (
              <ItemDetails
                key={item.id}
                item={item}
                underline={underline}
                removeItem={removeItem}
                updateItem={updateItem}
              >
                {item.value}
              </ItemDetails>
            );
          })}
    </div>
  );
}

History.propTypes = {
  id: PropTypes.string,
  details: PropTypes.bool,
};

History.defaultProps = {
  id: null,
  details: false,
};
