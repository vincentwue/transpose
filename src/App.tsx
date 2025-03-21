import * as React from 'react';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { TransposeGame } from './sheets/TransposeGame';
import { state } from './state';
import './style.css';

const App = () => {
  const [, setCount] = React.useState(0);

  useEffect(() => {
    const sub =
      state.onChange.subscribe(() => {
        setCount(p => p + 1);
      });

    return () => {
      sub.unsubscribe()
    }
  }, []);

  return (
    <React.Fragment>
      <TransposeGame></TransposeGame>
      {/* {count} */}

    </React.Fragment>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found!');
}


export const keyMap = [
  "C",
  "Db", // or "Db"
  "D",
  "Eb", // or "Eb"
  "E",
  "F",
  "Gb", // or "Gb"
  "G",
  "Ab", // or "Ab"
  "A",
  "Bb", // or "Bb"
  "B",
];
const Top = () => {
  const [, setCount] = React.useState(0);

  useEffect(() => {
    const sub =
      state.onChange.subscribe(() => {
        setCount(p => p + 1);
      });

    return () => {
      sub.unsubscribe()
    }
  }, []);

  return (
    <React.Fragment>
      <label>Correct Counter:</label>
      <span>{state.correctCounter}</span>
      <br />
      <label>Source Key:</label>
      <select value={state.sourceKey} onChange={(e) => {
        state.changeSourceKey(parseInt(e.target.value))
      }}>{keyMap.map((key, index) => <option key={index} value={index}>{key}</option>)}</select>
      <br />
      <label>Target Key:</label>
      <select value={state.targetKey} onChange={(e) => {
        state.changeTargetKey(parseInt(e.target.value))
      }}>{keyMap.map((key, index) => <option key={index} value={index}>{key}</option>)}</select>
    </React.Fragment>
  );
}


const rootElement2 = document.getElementById('target');
if (rootElement2) {
  const root = createRoot(rootElement2);
  root.render(<Top />);
} else {
  console.error('Root element not found!');
}

