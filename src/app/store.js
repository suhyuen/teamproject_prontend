import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tokenSlice from "./tokenSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userSlice from './userSlice';

const reducers = combineReducers({
    token: tokenSlice.reducer,  //@@@Slice.js 파일에 export defaultdp 경로가 겹치치 안도록하자
    userId: userSlice.reducer
})

const persistConfig = {
    key: "root",
    storage, // 로컬 스토리지에 저장
    whitelist: ["token", "userId"],
};

const persistedReducer = persistReducer(persistConfig, reducers);


export default configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})