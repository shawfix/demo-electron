import { AnimatePresence } from 'motion/react';
import { Outlet } from 'react-router-dom';

import AppContent from './AppContent';
import AppHeader from './AppHeader';

function AppLayout(): React.JSX.Element {
  return (
    <>
      <AppHeader />
      <AppContent>
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </AppContent>
    </>
  );
}

export default AppLayout;
