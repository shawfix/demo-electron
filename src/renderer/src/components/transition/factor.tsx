import { SpringOptions, Target } from 'motion';
import { HTMLMotionProps, m, MotionProps } from 'motion/react';
import {
  ForwardRefExoticComponent,
  JSX,
  MemoExoticComponent,
  memo,
  PropsWithChildren,
  RefAttributes
} from 'react';

import { microReboundPreset } from './spring';
import { BaseTransitionProps } from './typings';

interface TransitionViewParams {
  from: Target;
  to: Target;
  initial?: Target;
  preset?: SpringOptions;
}

type TransitionViewProps = PropsWithChildren<BaseTransitionProps> & {
  ref?: React.RefObject<HTMLElement | null>;
};

export const createTransitionView = (
  params: TransitionViewParams
): MemoExoticComponent<(props: TransitionViewProps) => JSX.Element> => {
  const { from, to, initial, preset } = params;

  const TransitionView = ({ ref, ...props }: TransitionViewProps): JSX.Element => {
    const {
      timeout = {},
      duration = 0.5,

      animation = {},
      as = 'div',
      delay = 0,
      // lcpOptimization = false,
      ...rest
    } = props;

    const { enter = delay, exit = delay } = timeout;

    const MotionComponent = m[as] as ForwardRefExoticComponent<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      HTMLMotionProps<any> & RefAttributes<HTMLElement>
    >;

    const motionProps: MotionProps = {
      initial: initial || from,
      animate: {
        ...to,
        transition: {
          duration,
          ...(preset || microReboundPreset),
          ...animation.enter,
          delay: enter / 1000
        }
      },
      transition: {
        duration
      },
      exit: {
        ...from,
        transition: {
          duration,
          ...animation.exit,
          delay: exit / 1000
        }
      }
    };

    return (
      <MotionComponent ref={ref} {...motionProps} {...rest}>
        {props.children}
      </MotionComponent>
    );
  };

  TransitionView.displayName = `forwardRef(TransitionView)`;
  const MemoedTransitionView = memo(TransitionView);
  MemoedTransitionView.displayName = `MemoedTransitionView`;
  return MemoedTransitionView;
};
