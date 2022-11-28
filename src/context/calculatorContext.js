import PropTypes from 'prop-types';
import React, {useState, useContext} from 'react';
import {nanoid} from 'nanoid';

import {evaluateCalculator} from 'helpers/mathFunc';

const CalculatorContext = React.createContext();

const initialValue = [
  {
    id: '0',
    name: 'Trip to mountains',
    data: [
      {
        id: 0,
        name: 'fuel',
        value: '120+100*2',
        complite: false,
      },
      {
        id: 1,
        name: 'tickets',
        value: '70+30*4',
        complite: false,
      },
      {
        id: 2,
        name: 'equipment rental',
        value: '150',
        complite: false,
      },
      {
        id: 3,
        name: 'rent a room',
        value: '750',
        complite: false,
      },
    ],
  },
  {
    id: '1',
    name: 'Monthly fees',
    data: [
      {
        id: 0,
        name: 'internet',
        value: '50',
        complite: false,
      },
      {
        id: 1,
        name: 'rent',
        value: '380',
        complite: false,
      },
      {
        id: 2,
        name: 'light fee',
        value: '90',
        complite: false,
      },
      {
        id: 3,
        name: 'water fee',
        value: '70',
        complite: false,
      },
    ],
  },
];

export function CalculatorProvider({children}) {
  const [calculatorState, setCalculatorState] = useState(initialValue);
  const value = React.useMemo(
    () => [calculatorState, setCalculatorState],
    [calculatorState]
  );

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculatorState() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }
  const [calculatorState, setCalculatorState] = context;

  const getResult = (id) => {
    const itemFound = calculatorState.find((element) => element.id === id);
    if (!itemFound) return undefined;

    let count = '0';
    itemFound.data.forEach((e) => {
      count = `${count}+${e.value}`;
    });

    return evaluateCalculator(count);
  };

  const getProject = (id) =>
    calculatorState.find((element) => element.id === id);

  const getData = (id) => {
    const itemFound = calculatorState.find((element) => element.id === id);
    if (!itemFound) return undefined;

    return itemFound.data;
  };

  /* Pobranie nazw i kosztów wszystkich projektów */
  const getProjectsSummary = () => {
    const calculationNames = calculatorState.map((calculation) => ({
      id: calculation.id,
      name: calculation.name,
      cost: getResult(calculation.id),
    }));
    return calculationNames;
  };

  /* Dodanie nowego projektu */
  const addProject = (name, data) => {
    const newValue = {
      id: nanoid(),
      name: name || '',
      data: data ? [data] : [],
    };

    const newState = [...calculatorState, newValue];
    setCalculatorState(newState);
    return newValue.id;
  };

  const addItemData = (idProject, nameItem, valueItem, compliteItem) => {
    const newState = [...calculatorState];
    const projectIndex = newState.findIndex(
      (element) => element.id === idProject
    );
    newState[projectIndex].data.push({
      id: nanoid(),
      name: nameItem,
      value: valueItem,
      complite: compliteItem,
    });

    setCalculatorState(newState);
    return true;
  };

  const removeProject = (id) => {
    const newState = calculatorState.filter((item) => item.id !== id);
    setCalculatorState(newState);
    return newState;
  };

  const updateProject = (id, name, data) => {
    const newState = [...calculatorState];
    const projectIndex = newState.findIndex(
      (element) => element.id.toString() === id.toString()
    );
    if (name) newState[projectIndex].name = name;
    if (data) newState[projectIndex].data = data;

    setCalculatorState(newState);
    return true;
  };

  return {
    calculatorState,
    setCalculatorState,
    getResult,
    getProject,
    getData,
    getProjectsSummary,
    addProject,
    addItemData,
    removeProject,
    updateProject,
  };
}

CalculatorProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
