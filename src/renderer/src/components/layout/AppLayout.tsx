import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import AppContent from './AppContent';
import AppHeader from './AppHeader';
import PageLoading from './PageLoading';

function AppLayout(): React.JSX.Element {
  return (
    <>
      <AppHeader />
      <AppContent>
        <Suspense fallback={<PageLoading />}>
          <Outlet></Outlet>
        </Suspense>
      </AppContent>
    </>
  );
}

export default AppLayout;
