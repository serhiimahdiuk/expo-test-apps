import { useEffect, useRef } from "react";

export type AnimatioCycleParams = {
  frameCount: number;
};

type Callback = (props: AnimatioCycleParams) => void;

interface Props {
  callbacks?: Callback[];
  run: boolean;
}

export default ({ callbacks, run }: Props) => {
  const animationId = useRef<number>();
  const frameCount = useRef<number>(0);
  const anim = () => {
    frameCount.current += 1;
    if (callbacks && callbacks.length > 0) {
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i]({ frameCount: frameCount.current });
      }
    }
    animationId.current = requestAnimationFrame(() => anim());
  };

  useEffect(() => {
    if (run) {
      anim();
    }
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
      frameCount.current = 0;
    };
  }, [run]);
};
