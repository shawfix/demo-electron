import { NavLink } from 'react-router-dom';

import { routerPath } from '@renderer/router';

function Workbench(): React.JSX.Element {
  return (
    <div className="workbench">
      <NavLink to={routerPath.themes}>To Themes</NavLink>
    </div>
  );
}

export default Workbench;
