import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { SmoothScroll } from './components/SmoothScroll/SmoothScroll';

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <AppRoutes />
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
