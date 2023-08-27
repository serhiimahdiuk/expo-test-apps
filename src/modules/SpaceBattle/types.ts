export type Position = {
  x: number;
  y: number;
};

export type Prefab = Position & {
  id: string;
  isDestroyed: boolean;
};

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

export type AnimationContextType = {
  togglePlayPause: (v?: boolean) => void;
  shareParams: (key: string, data?: any) => void;
  run: boolean;
  panPosition: PanPosition;
  sharedData: any;
  frameCount: number;
  deltaTime: number;
};
