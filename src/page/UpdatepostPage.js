import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import "../css/writepage.css";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill Editor의 스타일 파일
import { useSelector } from "react-redux";
import axios from "axios";

export default function UpdatepostPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tokenSelecter = useSelector((state) => state.token.value);
  const [text, setText] = useState("");
  const handleChange = (value) => {
    setText(value);
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

  const [formData, setFormData] = useState({
    uid: searchParams.get("uid"),
    user: {
      userUid: "",
    },
    userUid: "",
    pageUid: "",
    mainUid: "",
    title: "",
    content: "",
  });

  const [postData, setPostData] = useState([
    {
      uid: "",
      user: {
        userUid: "",
      },
      title: "",
      content: "",
      pageUid: "",
      mainUid: "",
    },
  ]);

  const handlerInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/detailpost?uid=${searchParams.get("uid")}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenSelecter,
          },
        }
      )
      .then((resp) => {
        setPostData(resp.data);
      });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:8080/updatepost/${searchParams.get("uid")}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenSelecter,
          },
        }
      )
      .then((e) => {
        alert("수정되었습니다.");
        navigate("/myposts");
      });
  };

  return (
    <>
      <Header></Header>
      <form onSubmit={handlesubmit}>
        <nav className="writepage">
          <div className="write_1">글수정</div>
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
              <button type="submit">수정</button>

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
