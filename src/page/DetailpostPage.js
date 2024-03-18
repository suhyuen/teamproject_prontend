import "../css/detailpostpage.css";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function DetailpostPage() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  const [editorHtml, setEditorHtml] = useState("");

  const modules = {
    toolbar: [["image"]],
  };
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const [dpostListData, setDpostListDate] = useState([
    {
      category: "dog",
    },
  ]);

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

  const [detailPostData, setDetailPostDate] = useState([
    {
      category: "카테고리",
      title: "글제목입니다.",
      img: "/image/userimg.png",
      nickname: "닉네임",
      createdAt: "0000.00.00",
      content: "내용입니다.",
    },
  ]);

  const detailPostList = detailPostData.map((data) => {
    return (
      <div id="detailpost-maincontent">
        <ul id="detailpost-title">
          <li>({data.category})</li>
          <li>{data.title}</li>
        </ul>
        <div id="detailpost-usertitle">
          <img id="detailpost-userimg" src={data.img} alt="post-userimg"></img>
          <ul id="detailpost-usertitleul">
            <li>{data.nickname}</li>
            <li>작성일 {data.createdAt}</li>
          </ul>
        </div>
        <div id="detailpost-maincontent1">{data.content}</div>
      </div>
    );
  });

  const [cmtData, setCmtData] = useState([
    {
      img: "/image/userimg.png",
      nickname: "닉네임",
      createdAt: "0000.00.00",
      content: "댓글 내용입니다",
    },
    {
      img: "/image/userimg.png",
      nickname: "닉네임",
      createdAt: "0000.00.00",
      content: "댓글 내용입니다",
    },
    {
      img: "/image/userimg.png",
      nickname: "닉네임",
      createdAt: "0000.00.00",
      content: "댓글 내용입니다",
    },
  ]);

  const cmtList = cmtData.map((data) => {
    return (
      <div id="detailpost-cmttitle">
        <div id="detailpost-cmttitlediv">
          <img
            id="detailpost-cmtuserimg"
            src={data.img}
            alt="post-userimg"
          ></img>
          <div>
            <ul id="detailpost-cmttitleul">
              <li>{data.nickname}</li>
              <li>작성일 {data.createdAt}</li>
            </ul>
            <p id="detailpost-cmttitlep">{data.content}</p>
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
            {detailPostList}
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
              <form id="detailpost-cmtform">
                <ReactQuill
                  style={{ width: "1080px", height: "110px" }}
                  theme="snow"
                  value={editorHtml}
                  onChange={setEditorHtml}
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
