import Header from "../component/Header"
import Footer from "../component/Footer"
import axios from "axios";
import React, { useState } from "react"
import '../css/LoginPage.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { token } from "../app/tokenSlice";
import { userId } from "../app/userSlice";

export default function LoginPage(){
    const [formData, setFormData] = useState({userId:"", userPw:""});

    const dispatch = useDispatch();
    const tokenSelecter = useSelector((state) => state.token.value);

    const navgate = useNavigate();
    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name] : value});
    }

    const handleClickButtonLogin = async() => {
        try {
            const response = await axios.post(
                "http://localhost:8080/login",
                {
                    username: formData.userId,
                    password: formData.userPw
                },
                {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }
            );
            if(response.headers !== null){
                dispatch(token(response.headers.authorization));
                dispatch(userId(formData.userId));
                navgate("/")
            }
        } catch (error) {
            alert("id와 pw를 확인해주세요")
        }
    }

    return (
        <>
        <Header></Header>
        <div className="loginContaner">
            <img className="lgoinLogo" src="../image/Untitled.png" alt="토끼그림"></img>
            <form className="loginContent">
                <input type="text" name="userId" placeholder="아이디" onChange={handleChangeInput}></input>
                <input type="password" name="userPw" placeholder="패스워드" onChange={handleChangeInput}></input>
            </form>
            <button className="loginButton" onClick={handleClickButtonLogin}>로그인</button>
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
