import React, { useContext, useRef, useState } from "react";
import useAnimationCycle from "../../../hooks/useAnimationCycle";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { View } from "react-native";
import { height, width } from "../../../utils/metrics";

export const ActionType = {
  UNDETERMINED: 0,
  TOUCHES_DOWN: 1,
  TOUCHES_MOVE: 2,
};

export declare type AcrtionType = (typeof ActionType)[keyof typeof ActionType];

export type PanPosition = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  actionType: AcrtionType;
};

export const AnimationContext = React.createContext<
  ReturnType<typeof useAnimationCycle> & {
    togglePlayPause: (v?: boolean) => void;
    run: boolean;
    panPosition: PanPosition;
  }
>({
  frameCount: 0,
  deltaTime: 0,
  togglePlayPause: () => null,
  run: false,
  panPosition: {
    x: 0,
    y: 0,
    translateX: 0,
    translateY: 0,
    actionType: 0,
  },
});

export const useAnimationData = () => {
  const data = useContext(AnimationContext);
  return data;
};

export default ({ children }: React.PropsWithChildren) => {
  const [run, setRun] = useState(false);
  const data = useAnimationCycle({ run });
  const panPosition = useRef<PanPosition>({
    x: 0,
    y: 0,
    translateX: 0,
    translateY: 0,
    actionType: ActionType.UNDETERMINED,
  });

  const panGesture = Gesture.Pan()
    .onTouchesDown((e) => {
      panPosition.current.x = e.allTouches[0].x;
      panPosition.current.y = e.allTouches[0].y;
      panPosition.current.actionType = ActionType.TOUCHES_DOWN;
    })

    .onUpdate((e) => {
      panPosition.current.translateX = e.translationX;
      panPosition.current.translateY = e.translationY;
      panPosition.current.x = e.x;
      panPosition.current.y = e.y;
      panPosition.current.actionType = ActionType.TOUCHES_MOVE;
    })
    .onEnd(() => {
      panPosition.current.actionType = ActionType.UNDETERMINED;
      panPosition.current.translateX = 0;
      panPosition.current.translateY = 0;
    });

  const togglePlayPause = (v: boolean = false) => {
    if (v) {
      setRun(v);
    } else {
      setRun(!run);
    }
  };
  return (
    <AnimationContext.Provider
      value={{
        ...data,
        togglePlayPause,
        run,
        panPosition: panPosition.current,
      }}
    >
      <GestureDetector gesture={panGesture}>
        <View
          style={{
            backgroundColor: "transparent",
            height: width,
            width: height,
          }}
        >
          {children}
        </View>
      </GestureDetector>
    </AnimationContext.Provider>
  );
};
