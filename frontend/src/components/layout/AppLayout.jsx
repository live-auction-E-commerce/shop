import { Outlet } from 'react-router-dom';
import { SiteHeader } from '@/components/ui/site-header';

const AppLayout = () => {
  return (
    <>
      <SiteHeader />
      <Outlet />
      <footer>Footer</footer>
    </>
  );
};

export default AppLayout;
