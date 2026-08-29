import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AuthProvider } from './context/AuthContext';
import { initNativeSmoothScroll } from './utils/nativeSmoothScroll';

function App() {
  useEffect(() => {
    const smoothScroll = initNativeSmoothScroll();
    return () => {
      smoothScroll?.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
