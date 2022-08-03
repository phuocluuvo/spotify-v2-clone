import { atom } from "recoil";
export const playlistState = atom({
  key: "playlistState",
  default: null,
});
export const playlistIdState = atom({
  key: "playlistIdState",
  default: "37i9dQZF1E37OSIIoI7KNI",
});

export const playlistDurationState = atom({
  key: "playlistDurationState",
  default: 0,
});
