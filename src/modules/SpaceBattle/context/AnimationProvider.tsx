import React, { useContext, useEffect, useRef, useState } from "react";
import useAnimationCycle from "../../../hooks/useAnimationCycle";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { View } from "react-native";
import { height, width } from "../../../utils/metrics";
import { ActionType, AnimationContextType, PanPosition } from "../types";

const emptyState = {
  frameCount: 0,
  deltaTime: 0,
  togglePlayPause: () => null,
  shareParams: () => null,
  run: false,
  panPosition: {
    x: 0,
    y: 0,
    translateX: 0,
    translateY: 0,
    actionType: 0,
  },
  sharedData: {},
};

export const AnimationContext =
  React.createContext<AnimationContextType>(emptyState);

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

  const sharedData = useRef<any>({});

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

  const shareParams = (key: string, data?: any) => {
    if (key) {
      sharedData.current = {
        ...sharedData.current,
        [key]: data,
      };
    }
  };

  useEffect(() => {
    if (!run) {
      sharedData.current = emptyState.sharedData;
    }
  }, [run]);

  return (
    <AnimationContext.Provider
      value={{
        ...data,
        togglePlayPause,
        run,
        panPosition: panPosition.current,
        sharedData: sharedData.current,
        shareParams,
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

export const useConsole = (v: string | number) => {
  const { frameCount } = useAnimationData();
  if (frameCount % 60 === 0) {
    console.log(v);
  }
};
