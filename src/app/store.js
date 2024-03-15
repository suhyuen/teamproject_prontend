import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tokenSlice from "./tokenSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
    token: tokenSlice.reducer  //counterSlice.js에 export defaultdp 경로가 겹치치 안도록하자
})

const persistConfig = {
    key: "root",
    storage, // 로컬 스토리지에 저장
    whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, reducers);


export default configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})