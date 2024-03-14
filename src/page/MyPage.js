import { Link } from "react-router-dom";
import "../css/mypage.css";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useState, useEffect } from "react";

export default function MyPage() {
  const [userData, setUserData] = useState({
    userNickname: "홍길동",
    userName: "홍길동",
    userId: "id",
    userEmail: "email",
    userAdress: "adress",
  });
  return (
    <>
      <Header></Header>
      <nav className="mypage">
        <div className="mypage_1">
          <div>
            <Link to="/mypage">프로필</Link>
          </div>

          <div>
            <Link to="/myposts">내가 쓴 게시글</Link>
          </div>
        </div>

        <div className="mypage_2">
          <img src="/image/강아지2.jpg" width="266px" height="189px"></img>
          <div>
            <div className="mypage_list">
              <p>닉네임</p>
              <div>{userData.userNickname}</div>
            </div>
            <div className="mypage_list">
              <p>이름</p>
              <div>{userData.userName}</div>
            </div>
            <div className="mypage_list">
              <p>아이디</p>
              <div>{userData.userId}</div>
            </div>
            <div className="mypage_list">
              <p>이메일</p>
              <div>{userData.userEmail}</div>
            </div>
            <div className="mypage_list">
              <p>주소</p>
              <div>{userData.userAdress}</div>
            </div>
          </div>
          <Link to="/updateuser">
            <button className="mypage_button">
              <img
                src="/image/강아지_발바닥-removebg-preview.png"
                width="47px"
                height="47px"
              ></img>

              <p>회원 정보 수정</p>
            </button>
          </Link>
        </div>
        <div className="mypage_button2">
          <Link to="/">
            <button>로그아웃</button>
          </Link>
        </div>
      </nav>
      <Footer></Footer>
    </>
  );
}
