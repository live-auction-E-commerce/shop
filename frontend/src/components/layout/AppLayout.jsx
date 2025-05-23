import { Outlet } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Toaster } from '@/components/ui/sonner';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};
export default AppLayout;
