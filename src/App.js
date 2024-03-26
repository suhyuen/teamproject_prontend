import "./App.css";
import { Route, Routes } from "react-router-dom";

import HomePage from "./page/Homepage";
import CatpostPage from "./page/CatpostsPage";
import DogpostPage from "./page/DogpostsPage";
import EtcpostPage from "./page/EtcpostPage";
import DetailpostPage from "./page/DetailpostPage";
import FindidPage from "./page/FindidPage";
import FindpasswordPage from "./page/FindpasswordPage";
import LoginPage from "./page/LoginPage";
import MyPage from "./page/MyPage";
import MypostPage from "./page/MypostPage";
import NoticePage from "./page/NoticePage";
import SignupPage from "./page/SignupPage";
import UserdeletePage from "./page/UserdeletePage";
import WritePage from "./page/WritePage";
import UpdatepostPage from "./page/UpdatepostPage";
import UpdateuserPage from "./page/UpdateuserPage";

import store from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import AdminWritePage from "./page/AdminWritePage";
import UpdateAdminPage from "./page/UpdateAdminPage";

export const persistor = persistStore(store);

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/catposts" element={<CatpostPage />}></Route>
            <Route path="/dogposts" element={<DogpostPage />}></Route>
            <Route path="/etcposts" element={<EtcpostPage />}></Route>
            <Route path="/detailpost" element={<DetailpostPage />}></Route>
            <Route path="/findid" element={<FindidPage />}></Route>
            <Route path="/findpw" element={<FindpasswordPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
            <Route path="/myposts" element={<MypostPage />}></Route>
            <Route path="/notice" element={<NoticePage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/updateuser" element={<UpdateuserPage />}></Route>
            <Route path="/userdelete" element={<UserdeletePage />}></Route>
            <Route path="/write" element={<WritePage />}></Route>
            <Route path="/updatepost" element={<UpdatepostPage />}></Route>
            <Route path="/adminwrite" element={<AdminWritePage />}></Route>
            <Route
              path="/updateadminpost"
              element={<UpdateAdminPage />}
            ></Route>
          </Routes>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
