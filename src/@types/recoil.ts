import { SetRecoilState, GetRecoilValue, ResetRecoilState } from "recoil";

export type TRecoilParameter = {
  set: SetRecoilState;
  get: GetRecoilValue;
  reset: ResetRecoilState;
};