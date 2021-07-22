import { atom } from "recoil";

const accountState = atom({
  key: "accountState",
  default: null,
});

export { accountState };
