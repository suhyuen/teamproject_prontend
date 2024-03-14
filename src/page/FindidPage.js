import Header from "../component/Header"
import React, { useState } from "react"
import '../css/findidpage.css';

export default function FindidPage(){
    
    return (
        <>
        <Header></Header>
        <div className="findIdContaner">
            <img className="findIdLogo" src="../image/Untitled.png" alt="토끼그림"></img>
            <form className="findIdInfo">
                <input type="text" placeholder="이름"></input>
                <input type="text" placeholder="이메일"></input>
            </form>
            <button className="findIdButton">인증번호 받기</button>
            <div className="findIdInfo">
                <input className="findIdInfo"type="text" placeholder="인증번호"></input>
                <button className="findIdButton">아이디 찾기</button>
            </div>
        </div>
        </>
    )
}