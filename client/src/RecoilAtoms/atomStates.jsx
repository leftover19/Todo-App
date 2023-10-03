import { atom } from "recoil";

export const emailState = atom({
  key: 'emailstate', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export const passwordState = atom({
  key : 'passState',
  default : '',
});

export const titleState = atom({
  key : 'title',
  default : '',
});

export const desState = atom ({
  key : "desc",
  default : '',
});

export const todoState = atom({
  key : "todo",
  default : [],
})
