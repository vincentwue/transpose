import * as React from 'react';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { TransposeGame } from './sheets/TransposeGame';
import { state } from './state';
import './style.css';

const App = () => {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    const sub =
      state.onChange.subscribe((s) => {
        setCount(p => p + 1);
      });

    return () => {
      sub.unsubscribe()
    }
  }, []);

  return (
    <div>
      <TransposeGame></TransposeGame>
      {/* {count} */}

    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found!');
}

