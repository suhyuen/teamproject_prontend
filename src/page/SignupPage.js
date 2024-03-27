import Header from "../component/Header"
import Footer from "../component/Footer"
import axios from "axios";
import Address from "../component/Address"

import React, {useRef, useState } from "react"
import '../css/SignupPage.css';
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage(){
    const [dropdownView, setDropdownView] = useState("listOff")
    const [dropDownText, setDropDownText] = useState("키우고 있는 반려동물")
    const [formData, setFormData] = useState({
        username:"",
        nickname:"",
        userId:"",
        userPw:"",
        reUserPw:"",
        email:"",
        adress:"",
        animal:""
    });

    const idCheck = useRef("");  //id체크여부
    const nicknameCheck = useRef("");  //nickname체크여부

    const navigate = useNavigate();

    // dropDownButton 실행 이벤트
    const handleClickDropDownButton = (e) => {
        setDropdownView (dropdownView === "listOff" ? "listOn":"listOff");
        let text = e.target.dataset.value
        if(text != null){
            setDropDownText(text);
            setFormData(formData => ({...formData, animal: text}));
        }
        console.log(formData.animal);
    }

    // dropDownButton이 listOn상태일 때 바탕화면을 클릭하면 listOff로 바꿔주는 이벤트
    const handleClickLoginContaner = () => {
        if(dropdownView === "listOn"){
            setDropdownView("listOff")
        }
    }

    //input에 입력되는 text를 setFormData에 저장해주는 이벤트
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]:value});
    }

    //id 중복체크 이벤트
    const handleClickIdButton = async() => {
       try {
            const regex = /^[A-Za-z0-9]{4,10}$/;
            if(regex.test(formData.userId)){
                const response = await axios.post(
                    "http://localhost:8080/idCheck",
                    {userId: formData.userId},{headers: {"Content-Type": "application/json"}}
                );  
                idCheck.current = response.data;
                alert(idCheck.current==="ok"?"사용 가능한 아이디 입니다.":"이미 사용중인 아이디 입니다.");
            }else{
                alert("id는 영문 4자리~10자리까지 입력되어야 합니다.");
            }
       } catch (error) {
        console.error(error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
       }
    }

    //닉네임 중복체크 이벤트
    const handleClickNicknameButton = async() => {
        try {
            const regex = /^[가-힣A-Za-z0-9]{4,10}$/;
            if(regex.test(formData.nickname)){
                const response = await axios.post(
                    "http://localhost:8080/nicknameCheck",
                    {nickname : formData.nickname},{headers: {"Content-Type": "application/json"}}
                );
                nicknameCheck.current = response.data;
                alert(nicknameCheck.current==="ok"?"사용 가능한 닉네임 입니다.":"이미 사용중인 닉네임 입니다.");
            }else{
                alert("닉네임은 영문, 한글, 숫자 조합으로 4자리~10자리까지 입력되어야 합니다.");
            }
       } catch (error) {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
       }
    };    

    //회원가입 버튼 이벤트 / 작성된 from의 정규화 확인 후 회원가입여부 회신
    const handleClickJoinButton = async () => {
        let normalization = true;
        let errorMessage = "nonError";
    
        const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        const usernameRegex = /^[가-힣]*$/;
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}/;        
    
        if (idCheck.current !== "ok") {  // id 확인
            normalization = false;
            errorMessage = "id 체크를 해주세요";
        } else if (nicknameCheck.current !== "ok") {  // 닉네임 확인
            normalization = false;
            errorMessage = "닉네임 체크를 해주세요";
        } else if (passwordRegex.test(formData.userPw) === false) {  // pw 확인1
            normalization = false;
            errorMessage = "비밀번호는 영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 20자의 비밀번호여야 합니다.";
        } else if (formData.userPw !== formData.reUserPw) {  // pw 확인2
            normalization = false;
            errorMessage = "비밀번호가 동일하지 않습니다.";
        } else if (formData.animal === null) {    // 동물카테고리 확인
            normalization = false;
            errorMessage = "동물 카테고리가 선택되지 않았습니다.";
        } else if (emailRegex.test(formData.email) === false) {  // email 확인
            normalization = false;
            errorMessage = "이메일 양식을 확인해주세요";
        } else if (usernameRegex.test(formData.username) === false) { // 이름 확인
            normalization = false;
            errorMessage = "이름은 한글로 입력해주셔야 합니다.";
        }
    
        try {
            if (normalization === true) {
                const response = await axios.post(
                    "http://localhost:8080/signup",
                    { 
                        username:formData.username,
                        nickname:formData.nickname,
                        userId:formData.userId,
                        userPw:formData.userPw,
                        email:formData.email,
                        adress:formData.adress,
                        animal:formData.animal
                    },
                    { headers: { "Content-Type": "application/json" } }
                );
                console.log(formData);
                alert(formData.nickname + "님 가입해주셔서 감사합니다.");
                navigate("/login");
            } else {
                alert(errorMessage);
            }
        } catch (error) {
            console.log(error)
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
    }

    return(
        <>
           <Header></Header>
            <div className="lgoinContaner" onClick={handleClickLoginContaner}>
                <div className="title"><h1>회원가입</h1></div>
                <form className="content">
                    <div>
                        <input type="text" name="userId" placeholder="아이디" onChange={handleChangeInput}></input>
                        <button type="button" onClick={handleClickIdButton}>중복체크</button>
                    </div>
                    <div>
                        <input type="text" name="nickname" placeholder="닉네임" onChange={handleChangeInput}></input>
                        <button type="button" onClick={handleClickNicknameButton}>중복체크</button>
                    </div>
                    <input type="password" name="userPw" placeholder="비밀번호" onChange={handleChangeInput}></input>
                    <input type="password" name="reUserPw" placeholder="비밀번호 확인" onChange={handleChangeInput}></input>
                    <div className="dropDownButton" onClick={handleClickDropDownButton}>
                        <div>
                            <span>{dropDownText}</span>
                            <p>▼</p>
                        </div>
                        <ul className={dropdownView}>
                            <li className="dropdownText" name="animal" data-value="DOG" onClick={handleClickDropDownButton}>DOG</li>
                            <li className="dropdownText" name="animal" data-value="CAT" onClick={handleClickDropDownButton}>CAT</li>
                            <li className="dropdownText" name="animal" data-value="ETC" onClick={handleClickDropDownButton}>ETC</li>
                        </ul>
                    </div>
                    <input type="text" name="email" placeholder="이메일" onChange={handleChangeInput}></input>
                    <input type="text" name="username" placeholder="이름" onChange={handleChangeInput}></input>
                    <input type="text" name="adress" placeholder="주소" onChange={handleChangeInput}></input>
                </form>
                <button className="button" onClick={handleClickJoinButton}>회원가입</button>
            </div>
            <Footer></Footer>
        </>
    )
}