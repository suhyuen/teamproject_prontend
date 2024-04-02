import "../css/noticepage.css";
import "../css/pagination.css";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import axios from "axios";

export default function NoticePage() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const [page, setPage] = useState(1);
  const [adminpostList, setAdminPostList] = useState([
    {
      uid: "",
      title: "",
      content: "",
      nickname: "",
      createdAt: "",
      viewer: "",
    },
  ]);

  const itemsPerPage = 5;

  useEffect(() => {
    axios.get("http://localhost:8080/notice").then((resp) => {
      setAdminPostList(resp.data);
    });
  }, []);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = adminpostList.slice(startIndex, endIndex);

  const noticeList = currentPageData.map((data) => {
    const createdAtDate = new Date(data.createdAt);
    const formattedDate = `${createdAtDate.getFullYear()}-${(
      createdAtDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${createdAtDate
      .getDate()
      .toString()
      .padStart(2, "0")}`;

    return (
      <div key={data.uid} id="notice-listcontent">
        <div id="notice-listnumber">
          <p>{data.uid}</p>
        </div>
        <div id="notice-listcontent1">
          <Link
            to={`/detailpost?uid=${data.uid}`}
            state={"notice"}
            onClick={handleClick}
          >
            <p id="notice-listcontent1p">{data.title}</p>
          </Link>
          <ul id="notice-listcontent2">
            <li>{data.nickname}</li>
            <li>작성일 {formattedDate}</li>
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
          <div id="notice-btndiv">
            <Link to="/adminwrite" onClick={handleClick}>
              <button id="notice-writebtn">
                <img
                  id="notice-buttonimg"
                  src="/image/pawbutton.png"
                  alt="paw"
                ></img>
                글작성
              </button>
            </Link>
          </div>
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
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={adminpostList.length}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={setPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
