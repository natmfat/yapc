import { User } from "@prisma/client";
import { createContext, useContext, useRef } from "react";
import { create, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Nullable } from "~/lib/types";

interface StoreState {
  data: Nullable<User>;
  setData: (data: Nullable<User>) => void;
}

type Store = ReturnType<typeof createStore>;
type CreateStoreArgs = Pick<StoreState, "data">;

function createStore({ data }: CreateStoreArgs) {
  return create<StoreState>()(
    immer((set) => ({
      data,
      setData: (data) =>
        set((state) => {
          state.data = data;
        }),
    }))
  );
}

const StoreContext = createContext<Nullable<Store>>(null);

export const SessionStoreProvider = ({
  data,
  children,
}: React.PropsWithChildren<CreateStoreArgs>) => {
  const storeRef = useRef<Store>();
  if (!storeRef.current) {
    storeRef.current = createStore({ data });
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export function useSessionStore<T>(selector: (state: StoreState) => T): T {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("Missing SessionStoreProvider");
  }
  return useStore(store, selector);
}
