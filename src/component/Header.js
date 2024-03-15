import { Link } from "react-router-dom";

import "../css/header.css";

export default function Header() {
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
        <ul>
          <Link to="/login">
            <li className="link_login">로그인</li>
          </Link>
          <Link to="/signup">
            <li>회원가입</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
