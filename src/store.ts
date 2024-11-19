import { create } from "zustand";
import ListItem from "./api/mock.json";
import { persist } from "zustand/middleware";

type State = {
  items: typeof ListItem;
  deletedItems: {id: number, title: string}[];

};

type Actions = {
    deleteItem: (id: number, title: string) => void;
    setItems: (items: typeof ListItem) => void;
}

export const useStore = create(persist<State & Actions>((set) => ({
  items: [],
  deletedItems: [],
  deleteItem: (id: number, title: string) => {
    set((state) => {
    const currentDeletedItems = Array.isArray(state.deletedItems) ? state.deletedItems : [];
        return {
      ...state,
      items: state.items.filter((item) => item.id !== id),
      deletedItems: [...currentDeletedItems, { id, title }],
    }});
  },
  setItems: (items: typeof ListItem) => {
    set((state) => ({
      ...state,
      items,
    }));
  },
}), { name: "main-store" })); 
