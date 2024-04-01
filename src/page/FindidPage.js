import Header from "../component/Header"
import Footer from "../component/Footer"
import React, { useEffect, useState } from "react"
import '../css/findidpage.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FindidPage(){

    const [popState, setPopState] = useState("popupOff");
    const [userData, setUserData] = useState({username:"", email:""});
    const [userId, setUserId] = useState("");

    const navigate = useNavigate();

    // 팝업 출력 이벤트
    const handleClickFindIdButton = async() => {
        const response = await axios.get(
            "http://localhost:8080/findId", 
        {
          params: { 
            username: userData.username,
            email: userData.email
            }
        }
        );
        setUserId(response.data);
        if(userId === "nullValue"){
            setUserId("등록되지 않은 사용자 입니다.")
        }
        setPopState((popState !== "popupOff"?"popupOff":"popupOn"));
    }

    // dropDownButton이 listOn상태일 때 바탕화면을 클릭하면 listOff로 바꿔주는 이벤트
    const handleClickFindidContaner = () => {
        if(popState === "popupOn"){
            setPopState("popupOff")
        }
    }

    // esc버튼 누를때 팝업 닫음
    window.onkeydown = function() {
        setPopState("popupOff")
    }

    //input입력시 userData에 저장하는 함수
    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]:value});
        console.log(userData);
    }

    

    return (
        <>
        <Header></Header>
        <div className="findIdContaner" onClick={handleClickFindidContaner}>
            <img className="findIdLogo" src="../image/Untitled.png" alt="토끼그림"></img>
            <div className={popState}>
                <p>id : {userId}</p>
                <button>
                    <img src="../image/pawbutton.png"></img>
                    <span>로그인</span>
                </button>
            </div>
            <form className="findIdInfo">
                <input type="text" name="username" placeholder="이름" onChange={handleChangeInput}></input>
                <input type="text" name="email" placeholder="이메일" onChange={handleChangeInput}></input>
            </form>
            <div className="findIdInfo">
                <button className="findIdButton"  onClick={handleClickFindIdButton}>아이디 찾기</button>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}