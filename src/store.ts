import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeReducer } from "./common/reducers/ThemeReducer";
import { FilterReducer } from "./filter/reducers/FilterReducer";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["theme", "filter_benchmark"],
    version: 3.1,
    migrate: (state, version) => {
      if (state && state._persist && state._persist.version !== version) {
        storage.removeItem("persist:root");
      }
      return Promise.resolve(state);
    },
  },
  combineReducers({
    theme: ThemeReducer,
    filter_benchmark: FilterReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

const state = store.getState;

export type State = ReturnType<typeof state>;

export { store, persistor };
