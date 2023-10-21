import { useEffect, useReducer, useRef } from "react";

interface Props {
  run: boolean;
}

const PERFECT_FRAME_TIME = 1000 / 60;

export default ({ run }: Props) => {
  const animationId = useRef<number>();
  const frameCount = useRef<number>(0);
  const deltaTime = useRef<number>(0);
  const lastTimeStamp = useRef<number>(Date.now());
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const anim = (timestamp: number) => {
    animationId.current = requestAnimationFrame(anim);
    deltaTime.current =
      (timestamp - lastTimeStamp.current) / PERFECT_FRAME_TIME;
    if (deltaTime.current > 2) {
      deltaTime.current = 1;
    }
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

export const useLocalTimer = () => {
  const localFrames = useRef(0);
  const localTimer = useRef(0);
  const isRunning = useRef(true);
  if (isRunning.current) {
    localFrames.current += 1;
    localTimer.current = localFrames.current / 60;
  }

  const resetTimer = () => {
    localFrames.current = 0;
    localTimer.current = 0;
  };
  const toggleTimer = () => {
    resetTimer();
    isRunning.current = !isRunning.current;
  };

  return {
    timer: localTimer.current,
    resetTimer,
    toggleTimer,
    isRunning: isRunning.current,
  };
};
