import { PropsWithChildren } from 'react';

export function AppHeader(props: PropsWithChildren): React.JSX.Element {
  return (
    <header className="app-header flex-none flex justify-start items-center h-(--app-header-height) pl-(--app-header-pl) bg-base border-b-[0.5px] border-base-300">
      {props.children}
    </header>
  );
}
