import Header from "../component/Header"
import React, { useState } from "react"
import '../css/LoginPage.css';

export default function LoginPage(){
    const [dropdownView, setDropdownView] = useState("listOff")

    // dropDownButton 실행 이벤트
    const handleClickDropDownButton = () => {
        setDropdownView (dropdownView === "listOff" ? "listOn":"listOff");
    }

    // dropDownButton이 listOn상태일 때 바탕화면을 클릭하면 listOff로 바꿔주는 이벤트
    const handleClickLoginContaner = () => {
        if(dropdownView === "listOn"){
            setDropdownView("listOff")
        }
    }
    
      console.log(dropdownView)

    return(
        <>
           <Header/>
            <div className="lgoinContaner" onClick={handleClickLoginContaner}>
                <div className="title"><h1>회원가입</h1></div>
                <from className="content">
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
                            <span onClick={handleClickDropDownButton}>키우고 있는 반려동물</span>
                            <p  onClick={handleClickDropDownButton}>▼</p>
                        </div>
                        <ul className={dropdownView}>
                            <li onClick={handleClickDropDownButton}>강아지</li>
                            <li onClick={handleClickDropDownButton}>고양이</li>
                            <li onClick={handleClickDropDownButton}>기타</li>
                        </ul>
                    </div>
                    <input type="이름" placeholder="이름"></input>
                    <input type="주소" placeholder="주소"></input>
                </from>
                <button className="button">회원가입</button>
            </div>
        </>
    )
}
