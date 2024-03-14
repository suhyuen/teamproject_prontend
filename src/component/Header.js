import { Link } from "react-router-dom";

import "../css/header.css"

export default function Header(){
    return(
    <header>
        <img src ="/image/Untitled.png" width="100" height="100"></img>
        <div className="headerlist">
            <ul>
                <li>강아지</li>
                <li>고양이</li>
                <li>기타 동물</li>
            </ul>
        </div>
        <div className="header_login">
            <ul>
                <li>로그인</li>
                <li>회원가입</li>
            </ul>
        </div>
     </header>
    )
     
    
}    