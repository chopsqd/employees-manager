import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { auth, employees } from "./slices";
import { listenerMiddleware } from "../middleware/auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth, employees
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;