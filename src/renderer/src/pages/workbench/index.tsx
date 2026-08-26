import { NavLink } from 'react-router-dom';

import { BottomToUpTransitionView } from '@renderer/components/transition/BottomToUpTransitionView';
import { routerPath } from '@renderer/router';

function Workbench(): React.JSX.Element {
  return (
    <BottomToUpTransitionView className="page-workbench h-full w-full">
      <NavLink to={routerPath.themes}>To Themes</NavLink>
    </BottomToUpTransitionView>
  );
}

export default Workbench;
