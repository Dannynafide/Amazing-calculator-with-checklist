import './App.css';
import Display from './components/Display/Display';
import Keypad from './containers/Keypad/Keypad';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Amazing Calculator with checklist.</p>
      </header>
      <hr />
      <Display value="1200" />
      <hr />
      <Keypad />
    </div>
  );
}

export default App;
