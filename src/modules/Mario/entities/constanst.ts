import { screenWidth } from "../constants";

export const levelAspectRatio = 320 / 208;
export const levelWidth = 500;
export const levelHeight = (208 * levelWidth) / 320;

export const newLevelHeight = screenWidth / levelAspectRatio;
