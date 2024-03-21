import "../css/adminwritepage.css";
import Header from "../component/Header";
import Footer from "../component/Footer";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateAdminPage() {
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
    <div>
      <Header></Header>
      <form id="adminwriteform">
        <nav id="adminwritepage">
          <div id="adminwrite_1">관리자 글 수정</div>
          <div id="admincategory_1">
            <p>카테고리 1</p>
            <div>
              <button>공지사항</button>
              <button>정보&팁</button>
            </div>
          </div>
          <div>
            <div id="App_admin">
              <input
                type="text"
                placeholder="제목입니다"
                name="title"
                value={formData.title}
                onChange={handlerInputChange}
              ></input>
              <div id="admineditor-container">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) =>
                    setFormData({ ...formData, content: value })
                  }
                  placeholder="여기에 텍스트를 입력하세요..."
                  style={{ height: "486px", width: "736px" }}
                />
              </div>
            </div>
            <div id="tonadminwrite_but">
              <Link to="/">
                <button>수정</button>
              </Link>
              <Link to="/">
                <button>취소</button>
              </Link>
            </div>
          </div>
        </nav>
      </form>
      <Footer></Footer>
    </div>
  );
}
