// app/providers.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { FavoritesInitializer } from "./lib/components/FavoritesInitializer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <FavoritesInitializer />
      {children}
    </Provider>
  );
}
