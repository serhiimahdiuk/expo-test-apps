export type Position = {
  x: number;
  y: number;
};

export type Rect = Position & {
  w: number;
  h: number;
};

export type Prefab = Position & {
  id: string;
  isDestroyed: boolean;
};

export type PrefabComponentProps = Prefab & { destroy: (id: string) => void };

export type PrefabComponent = (props: PrefabComponentProps) => JSX.Element;

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
  sharedData: {
    enemies?: Prefab[];
    ship?: Position;
    bullets?: Prefab[];
  };
  frameCount: number;
  deltaTime: number;
};
