import { NavLink } from 'react-router-dom';

import { BottomToUpTransitionView } from '@renderer/components/transition/BottomToUpTransitionView';
import { TextUpTransitionView } from '@renderer/components/transition/TextUpTransitionView';
import { routerPath } from '@renderer/router';

function Workbench(): React.JSX.Element {
  return (
    <BottomToUpTransitionView className="page-workbench h-full w-full">
      <TextUpTransitionView className="mt-4 text-2xl font-semibold" text="欢迎回来" />
      <NavLink to={routerPath.themes}>To Themes</NavLink>
    </BottomToUpTransitionView>
  );
}

export default Workbench;
