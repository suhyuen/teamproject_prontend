import "../css/findpasswordpage.css";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userId } from "../app/userSlice";
import { useNavigate } from "react-router-dom";

export default function FindpasswordPage() {
  const [formData, setFormData] = useState({
    userId:"",
    email:"",
    authNum:"",
    newPassword:"",
    reNewPassword:""
  })

  const dispatch = useDispatch();
  const userIdSelecter = useSelector((state) => state.userId.value);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const {name , value} = e.target;
    setFormData({...formData, [name]:value});
  }

  const handleClickAuthnum = async(e) => {
      e.preventDefault();
      await axios.post(
        `${process.env.REACT_APP_API_URL}/sendmail`,
          {
            userId: formData.userId,
            email: formData.email
          },
          {
              headers: {"Content-Type": "application/json"}
          }
      ).then((resp) => {
        alert(resp.data === true ? "인증번호가 발송되었습니다.":"인증번호 발송에 실패하였습니다. id와 pw를 확인해주세요");
        if(resp.data === true){
          dispatch(userId(formData.userId)); 
        }; 
      })
  }

  const handleClickFindpw = async(e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}/;
    const authCode = /^[0-9]$/;
     if(authCode.test(formData.authNum) !== true 
      && formData.authNum !== ""
      && formData.newPassword === formData.reNewPassword 
      && passwordRegex.test(formData.newPassword) === true){
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/rePassword`,
        {
          userId: userIdSelecter,
          code: formData.authNum,
          newPassword: formData.newPassword
        },
        {
            headers: {"Content-Type": "application/json"}
        }
      );
        if(response.data === true){
          alert("패스워드 변경이 완료됐습니다.");
          navigate("/")
        }else{
          alert("패스워드 변경에 실패했습니다. 관리자에게 문의해주세요.")
        }
     }else{
        alert("입력양식을 확인해주세요");
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
              새패스워드 만들기
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
