import { Outlet } from 'react-router-dom';
import { SiteHeader } from '@/components/ui/site-header';
import { SiteFooter } from '../ui/site-footer';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};
export default AppLayout;
