import { useRef } from "react";
import { GestureResponderEvent } from "react-native";

export default (onDirectionChange: (value: string) => void) => {
  let firstTouchX = 0;
  let firstTouchY = 0;
  const lastDirection = useRef("right");
  const onTouchEnd = (e: GestureResponderEvent) => {
    const vector = {
      x: e.nativeEvent.pageX - firstTouchX,
      y: e.nativeEvent.pageY - firstTouchY,
    };
    //tap
    if (Math.round(vector.x) === 0 && Math.round(vector.y) === 0) {
      return;
    }
    const angle = Math.atan2(vector.y, vector.x);
    const degrees = (360 + Math.round((180 * angle) / -Math.PI)) % 360;
    if (degrees >= 315 || degrees < 45) {
      lastDirection.current = "right";
    } else if (degrees >= 45 && degrees < 135) {
      lastDirection.current = "up";
    } else if (degrees >= 135 && degrees < 225) {
      lastDirection.current = "left";
    } else if (degrees >= 225 && degrees < 315) {
      lastDirection.current = "down";
    }
    onDirectionChange && onDirectionChange(lastDirection.current);
  };

  const onTouchStart = (e: GestureResponderEvent) => {
    firstTouchX = e.nativeEvent.pageX;
    firstTouchY = e.nativeEvent.pageY;
  };

  return { onTouchEnd, onTouchStart };
};
