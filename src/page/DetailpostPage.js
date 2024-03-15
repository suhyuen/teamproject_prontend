import "../css/detailpostpage.css";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";
import { useState, useEffect } from "react";

export default function DetailpostPage() {
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
              <button id="detailpost-likebtn" type="submit">
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
                <div id="detailpost-cmtformdiv">
                  <textarea
                    id="detailpost-cmtcontent"
                    type="text"
                    placeholder="댓글을 입력해주세요"
                  ></textarea>
                  <ul id="detailpost-cmtbtn">
                    <li>
                      <input id="detailpost-cmtfile" type="file"></input>
                      <label for="detailpost-cmtfile" id="detailpost-cmtimg">
                        <img src="/image/phote.png" alt="phote.uplode"></img>
                      </label>
                    </li>
                    <li>
                      <button id="detailpost-cmtbtn1" type="submit">
                        등록
                      </button>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
          <div id="detailpost-listbntndiv">
            <button id="detailpost-listbntn">
              <img
                id="detailpost-buttonimg"
                src="/image/pawbutton.png"
                alt="paw"
              ></img>
              목록 페이지
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
