import React, { useEffect, useRef } from "react";
import { useAnimationData } from "../context/AnimationProvider";
import { Position, Prefab, PrefabComponent } from "../types";
import uuid from "react-native-uuid";

interface Props {
  startPoint: () => Position | undefined;
  Component: PrefabComponent;
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

  useEffect(() => {
    return () => {
      prefabs.current = [];
    };
  }, []);

  shareParams(name, prefabs.current);

  if (prefabs.current.length < count && frameCount % (timeout * 60) === 0) {
    const point = startPoint();
    if (point)
      prefabs.current.push({
        ...point,
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

  const destroy = (id: string) => {
    prefabs.current = prefabs.current.filter((i) => i.id !== id);
  };

  return (
    <>
      {prefabs.current.map((i) => (
        <Component {...i} key={i.id} destroy={destroy} />
      ))}
    </>
  );
};
