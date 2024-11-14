import { createContext, useContext, useRef } from "react";
import { create, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { UserData, RoleData } from "~/.server/database/client";

interface UserStoreState {
  session: Nullable<UserData>;
  setSession: (session: Nullable<UserData>) => void;
  sessionRoles: RoleData[];
  setSessionRoles: (sessionRoles: RoleData[]) => void;
}

type UserStore = ReturnType<typeof createUserStore>;

type CreateUserStoreArg = Pick<UserStoreState, "session" | "sessionRoles">;

function createUserStore({ session, sessionRoles }: CreateUserStoreArg) {
  return create<UserStoreState>()(
    immer((set) => ({
      session,
      setSession: (session) =>
        set((state) => {
          state.session = session;
        }),

      sessionRoles,
      setSessionRoles: (sessionRoles) =>
        set((state) => {
          state.sessionRoles = sessionRoles;
        }),
    }))
  );
}

const UserStoreContext = createContext<Nullable<UserStore>>(null);

export const UserStoreProvider = ({
  session,
  sessionRoles,
  children,
}: React.PropsWithChildren<CreateUserStoreArg>) => {
  const storeRef = useRef<UserStore>();
  if (!storeRef.current) {
    storeRef.current = createUserStore({ session, sessionRoles });
  }
  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export function useUserStore<T>(selector: (state: UserStoreState) => T): T {
  const store = useContext(UserStoreContext);
  if (!store) {
    throw new Error("Missing UserStore.Provider");
  }
  return useStore(store, selector);
}
