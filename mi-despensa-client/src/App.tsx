import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { PantryProvider } from './context/PantryContext';
import './styles/base.css';

function App() {
  return (
    <PantryProvider>
      <RouterProvider router={router} />
    </PantryProvider>
  );
}

export default App;
