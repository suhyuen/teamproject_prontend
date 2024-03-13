import Header from "../component/Header"
import React, { useState } from "react"
import '../css/LoginPage.css';

export default function LoginPage(){
    const [checking, setChecking] = useState("")

    const handleCheckboxChange = () => {
        setChecking(!checking);
      };
    
    return(
        <>
           <Header/>
            <div className="lgoinContaner">
                <div className="title"><h1>회원가입</h1></div>
                <from className="content">
                    <input type="text" placeholder="이메일"></input>
                    <input type="text" placeholder="닉네임"></input>
                    <input type="password" placeholder="비밀번호"></input>
                    <input type="password" placeholder="비밀번호 확인"></input>
                    <div>
                        <p>키우고있는 반려동물</p>
                        <div>
                        </div>
                    </div>
                    <input type="이름"></input>
                    <input type="주소"></input>
                </from>
                <div className="button">회원가입</div>
            </div>
        </>
    )
}
