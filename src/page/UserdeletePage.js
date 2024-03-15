import "../css/userdeletepage.css";
import Header from "../component/Header.js";
import { useState } from "react";
import Footer from "../component/Footer.js";

export default function UserdeletePage() {
  const [userDeleteDate, setUserDeleteDate] = useState([
    { img: "/image/userimg.png" },
  ]);
  const userDeleteImg = userDeleteDate.map((data) => {
    return <img id="userdelete-img" src={data.img} alt="userimg"></img>;
  });
  return (
    <div>
      <Header />
      <div id="userdeletemain">
        <div id="userdelete-content">
          {userDeleteImg}
          <h1 id="userdelete-title">회원 탈퇴</h1>
          <form id="userdeletle-form">
            <div id="userdelete-conditions">
              가입된 회원정보가 모두 삭제됩니다. 작성하신 게시물은 삭제되지
              않습니다.
              <br /> 탈퇴 후 같은 계정으로 재가입 시 기존에 작성하신 게시물에
              대한 권한은 없어집니다. <br />
              회원 탈퇴에 동의하십니까?
            </div>
            <div id="userdelete-agree">
              <input type="checkbox" id="userdelete-agreebox" />
              <label id="userdelete-agreelabel" for="agree">
                동의합니다.
              </label>
            </div>
            <input
              id="userdelete-pw"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            ></input>
            <button id="userdelete-button" type="submit">
              <img
                id="userdelete-buttonimg"
                src="/image/pawbutton.png"
                alt="paw"
              ></img>
              탈퇴
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
