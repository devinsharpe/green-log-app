import { atom } from "recoil";

const toastMessageState = atom({
  key: "toastMessageState",
  default: [],
});

export { toastMessageState };
