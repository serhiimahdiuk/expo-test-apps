import { O, X } from "./constants";

export type Mark = typeof X | typeof O;
export type Playground = (Mark | number)[];
