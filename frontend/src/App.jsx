
import AppLayout from './components/AppLayout';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
