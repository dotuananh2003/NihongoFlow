import { BrowserRouter } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { AppRoutes } from './routes';

function App() {
  return (
    <ReactLenis
      root
      options={{
        duration: 0.15,
        wheelMultiplier: 1.8,
        smoothWheel: true,
        syncTouch: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ReactLenis>
  );
}

export default App;
