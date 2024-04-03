import "../css/userdeletepage.css";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";
import axios from "axios";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UserdeletePage() {
  const [userDeleteDate, setUserDeleteDate] = useState([
    { img: "/image/userimg.png" },
  ]);
  const userDeleteImg = userDeleteDate.map((data,index) => {
    return <img id="userdelete-img" src={data.img} alt="userimg" key={index}></img>;
  });

  const navigate = useNavigate();

  // 비밀번호 입력란 입력시 formData에 password를 입력해주는 함수
  const [formData, setFormData] = useState({password:""});
  const handleChangeInput = (e) => {
    const{name, value} = e.target;
    setFormData({...formData, [name]:value});
  }
  
  // 삭제동의 체크박스에 체크했는지 여부를 확인해주는 함수
  const checkboxClick = useRef(true);
  const handleClickCheckbox = () => {
    checkboxClick.current= checkboxClick.current===true?false:true;
    console.log(checkboxClick);
  }

  
  // 서버에 삭제요청해주는 함수  id:userdelete-button로 작동
  const token = useSelector((state) => state.token.value);
  const userId = useSelector((state) => state.userId.value);

  const handelClickUserDeleteButton = (e) => {
    e.preventDefault();
    if(checkboxClick.current === false){
      const resp = axios.post(
        `${process.env.REACT_APP_API_URL}/exitMember`,
        { userPw: formData.password, userId: userId },
        { headers: { "Content-Type": "application/json", "Authorization": token } }
      ).then((resp)=>{
        alert(resp.data);
        navigate(resp.data === "회원 탈퇴가 완료되었습니다."?"/":"");
      })
    }else{
      alert("탈퇴에 동의해주세요");
    }
  }

  return (
    <>
    <div>
      <Header />
      <div id="userdeletemain">
        <div id="userdelete-content">
          {userDeleteImg}
          <h1 id="userdelete-title">회원 탈퇴</h1>
          <form id="userdeletle-form" onSubmit={handelClickUserDeleteButton}>
            <div id="userdelete-conditions">
              가입된 회원정보가 모두 삭제됩니다. 작성하신 게시물은 삭제되지
              않습니다.
              <br /> 탈퇴 후 같은 계정으로 재가입 시 기존에 작성하신 게시물에
              대한 권한은 없어집니다. <br />
              회원 탈퇴에 동의하십니까?
            </div>
            <div id="userdelete-agree">
              <input type="checkbox" id="userdelete-agreebox" onClick={handleClickCheckbox}/>
              <label id="userdelete-agreelabel" htmlFor="agree">
                동의합니다.
              </label>
            </div>
            <input
              id="userdelete-pw"
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              autoComplete="new-password"
              onChange={handleChangeInput}
            ></input>
            <button id="userdelete-button" type="submit">
              <img
                id="userdelete-buttonimg"
                src="/image/pawbutton.png"
                alt="paw"
              ></img>
              탈퇴
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}
