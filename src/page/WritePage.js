import { Link, useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import "../css/writepage.css";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill Editor의 스타일 파일
import axios from "axios";
import { useSelector } from "react-redux";

export default function WritePage() {
  const tokenSelecter = useSelector((state) => state.token.value);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const handleChange = (value) => {
    setText(value);
  };

  const [formData, setFormData] = useState({
    userUid: "",
    pageUid: "",
    mainUid: "",
    title: "",
    content: "",
  });

  const handlerInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios
      .post(`${process.env.REACT_APP_API_URL}/write`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenSelecter,
        },
      })
      .then((e) => {
        navigate("/myposts");
      });
  };

  const [category1, setCategory1] = useState(null);
  const [category2, setCategory2] = useState(null);

  const handleCategoryClick = (category) => {
    setFormData({ ...formData, pageUid: category });
    setCategory1(category);
  };

  const handleSubCategoryClick = (category) => {
    setFormData({ ...formData, mainUid: category });
    setCategory2(category);
  };

  return (
    <>
      <Header></Header>
      <form onSubmit={handlesubmit}>
        <nav className="writepage">
          <div className="write_1">글쓰기</div>
          <div className="write_2">
            <div className="category_1">
              <p>카테고리 1</p>
              <div>
                <div
                  className={`category_list ${
                    category1 === "2" ? "clicked" : ""
                  }`}
                  onClick={() => handleCategoryClick("2")}
                >
                  강아지
                </div>
                <div
                  className={`category_list ${
                    category1 === "3" ? "clicked" : ""
                  }`}
                  onClick={() => handleCategoryClick("3")}
                >
                  고양이
                </div>
                <div
                  className={`category_list ${
                    category1 === "4" ? "clicked" : ""
                  }`}
                  onClick={() => handleCategoryClick("4")}
                >
                  기타
                </div>
              </div>
            </div>
            <div>
              <div className="category_1">
                <p>카테고리 2</p>
                <div>
                  <div
                    className={`category_list ${
                      category2 === "1" ? "clicked" : ""
                    }`}
                    onClick={() => handleSubCategoryClick("1")}
                  >
                    동네친구
                  </div>
                  <div
                    className={`category_list ${
                      category2 === "2" ? "clicked" : ""
                    }`}
                    onClick={() => handleSubCategoryClick("2")}
                  >
                    동물자랑
                  </div>
                  <div
                    className={`category_list ${
                      category2 === "3" ? "clicked" : ""
                    }`}
                    onClick={() => handleSubCategoryClick("3")}
                  >
                    동물상식
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="App">
              <input
                type="text"
                placeholder="제목입니다"
                name="title"
                value={formData.title}
                onChange={handlerInputChange}
              ></input>
              <div className="editor-container">
                <ReactQuill
                  theme="snow" // Snow theme 사용 (기본 테마)
                  value={formData.content}
                  onChange={(value) =>
                    setFormData({ ...formData, content: value })
                  }
                  placeholder="여기에 텍스트를 입력하세요..."
                  style={{ height: "486px", width: "736px" }}
                />
              </div>
            </div>
            <div className="write_button">
              <button type="submit">작성</button>
              <Link to="/">
                <button>취소</button>
              </Link>
            </div>
          </div>
        </nav>
      </form>
      <Footer></Footer>
    </>
  );
}
