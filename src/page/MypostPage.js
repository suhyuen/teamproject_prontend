import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";
import "../css/mypostpage.css";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import axios from "axios";

export default function MypostPage() {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const [postData, setPostData] = useState([
    {
      uid: "",
      categoryName: "",
      title: "",
      commentCount: "",
      nickname: "",
      createdAt: "",
      viewer: "",
      likeCount: "",
    },
  ]);

  const [userUid, setUserUid] = useState("");
  useEffect(() => {
    setUserUid("3");
  }, []);

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/myposts",
        { userUid }
        //{
        //headers: { Authorization: localStorage.getItem("accessToken") },
        // }
      )
      .then((resp) => {
        setPostData(resp.data);
      });
  }, []);

  const boardList = postData.map((data) => {
    return (
      <div className="main3_list" key={data.uid}>
        <div>
          <div>{data.uid}</div>
          <div>&lt;{data.categoryName}&gt;</div>
          <div>
            <Link to="/detailpost">
              <div>{data.title}</div>
            </Link>
            <p>[{data.commentCount}]</p>
          </div>
        </div>
        <div>
          <p>{data.nickname}</p>
          <p>작성일 {data.createdAt}</p>
          <p>조회 {data.viewer}</p>
          <p>좋아요 {data.likeCount}</p>
        </div>
      </div>
    );
  });
  return (
    <>
      <Header></Header>
      <nav className="mypostspage">
        <div className="mypost_1">
          <div>
            <Link to="/mypage">프로필</Link>
          </div>

          <div>
            <Link to="/myposts">내가 쓴 게시글</Link>
          </div>
        </div>
        <div className="mypostlist">{boardList}</div>
        <div className="pagination1">
          <Pagination
            activePage={page} // 현재 페이지
            itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={450} // 총 아이템 갯수
            pageRangeDisplayed={5} // paginator의 페이지 범위
            prevPageText={"‹"} // "이전"을 나타낼 텍스트
            nextPageText={"›"} // "다음"을 나타낼 텍스트
            onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
          />
        </div>
      </nav>
      <Footer></Footer>
    </>
  );
}
