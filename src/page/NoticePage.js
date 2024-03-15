import "../css/noticepage.css";
import "../css/pagination.css";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

export default function NoticePage() {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };
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
          <Link to={"/detailpost"}>
            <p id="notice-listcontent1p">{data.title}</p>
          </Link>
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
          <Pagination
            activePage={page}
            itemsCountPerPage={5}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
