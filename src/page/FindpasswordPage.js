import "../css/findpasswordpage.css";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";

export default function FindpasswordPage() {
  return (
    <div>
      <Header />
      <div id="findpwmain">
        <div id="findpw-content">
          <img id="findpw-logo" src="/image/Untitled.png" alt="logo"></img>
          <h1 id="findpw-title">비밀번호 찾기</h1>

          <form id="findpw-form">
            <input id="findpw-id" type="text" placeholder="아이디" required />
            <input
              id="findpw-email"
              type="email"
              placeholder="이메일"
              required
            />
            <button id="findpw-button" type="submit">
              <img
                id="findpw-buttonimg"
                src="/image/pawbutton.png"
                alt="paw"
              ></img>
              인증번호 전송
            </button>
          </form>
          <form id="findpw-form1">
            <input
              id="findpw-number"
              type="text"
              placeholder="인증번호"
              required
            />
            <button id="findpw-button1" type="submit">
              <img
                id="findpw-buttonimg"
                src="/image/pawbutton.png"
                alt="paw"
              ></img>
              인증번호 확인
            </button>
          </form>
          <div id="findpassword">
            <div id="findpassword1">조회된 비밀번호</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
