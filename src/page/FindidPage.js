import Header from "../component/Header"
import React, { useEffect, useState } from "react"
import '../css/findidpage.css';

export default function FindidPage(){

    const [popState, setPopState] = useState("popupOff");
    
    // 인증번호 발송 이벤트 차후 메일로 인증번호 보내는 기능 추가할것
    const handleClickCertifiedButton = () => {
        alert("고객님 이메일로 인증번호가 발송되었습니다.");
    }

    // 팝업 출력 이벤트
    const handleClickFindIdButton = () => {
        setPopState((popState != "popupOff"?"popupOff":"popupOn"))
        console.log(popState)
    }

    function esckey (){
        if(window.event.keyCode == 27){
            setPopState("popupOff")
        }
    }   


    return (
        <>
        <Header></Header>
        <div className="findIdContaner">
            <img className="findIdLogo" src="../image/Untitled.png" alt="토끼그림"></img>
            <div className={popState} onKeyUp={esckey}>
                <p>id : test</p>
                <button>
                    <img src="../image/pawbutton.png"></img>
                    <span>로그인</span>
                </button>
            </div>
            <form className="findIdInfo">
                <input type="text" placeholder="이름"></input>
                <input type="text" placeholder="이메일"></input>
            </form>
            <button className="certifiedButton" onClick={handleClickCertifiedButton}>인증번호 받기</button>
            <div className="findIdInfo">
                <input className="findIdInfo"type="text" placeholder="인증번호"></input>
                <button className="findIdButton"  onClick={handleClickFindIdButton}>아이디 찾기</button>
            </div>
        </div>
        </>
    )
}