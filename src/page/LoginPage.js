import Header from "../component/Header"
import React, { useState } from "react"
import '../css/LoginPage.css';

export default function LoginPage(){
    
    return (
        <>
        <Header></Header>
        <div className="loginContaner">
            <img className="logo" src="../image/Untitled.png" alt="토끼그림"></img>
            <form className="loginContent">
                <input type="text" placeholder="아이디"></input>
                <input type="text" placeholder="패스워드"></input>
            </form>
            <button className="loginButton">로그인</button>
            <div className="loginUserFunc">
                <div>
                    <p>ID찾기</p>
                    <p>비밀번호 찾기</p>
                </div>
                <p>회원가입</p>
            </div>
        </div>
        </>
    )
}
