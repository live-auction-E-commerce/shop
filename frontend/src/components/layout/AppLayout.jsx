import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      <header>Navbar</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default AppLayout;
