import { configureStore } from "@reduxjs/toolkit";
import { thunk, ThunkMiddleware } from 'redux-thunk';

import { channelReducer } from "./channels/channelReducer";
import { plansReducer } from "./plans/planReducer";

const store = configureStore({
    reducer: { channelsState: channelReducer, plansState: plansReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk as unknown as ThunkMiddleware)
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;