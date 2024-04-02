import "../css/adminwritepage.css";
import Header from "../component/Header";
import Footer from "../component/Footer";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AdminWritePage() {
  const tokenSelecter = useSelector((state) => state.token.value);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedButton1, setSelectedButton1] = useState(null);

  const handleButtonClick1 = (category) => {
    setAdminWriteFormData({ ...adminWriteFormData, pageUid: category });
    setSelectedButton(category);
  };

  const handleButtonClick2 = (category) => {
    setAdminWriteFormData({ ...adminWriteFormData, mainUid: category });
    setSelectedButton1(category);
  };

  const navigate = useNavigate();
  const handleChange = (value) => {
    setAdminWriteFormData({
      ...adminWriteFormData,
      content: value,
    });
    console.log(adminWriteFormData);
  };

  const [adminWriteFormData, setAdminWriteFormData] = useState({
    userUid: "",
    pageUid: "",
    mainUid: "",
    title: "",
    content: "",
  });

  const handleButtonClick = (value) => {
    setAdminWriteFormData({
      ...adminWriteFormData,
      pageUid: value,
    });
  };

  const handleSubButtonClick = (value) => {
    setAdminWriteFormData({
      ...adminWriteFormData,
      mainUid: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAdminWriteFormData({
      ...adminWriteFormData,
      [name]: value,
    });
    console.log(adminWriteFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/adminwrite", adminWriteFormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenSelecter,
        },
      })
      .then(() => {
        navigate("/", { replace: true });
      });
  };

  return (
    <div>
      <Header />
      <form id="adminwriteform" onSubmit={handleSubmit}>
        <nav id="adminwritepage">
          <div id="adminwrite_1">관리자 글 작성</div>
          <div id="admincategory">
            <div id="admincategory_1">
              <p>카테고리 1</p>
              <div>
                <button
                  type="button"
                  onClick={() => handleButtonClick1(1)}
                  style={{
                    backgroundColor:
                      selectedButton === 1 ? "rgb(34, 34, 117)" : "#fcd11e",
                  }}
                >
                  공지사항
                </button>
                <button
                  type="button"
                  onClick={() => handleButtonClick1(5)}
                  style={{
                    backgroundColor:
                      selectedButton === 5 ? "rgb(34, 34, 117)" : "#fcd11e",
                  }}
                >
                  정보&팁
                </button>
              </div>
            </div>
            <div id="admincategory_2">
              <p>카테고리 2</p>
              <div>
                <button
                  type="button"
                  onClick={() => handleButtonClick2(1)}
                  style={{
                    backgroundColor:
                      selectedButton1 === 1 ? "rgb(34, 34, 117)" : "#fcd11e",
                  }}
                >
                  동네친구
                </button>
                <button
                  type="button"
                  onClick={() => handleButtonClick2(2)}
                  style={{
                    backgroundColor:
                      selectedButton1 === 2 ? "rgb(34, 34, 117)" : "#fcd11e",
                  }}
                >
                  동물자랑
                </button>
                <button
                  type="button"
                  onClick={() => handleButtonClick2(3)}
                  style={{
                    backgroundColor:
                      selectedButton1 === 3 ? "rgb(34, 34, 117)" : "#fcd11e",
                  }}
                >
                  동물상식
                </button>
              </div>
            </div>
          </div>
          <div>
            <div id="App_admin">
              <input
                type="text"
                placeholder="제목입니다"
                name="title"
                value={adminWriteFormData.title}
                onChange={handleInputChange}
              ></input>
              <div id="admineditor-container">
                <ReactQuill
                  theme="snow"
                  value={adminWriteFormData.content}
                  onChange={handleChange}
                  placeholder="여기에 텍스트를 입력하세요..."
                  style={{ height: "486px", width: "736px" }}
                />
              </div>
            </div>
            <div id="tonadminwrite_but">
              <button type="submit">작성</button>
              <Link to="/">
                <button>취소</button>
              </Link>
            </div>
          </div>
        </nav>
      </form>
      <Footer />
    </div>
  );
}
