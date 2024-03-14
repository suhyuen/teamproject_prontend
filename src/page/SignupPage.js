import Header from "../component/Header"
import React, { useState } from "react"
import '../css/SignupPage.css';

export default function SignupPage(){
    const [dropdownView, setDropdownView] = useState("listOff")
    const [dropDownText, setDropDownText] = useState("키우고 있는 반려동물")

    // dropDownButton 실행 이벤트
    const handleClickDropDownButton = (e) => {
        setDropdownView (dropdownView === "listOff" ? "listOn":"listOff");
        let text = e.target.dataset.value
        if(text != null){
            setDropDownText(text);
        }
    }

    // dropDownButton이 listOn상태일 때 바탕화면을 클릭하면 listOff로 바꿔주는 이벤트
    const handleClickLoginContaner = () => {
        if(dropdownView === "listOn"){
            setDropdownView("listOff")
        }
    }

    return(
        <>
           <Header/>
            <div className="lgoinContaner" onClick={handleClickLoginContaner}>
                <div className="title"><h1>회원가입</h1></div>
                <form className="content">
                    <div>
                        <input type="text" placeholder="이메일"></input>
                        <button>중복체크</button>
                    </div>
                    <div>
                        <input type="text" placeholder="닉네임"></input>
                        <button>중복체크</button>
                    </div>
                    <input type="password" placeholder="비밀번호"></input>
                    <input type="password" placeholder="비밀번호 확인"></input>
                    <div className="dropDownButton">
                        <div>
                            <span onClick={handleClickDropDownButton}>{dropDownText}</span>
                            <p  onClick={handleClickDropDownButton}>▼</p>
                        </div>
                        <ul className={dropdownView}>
                            <li className="dropdownText" data-value="강아지" onClick={handleClickDropDownButton}>강아지</li>
                            <li className="dropdownText" data-value="고양이" onClick={handleClickDropDownButton}>고양이</li>
                            <li className="dropdownText" data-value="기타" onClick={handleClickDropDownButton}>기타</li>
                        </ul>
                    </div>
                    <input type="이름" placeholder="이름"></input>
                    <input type="주소" placeholder="주소"></input>
                </form>
                <button className="button">회원가입</button>
            </div>
        </>
    )
}