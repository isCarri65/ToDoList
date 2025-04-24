import { create } from "zustand";

interface ITaskModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const taskModalStore = create<ITaskModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
