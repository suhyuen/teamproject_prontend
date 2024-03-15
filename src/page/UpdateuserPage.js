import { Link } from "react-router-dom";
import "../css/updateuser.css";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useState, useEffect } from "react";

export default function UpdateuserPage() {
  const [userData, setUserData] = useState({
    userName: "홍길동",
    serNickname: "홍길동",
    userId: "id",
    userEmail: "email",
    userAdress: "adress",
  });
  return (
    <>
      <Header></Header>
      <form>
        <nav className="updateuserpage">
          <div>회원 정보 수정</div>
          <div className="updateuser_1">
            <img src="/image/강아지2.jpg" width="210px" height="151px"></img>
            <button>사진 추가</button>
            <div>
              <div className="mypage_list">
                <p>이름</p>
                <div>{userData.userName}</div>
              </div>
              <div className="mypage_list">
                <p>닉네임</p>
                <input type="text"></input>
                <button>중복확인</button>
              </div>
              <div className="mypage_list">
                <p>아이디</p>
                <input type="text"></input>
              </div>
              <div className="mypage_list">
                <p>이메일</p>
                <input type="text"></input>
              </div>
              <div className="mypage_list">
                <p>주소</p>
                <input type="text"></input>
              </div>
            </div>
            <div className="updateuser_button">
              <button>
                <img
                  src="/image/강아지_발바닥-removebg-preview.png"
                  width="47px"
                  height="47px"
                ></img>
                <p>수정하기</p>
              </button>
            </div>
            <div className="updateuser_end">
              <Link to="/userdelete">
                <div>회원탈퇴</div>
              </Link>
              <div>회원 탈퇴 시 계정 관련 데이터를 복구할 수 없습니다.</div>
            </div>
          </div>
        </nav>
      </form>
      <Footer></Footer>
    </>
  );
}
