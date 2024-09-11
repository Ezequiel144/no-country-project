import { create } from "zustand";

export const useTestCont = create((set) => {
  return {
    count: 0,
    inc: () => {
      set((state: any) => ({ count: state.count + 1 }));
    },
    dec: () => {
      set((state: any) => ({ count: state.count - 1 }));
    },
  };
});
