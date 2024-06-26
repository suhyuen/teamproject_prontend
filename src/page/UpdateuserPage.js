import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/updateuser.css";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function UpdateuserPage() {

  
  const tokenSelecter = useSelector((state) => state.token.value);
  const userIdSelecter = useSelector((state) => state.userId.value);
  const [nicknameCheck, setNicknameCheck] = useState("")
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userNickname: "",
    userName: "",
    userId: "",
    userEmail: "",
    userAdress: "",
  });

  useEffect(() => {
    const response = axios.get(`${process.env.REACT_APP_API_URL}/userInfo`, 
    {
      params: { userId: userIdSelecter },
      headers: { Authorization: tokenSelecter }
    })
    .then((response) => {
      setFormData({
        userNickname : response.data.nickname,
        userName: response.data.username,
        userId: response.data.userId,
        userEmail: response.data.email,
        userAdress: response.data.adress,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  //input태그 입력시 formData에 저장하는 함수
  const handleChangeInput = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }
  //닉네임 체크 함수
  const handleClickNicknameButton = async (e) => {
  e.preventDefault();
  try {
    const regex = /^[가-힣A-Za-z0-9]{4,10}$/;
    if (regex.test(formData.userNickname)) {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/nicknameCheck`,
        { nickname: formData.userNickname },
        { headers: { "Content-Type": "application/json" }}
      );
      if (response.data === "ok") {
        setNicknameCheck(response.data);
        alert("사용 가능한 닉네임 입니다.");
      } else {
        alert("이미 사용중인 닉네임 입니다.");
      }
    } else {
      alert("닉네임은 영문, 한글, 숫자 조합으로 4자리~10자리까지 입력되어야 합니다.");
    }
  } catch (error) {
    console.error(error);
    alert("오류가 발생했습니다. 다시 시도해주세요.");
  }
};


  // 업데이트 함수
  const handleClickUpdateButton = () => {
    let normalization = true;
    let errorMessage = "nonError";
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (nicknameCheck !== "ok" || nicknameCheck === null) {
      // 닉네임 확인
      normalization = false;
      errorMessage = "닉네임 체크를 해주세요";
    } else if (emailRegex.test(formData.userEmail) === false) {
      // email 확인
      normalization = false;
      errorMessage = "이메일 양식을 확인해주세요";
    } 
    try {
      if (normalization === true) {
        const response = axios.post(
          `${process.env.REACT_APP_API_URL}/userInfoUpdate`,
          {
            userId: userIdSelecter,
            nickname: formData.userNickname,
            email: formData.userEmail,
            adress: formData.userAdress,
          },
          { headers: { "Content-Type": "application/json", "Authorization": tokenSelecter }
          }
        );
        alert(formData.userNickname + "수정 완료되었습니다.");
        navigate("/mypage");
      } else {
        alert(errorMessage);
      }
    } catch (error) {
      console.log(error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }

  }


  return (
    <>
      <Header></Header>
      <form>
        <nav className="updateuserpage">
          <div>회원 정보 수정</div>
          <div className="updateuser_1">
            <img src="/image/강아지2.jpg" width="210px" height="151px"></img>
            <button>사진 추가</button>
            <div>
              <div className="mypage_list">
                <p>닉네임</p>
                <input type="text" name="userNickname" value={formData.userNickname} onChange={handleChangeInput}></input>
                <button onClick={handleClickNicknameButton}>중복확인</button>
              </div>
              <div className="mypage_list">
                <p>이메일</p>
                <input type="text" name="userEmail" value={formData.userEmail} onChange={handleChangeInput}></input>
              </div>
              <div className="mypage_list">
                <p>주소</p>
                <input type="text" name="userAdress" value={formData.userAdress} onChange={handleChangeInput}></input>
              </div>
            </div>
            <div className="updateuser_button">
              <button onClick={handleClickUpdateButton}>
                <img
                  src="/image/강아지_발바닥-removebg-preview.png"
                  width="47px"
                  height="47px"
                ></img>
                <p>수정하기</p>
              </button>
            </div>
            <div className="updateuser_end">
              <Link to="/userdelete">
                <div>회원탈퇴</div>
              </Link>
              <div>회원 탈퇴 시 계정 관련 데이터를 복구할 수 없습니다.</div>
            </div>
          </div>
        </nav>
      </form>
      <Footer></Footer>
    </>
  );
}
