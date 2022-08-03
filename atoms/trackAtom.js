import { atom } from "recoil";

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: "6wQlQrTY5mVS8EGaFZVwVF",
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});

export const currentTrackState = atom({
  key: "currentTrackState",
  default: null,
});

export const openImageState = atom({ key: "openImageState", default: false });
