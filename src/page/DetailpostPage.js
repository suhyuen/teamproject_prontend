import "../css/detailpostpage.css";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";
import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function DetailpostPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tokenSelecter = useSelector((state) => state.token.value);
  const navigate = useNavigate();
  const [editorHtml, setEditorHtml] = useState("");
  const [cmtData, setCmtData] = useState([
    {
      user: {
        nickname: "",
      },
      createdAt: "",
      content: "",
    },
  ]);

  const [liked, setLiked] = useState(false);
  const [detailPostData, setDetailPostDate] = useState({
    mainName: "",
    title: "",
    user: {
      nickname: "",
    },
    createdAt: "",
    content: "",
  });
  const [dpostListData, setDpostListDate] = useState([
    {
      category: "dog",
    },
  ]);

  const [formData, setFormData] = useState({
    userUid: "",
    postUid: "",
    content: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/detailpost?uid=${searchParams.get("uid")}`)
      .then((resp) => {
        setDetailPostDate(resp.data);
      });
  }, []);

  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/detailpost/${searchParams.get("uid")}/comments`,
        {
          content: editorHtml,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenSelecter,
          },
        }
      )
      .then((resp) => {
        navigate(`/detailpost`);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/detailpost/comments?postUid=${searchParams.get(
          "uid"
        )}`
      )
      .then((resp) => {
        setCmtData(resp.data);
      });
  }, []);

  const handleClickalertButton = () => {
    alert("삭제되었습니다.");
  };

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const modules = {
    toolbar: [["image"]],
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const dpostList = dpostListData.map((data) => {
    return (
      <Link to="/notice" onClick={handleClick}>
        <button id="detailpost-listbntn">
          <img
            id="detailpost-buttonimg"
            src="/image/pawbutton.png"
            alt="paw"
          ></img>
          목록 페이지
        </button>
      </Link>
    );
  });

  const cmtList = cmtData.map((data) => {
    return (
      <div id="detailpost-cmttitle">
        <div id="detailpost-cmttitlediv">
          <img
            id="detailpost-cmtuserimg"
            src="/image/userimg.png"
            alt="post-userimg"
          ></img>
          <div>
            <ul id="detailpost-cmttitleul">
              <li>{data.user.nickname}</li>
              <li>작성일 {data.createdAt}</li>
            </ul>
            <ul id="detailpost-cmttitleul1">
              <li>
                <p id="detailpost-cmttitlep">{data.content}</p>
              </li>
              <li>
                <button id="detailpost-revise">수정</button>
                <button id="detailpost-delete" onClick={handleClickalertButton}>
                  삭제
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Header />
      <div id="detailpostmain">
        <div id="detailpost-content">
          <form id="detailpost-contentform">
            <div id="detailpost-maincontent">
              <ul id="detailpost-title">
                <li>({detailPostData.mainName})</li>
                <li>{detailPostData.title}</li>
              </ul>
              <div id="detailpost-usertitle">
                <img
                  id="detailpost-userimg"
                  src="/image/userimg.png"
                  alt="post-userimg"
                ></img>
                <ul id="detailpost-usertitleul">
                  <li>{detailPostData.user.nickname}</li>
                  <li>
                    <p id="detailpost-createp">
                      작성일 {detailPostData.createdAt}
                    </p>
                    <div>
                      <Link to="/updatepost">
                        <button id="detailpost-revise">수정</button>
                      </Link>
                      <button
                        id="detailpost-delete"
                        onClick={handleClickalertButton}
                      >
                        삭제
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
              <div id="detailpost-maincontent1">{detailPostData.content}</div>
            </div>
            <div id="detailpost-likebtndiv">
              <button
                id="detailpost-likebtn"
                type="button"
                onClick={handleLikeClick}
                className={liked ? "liked" : ""}
              >
                <img
                  id="detailpost-like"
                  src="/image/like.png"
                  alt="detailpost-like"
                ></img>
              </button>
            </div>
          </form>
          <div id="detailpost-subcontent">
            <div id="detailpost-cmt">
              <div id="cmtlistdiv">{cmtList}</div>
              <form id="detailpost-cmtform" onSubmit={handlesubmit}>
                <ReactQuill
                  style={{ width: "1080px", height: "110px" }}
                  theme="snow"
                  value={editorHtml}
                  onChange={(value) => setEditorHtml(value)} // ReactQuill의 onChange에 직접 setEditorHtml을 전달
                  modules={modules}
                />
                <button id="detailpost-cmtbtn1a" type="submit">
                  등록
                </button>
              </form>
            </div>
          </div>
          <div id="detailpost-listbntndiv">{dpostList}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
