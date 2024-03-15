import { Link, useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import "../css/writepage.css";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill Editor의 스타일 파일

export default function WritePage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const handleChange = (value) => {
    setText(value);
  };

  const [formData, setFormData] = useState({
    categoriesUid: 1,
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

  return (
    <>
      <Header></Header>
      <form>
        <nav className="writepage">
          <div className="write_1">글쓰기</div>
          <div className="write_2">
            <div className="category_1">
              <p>카테고리 1</p>
              <div>
                <button>강아지</button>
                <button>고양이</button>
                <button>기타</button>
              </div>
            </div>
            <div>
              <div className="category_1">
                <p>카테고리 2</p>
                <div>
                  <button>동네친구</button>
                  <button>동물자랑</button>
                  <button>동물상식</button>
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
              <Link to="/myposts">
                <button>작성</button>
              </Link>
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
