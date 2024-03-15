import "../css/noticepage.css";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";
import { useState, useEffect } from "react";

export default function NoticePage() {
  const [noticeData, setNoticeDate] = useState([
    {
      uid: "1",
      title: "공지사항 제목입니다.",
      nickname: "닉네임",
      createdAt: "0000.00.00",
      viewer: "0",
    },
    {
      uid: "2",
      title: "공지사항 제목입니다.",
      nickname: "닉네임",
      createdAt: "0000.00.00",
      viewer: "0",
    },
    {
      uid: "3",
      title: "공지사항 제목입니다.",
      nickname: "닉네임",
      createdAt: "0000.00.00",
      viewer: "0",
    },
    {
      uid: "4",
      title: "공지사항 제목입니다.",
      nickname: "닉네임",
      createdAt: "0000.00.00",
      viewer: "0",
    },
    {
      uid: "5",
      title: "공지사항 제목입니다.",
      nickname: "닉네임",
      createdAt: "0000.00.00",
      viewer: "0",
    },
  ]);

  const noticeList = noticeData.map((data) => {
    return (
      <div id="notice-listcontent">
        <div id="notice-listnumber">
          <p>{data.uid}</p>
        </div>
        <div id="notice-listcontent1">
          <p>{data.title}</p>
          <ul id="notice-listcontent2">
            <li>{data.nickname}</li>
            <li>작성일 {data.createdAt}</li>
            <li>조회 {data.viewer}</li>
          </ul>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Header />
      <div id="noticemain">
        <div id="notice-content">
          <img id="notice-logo" src="/image/Untitled.png" alt="logo"></img>
          <h1 id="notice-title">공지사항</h1>
          <div id="notice-list">{noticeList}</div>
          <form id="notice-form">
            <input id="notice-search" type="search"></input>
            <button id="notice-searchbtn" type="submit">
              <img
                id="notice-searchbtnimg"
                src="/image/searchbtn.png"
                alt="searchbtn"
              ></img>
            </button>
          </form>
          <ul id="noeice-number">
            <li>&lt;&lt;</li>
            <li>&lt;</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>&gt;</li>
            <li>&gt;&gt;</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
