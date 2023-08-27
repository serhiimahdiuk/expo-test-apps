import React, { useRef } from "react";
import { useAnimationData } from "../context/AnimationProvider";
import { Position, Prefab } from "../types";
import uuid from "react-native-uuid";

interface Props {
  startPoint: () => Position;
  Component: (props: Prefab) => JSX.Element;
  count: number;
  timeout: number;
  name: string;
  filterRule?: (i: Prefab, id: number) => boolean;
  mapRule?: (i: Prefab, id: number) => Prefab;
}

export default ({
  startPoint,
  Component,
  count = 10,
  timeout = 1,
  name,
  filterRule,
  mapRule,
}: Props) => {
  const { frameCount, shareParams } = useAnimationData();
  const prefabs = useRef<Prefab[]>([]);

  shareParams(name, prefabs.current);

  if (prefabs.current.length < count && frameCount % (timeout * 60) === 0) {
    prefabs.current.push({
      ...startPoint(),
      isDestroyed: false,
      id: uuid.v4() as string,
    });
  }

  prefabs.current = prefabs.current
    .map((i, id) => {
      if (mapRule) {
        return {
          ...mapRule(i, id),
        };
      }
      return i;
    })
    .filter((i, id) => {
      if (filterRule) {
        return filterRule(i, id);
      }
      return true;
    });

  return (
    <>
      {prefabs.current.map((i) => (
        <Component {...i} key={i.id} />
      ))}
    </>
  );
};
