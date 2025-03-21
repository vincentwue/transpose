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


const keyMap = [
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


const rootElement2 = document.getElementById('target');
if (rootElement2) {
  const root = createRoot(rootElement2);
  root.render(<div>Target Key: {keyMap[state.targetKey]}</div>);
} else {
  console.error('Root element not found!');
}

