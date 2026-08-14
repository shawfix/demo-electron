import { classNameX } from '@renderer/utils/classNamex';
import { motion } from 'motion/react';
import { PropsWithChildren } from 'react';

function PageTransition(props: PropsWithChildren & { className?: string }): React.JSX.Element {
  return (
    <motion.div
      className={classNameX('h-full w-full', props.className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  );
}

export default PageTransition;
