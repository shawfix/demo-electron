import { NavLink } from 'react-router-dom';

import { routerPath } from '@renderer/router';
import PageTransition from '@renderer/components/transition/PageTransition';

function Workbench(): React.JSX.Element {
  return (
    <PageTransition className="page-workbench">
      <NavLink to={routerPath.themes}>To Themes</NavLink>
    </PageTransition>
  );
}

export default Workbench;
