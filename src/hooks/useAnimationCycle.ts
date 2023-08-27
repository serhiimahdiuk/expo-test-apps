import { useEffect, useReducer, useRef } from "react";

export type AnimatioCycleParams = {
  frameCount: number;
};

type Callback = (props: AnimatioCycleParams) => void;

interface Props {
  run: boolean;
  withForceUpdate?: boolean;
}

const PERFECT_FRAME_TIME = 1000 / 60;

export default ({ run, withForceUpdate = false }: Props) => {
  const animationId = useRef<number>();
  const frameCount = useRef<number>(0);
  const deltaTime = useRef<number>(0);
  const lastTimeStamp = useRef<number>(Date.now());
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const anim = (timestamp: number) => {
    animationId.current = requestAnimationFrame(anim);
    deltaTime.current =
      (timestamp - lastTimeStamp.current) / PERFECT_FRAME_TIME;
    lastTimeStamp.current = timestamp;
    frameCount.current += 1;
    forceUpdate();
  };

  useEffect(() => {
    if (run) {
      requestAnimationFrame(anim);
    }
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
      frameCount.current = 0;
    };
  }, [run]);
  return { frameCount: frameCount.current, deltaTime: deltaTime.current };
};
