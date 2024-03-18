import Header from "../component/Header"
import Footer from "../component/Footer"
import React, { useState } from "react"
import '../css/LoginPage.css';
import { Link } from "react-router-dom";

export default function LoginPage(){
    
    return (
        <>
        <Header></Header>
        <div className="loginContaner">
            <img className="lgoinLogo" src="../image/Untitled.png" alt="토끼그림"></img>
            <form className="loginContent">
                <input type="text" placeholder="아이디"></input>
                <input type="text" placeholder="패스워드"></input>
            </form>
            <button className="loginButton">로그인</button>
            <div className="loginUserFunc">
                <div>
                    <p><Link to="/findid">ID찾기</Link></p>
                    <p><Link to="/findpw">비밀번호 찾기</Link></p>
                </div>
                <p><Link to="/signup">회원가입</Link></p>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}
