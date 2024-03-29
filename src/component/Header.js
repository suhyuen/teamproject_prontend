import { Link } from "react-router-dom";
import "../css/header.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { token } from "../app/tokenSlice";
import { userId } from "../app/userSlice";

export default function Header() {
  const tokenSelecter = useSelector((state) => state.token.value);
  const userIdSelecter = useSelector((state) => state.userId.value);
  const dispatch = useDispatch();

  const handleClickButtonLogout = () => {
    dispatch(token(""));
    dispatch(userId(""));
    alert("로그아웃 되었습니다. 안녕히가세요");
  }

  return (
    <header>
      <Link to="/">
        <img src="/image/Untitled.png" width="100" height="100"></img>
      </Link>
      <div className="headerlist">
        <ul>
          <Link to="/dogposts">
            <li>강아지</li>
          </Link>
          <Link to="/catposts">
            <li>고양이</li>
          </Link>
          <Link to="/etcposts">
            <li>기타 동물</li>
          </Link>
        </ul>
      </div>
      <div className="header_login">
        <ul className={tokenSelecter===""?"viewOn":"viewOff"}>
          <Link to="/login">
            <li className="link_login">로그인</li>
          </Link>
          <Link to="/signup">
            <li>회원가입</li>
          </Link>
        </ul>
        <ul className={tokenSelecter===""?"viewOff":"viewOn"}>
          <Link to="/">
            <li className="link_login" onClick={handleClickButtonLogout}>로그아웃</li>
          </Link>
          <Link to="/mypage">
            <li>마이페이지</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
