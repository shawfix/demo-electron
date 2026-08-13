import { PropsWithChildren } from 'react';

export function AppContent(props: PropsWithChildren): React.JSX.Element {
  return <main className="flex-1 h-(--app-content-height) w-full">{props.children}</main>;
}
