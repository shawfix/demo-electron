import { AnimatePresence } from 'motion/react';
import { Outlet, useLocation } from 'react-router-dom';

import AppContent from './AppContent';
import AppHeader from './AppHeader';

function AppLayout(): React.JSX.Element {
  const location = useLocation();

  return (
    <>
      <AppHeader />
      <AppContent>
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </AppContent>
    </>
  );
}

export default AppLayout;
