import { domAnimation, LazyMotion } from 'motion/react';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

function App(): React.JSX.Element {
  return (
    <LazyMotion features={domAnimation}>
      <RouterProvider router={router}></RouterProvider>
    </LazyMotion>
  );
}

export default App;
