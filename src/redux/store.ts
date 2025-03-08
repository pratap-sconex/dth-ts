import { configureStore } from "@reduxjs/toolkit";
import { thunk, ThunkMiddleware } from 'redux-thunk';

import { channelReducer } from "./channels/channelReducer";

const store = configureStore({
    reducer: { channelsState: channelReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk as unknown as ThunkMiddleware)
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;