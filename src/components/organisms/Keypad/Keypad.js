import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {IoMdReturnLeft, IoMdArrowBack} from 'react-icons/io';

import {useCalculatorState} from 'context/calculatorContext';
import {evaluateCalculator} from 'helpers/mathFunc';
import useFocus from 'hooks/useFocus';
import Button from './Button/Button';
import './Keypad.scss';

// const initialValue = [
//   {id: 0, type: 'number', value: '120'},
//   {id: 1, type: 'operator', value: '+'},
//   {id: 2, type: 'number', value: '110'},
//   {id: 3, type: 'operator', value: '*'},
//   {id: 4, type: 'bracket', value: '('},
//   {id: 5, type: 'number', value: '5'},
//   {id: 6, type: 'operator', value: '*'},
//   {id: 7, type: 'number', value: '5'},
//   {id: 8, type: 'bracket', value: ')'},
// ];

//! Sprawdzić czy są poprawne nazwy funkcji
export default function Keypad({id}) {
  const {calculatorState, addProject, addItemData} = useCalculatorState();
  const [inputRef, setInputFocus] = useFocus();
  const navigate = useNavigate();

  const [display, setDisplay] = useState([]);

  const numberHandler = (props) => {
    setInputFocus();
    // jesli dodaje pierwsza liczbę (display.length === 0)
    // dodaje liczbę po operatorze (display[display.length - 1].type === 'operator')
    if (
      display.length === 0 ||
      display[display.length - 1].type === 'operator' ||
      display[display.length - 1].type === 'bracket'
    ) {
      const newValue = {
        id: display.length ?? 0,
        type: 'number',
        value: `${props}`,
      };
      setDisplay([...display, newValue]);
      return;
    }

    // Jeśli w liczbie występuje juz kropka
    if (/\./.test(display[display.length - 1].value) && props === '.') {
      return;
    }

    // Jeśli dodaje cyfrę do cyfry
    const newDisplay = [...display];
    newDisplay[display.length - 1].value += `${props}`;
    setDisplay(newDisplay);
  };

  const operatorHandler = (props) => {
    setInputFocus();
    // Zablokowanie rozpoczęcie wpisywania od operatora (oprócz "-")
    if (display.length === 0) {
      if (props !== '-') return;
    } else if (display.length === 1 && props !== '-') {
      if (display[0].type === 'operator') {
        return;
      }
    }

    // Operator musi być dodany po liczbie lub nawiasie
    // Wyjątkiem jest "-", gdzie moze wystąpić jako pierwszy element
    if (
      display.length === 0 ||
      display[display.length - 1].type === 'number' ||
      display[display.length - 1].type === 'bracket'
    ) {
      const newValue = {
        id: display.length,
        type: 'operator',
        value: `${props}`,
      };
      setDisplay([...display, newValue]);
      return;
    }

    // Podmiana operatora
    if (display[display.length - 1].type === 'operator') {
      const newDisplay = [...display];
      newDisplay[display.length - 1].value = `${props}`;
      setDisplay(newDisplay);
    }
  };

  const bracketHandler = (props) => {
    setInputFocus();
    // Zablokowanie uzycia ")" przed "(", co jest niepoprawne matematycznie
    if (props === ')') {
      const countFirstBracket = display.filter((x) => x.value === '(').length;
      const countSecondBracket = display.filter((x) => x.value === ')').length;

      if (countSecondBracket >= countFirstBracket) return;
      if (display[display.length - 1].value === '(') {
        if (countSecondBracket >= countFirstBracket - 1) return;
      }
    }

    // Dodanie nawiasu
    const newValue = {
      id: display.length ?? 0,
      type: 'bracket',
      value: `${props}`,
    };
    setDisplay([...display, newValue]);
  };

  const equalHandler = () => {
    setInputFocus();
    let count = '';
    display.forEach((e) => {
      count = `${count}${e.value}`;
    });

    const evaluateCount = evaluateCalculator(count);
    if (
      evaluateCount === undefined ||
      Number.isNaN(evaluateCount) ||
      evaluateCount === Infinity ||
      evaluateCount === -Infinity
    ) {
      // Mozna wyświetlić błąd!
      return;
    }

    const index = calculatorState.findIndex((element) => element.id === id);

    if (index !== -1) {
      addItemData(id, '', count, false);
    } else {
      const projetdId = addProject('', {
        id: '0',
        name: '',
        value: count,
        complite: false,
      });
      navigate(`/calculation/${projetdId}`, {replace: true});
    }

    setDisplay([]);
  };

  /* Cofnięcie ostatniego znaku */
  const backspaceHandler = () => {
    setInputFocus();
    const newDisplay = [...display];
    if (newDisplay.length < 1) return;

    if (newDisplay[newDisplay.length - 1].value.length > 1) {
      const items = Array.from(newDisplay[newDisplay.length - 1].value);
      items.pop();
      newDisplay[newDisplay.length - 1].value = items.join('');
    } else {
      newDisplay.pop();
    }
    setDisplay(newDisplay);
  };

  useEffect(() => {
    setInputFocus();
  }, [setInputFocus]);

  const handleKeyDown = (event) => {
    // https://www.toptal.com/developers/keycode/for/enter

    if (event.which >= 48 && event.which <= 57 && event.shiftKey === false) {
      numberHandler(event.key);
    } else if (event.key === '.') {
      numberHandler(event.key);
    } else if (event.key === '(' || event.key === ')') {
      bracketHandler(event.key);
    } else if (
      event.key === '/' ||
      event.key === '*' ||
      event.key === '+' ||
      event.key === '-' ||
      event.key === '%'
    ) {
      operatorHandler(event.key);
    } else if (event.keyCode === 13) {
      equalHandler(event.key);
    } else if (event.key === 'Backspace') {
      backspaceHandler();
    }
  };

  return (
    <div className="keypad">
      <input
        className="keypad__main-input"
        onChange={() => {}}
        value={display && display.map((e) => e.value).join('')}
        type="text"
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      <div className="keypad__bracket-keys">
        <Button onClick={() => bracketHandler('(')}>[</Button>
        <Button onClick={() => bracketHandler(')')}>]</Button>
      </div>
      <div className="keypad__input-keys">
        <div className="keypad__input-keys__digit-keys">
          <Button onClick={() => numberHandler(7)}>7</Button>
          <Button onClick={() => numberHandler(8)}>8</Button>
          <Button onClick={() => numberHandler(9)}>9</Button>
          <Button onClick={() => numberHandler(4)}>4</Button>
          <Button onClick={() => numberHandler(5)}>5</Button>
          <Button onClick={() => numberHandler(6)}>6</Button>
          <Button onClick={() => numberHandler(1)}>1</Button>
          <Button onClick={() => numberHandler(2)}>2</Button>
          <Button onClick={() => numberHandler(3)}>3</Button>
          <Button onClick={() => numberHandler(0)}>0</Button>
          <Button onClick={() => numberHandler('.')}>.</Button>
          <Button onClick={() => backspaceHandler()}>
            <IoMdArrowBack />
          </Button>
        </div>
        <div className="keypad__input-keys__operator-keys">
          <Button className="divide-key" onClick={() => operatorHandler('/')}>
            /
          </Button>
          <Button onClick={() => operatorHandler('*')}>&#215;</Button>
          <Button className="add-key" onClick={() => operatorHandler('+')}>
            &#43;
          </Button>
          <Button onClick={() => operatorHandler('-')}>&#8722;</Button>
          <Button className="percent-key" onClick={() => operatorHandler('%')}>
            &#37;
          </Button>
          <Button className="equals-key" onClick={() => equalHandler()}>
            <IoMdReturnLeft />
          </Button>
        </div>
      </div>
    </div>
  );
}

Keypad.propTypes = {
  id: PropTypes.string,
};

Keypad.defaultProps = {
  id: null,
};
