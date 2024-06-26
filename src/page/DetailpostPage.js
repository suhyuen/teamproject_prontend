import "../css/detailpostpage.css";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";
import { useState, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function DetailpostPage() {
  const location = useLocation();
  const cameFromNotice =
    location.state === "notice" || location.state === "tip";
  const [searchParams, setSearchParams] = useSearchParams();
  const tokenSelecter = useSelector((state) => state.token.value);
  const navigate = useNavigate();
  const [editorHtml, setEditorHtml] = useState("");
  const [cmtData, setCmtData] = useState([
    {
      uid: "",
      user: {
        userUid: "",
      },
      user: {
        nickname: "",
      },
      createdAt: "",
      content: "",
    },
  ]);

  const [liked, setLiked] = useState(false);
  const [detailPostData, setDetailPostDate] = useState({
    uid: "",
    mainName: "",
    title: "",
    user: {
      nickname: "",
      userUid: "",
    },
    createdAt: "",
    content: "",
    mainUid: "",
    pageUid: "",
  });

  const [formData, setFormData] = useState({
    userUid: "",
    postUid: "",
    content: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/detailpost?uid=${searchParams.get("uid")}`)
      .then((resp) => {
        setDetailPostDate(resp.data);
        console.log(detailPostData);
      });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/detailpost/${searchParams.get("uid")}/comments`,
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
        `${process.env.REACT_APP_API_URL}/detailpost/comments?postUid=${searchParams.get(
          "uid"
        )}`
      )
      .then((resp) => {
        setCmtData(resp.data);
        console.log(detailPostData);
      });
  }, []);

  const handleDeleteComment = (uid) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/detailpost/${searchParams.get(
          "uid"
        )}/deletecomment`,
        {
          uid: uid,
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenSelecter,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        alert("댓글이 삭제되었습니다");
      });
  };

  const handleDeletePost = (uid) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/detailpost/${searchParams.get(
          "uid"
        )}/deletepost`,
        {
          uid: uid,
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenSelecter,
          },
        }
      )
      .then((resp) => {
        alert("게시글이 삭제되었습니다");
        navigate(`/myposts`);
      });
  };

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

  const cmtList = cmtData.map((data) => {
    return (
      <div key={data.uid} id="detailpost-cmttitle">
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
                <button
                  id="detailpost-delete"
                  onClick={() => {
                    handleDeleteComment(data.uid);
                  }}
                >
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
                      <Link
                        to={
                          cameFromNotice
                            ? `/updateadminpost?uid=${searchParams.get("uid")}`
                            : `/updatepost?uid=` + detailPostData.uid
                        }
                      >
                        <button id="detailpost-revise">수정</button>
                      </Link>
                      <button
                        type="button"
                        id="detailpost-delete"
                        onClick={() => {
                          handleDeletePost(detailPostData.uid);
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
              <div
                id="detailpost-maincontent1"
                dangerouslySetInnerHTML={{ __html: detailPostData.content }}
              ></div>
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
