import "../css/findpasswordpage.css";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";
import { useState } from "react";
import axios from "axios";

export default function FindpasswordPage() {
  const [formData, setFormData] = useState({
    userId:"",
    email:"",
    authNum:"",
    newPassword:"",
    ReNewPassword:""
  })

  const handleChangeInput = (e) => {
    const {name , value} = e.target;
    setFormData({...formData, [name]:value});
  }

console.log(formData)

  const handleClickAuthnum = () => {
      axios.post(
          "http://localhost:8080/sendmail",
          {
            userId: formData.userId,
            email: formData.email
          },
          {
              headers: {"Content-Type": "application/json"}
          }
      );
      alert("인증번호가 발송되었습니다.")
  }

  const handleClickFindpw = () => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}/;
     if(formData.userPw === formData.reUserPw && passwordRegex.test(formData.newPassword) === true){
      axios.post(
        "http://localhost:8080/sendmail",
        {
          code: formData.authNum,
          newPassword: formData.newPassword
        },
        {
            headers: {"Content-Type": "application/json"}
        }
      );
      alert("페스워드 변경이 완료되었습니다.");
     }else if(formData.userPw !== formData.reUserPw) {
        alert("페스워드가 서로 다릅니다.");
     }else if(passwordRegex.test(formData.userPw) !== true){
        alert("비밀번호는 영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 20자의 비밀번호여야 합니다.");
     }
  }

  return (
    <div>
      <Header />
      <div id="findpwmain">
        <div id="findpw-content">
          <img id="findpw-logo" src="/image/Untitled.png" alt="logo"></img>
          <h1 id="findpw-title">비밀번호 찾기</h1>

          <form id="findpw-form">
            <input id="findpw-id" name="userId" type="text" placeholder="아이디" onChange={handleChangeInput} required />
            <input id="findpw-email" name="email" type="email" placeholder="이메일" onChange={handleChangeInput} required />
            <button id="findpw-button" type="submit" onClick={handleClickAuthnum}>
              <img
                id="findpw-buttonimg"
                src="/image/pawbutton.png"
                alt="paw"
              ></img>
              인증번호 전송
            </button>
          </form>
          <form id="findpw-form1">
            <input id="findpw-number" type="text" name="authNum" placeholder="인증번호" onChange={handleChangeInput} required />
            <input id="findpw-id" name="newPassword" type="password" placeholder="새페스워드" onChange={handleChangeInput} required />
            <input id="findpw-email" name="reNewPassword" type="password" placeholder="새페스워드 확인" onChange={handleChangeInput} required />
            <button id="findpw-button1" type="submit" onClick={handleClickFindpw}>
              <img
                id="findpw-buttonimg"
                src="/image/pawbutton.png"
                alt="paw"
              ></img>
              인증번호 확인
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
