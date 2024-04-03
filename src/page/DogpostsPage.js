import Header from "../component/Header";
import Footer from "../component/Footer";
import React, { useEffect, useState } from "react";
import "../css/dogpostpage.css";
import "../css/pagination.css";
import Select from "react-select";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { token } from "../app/tokenSlice";
import { Link } from "react-router-dom";
import axios from "axios";

export default function DogpostPage() {
  const dispatch = useDispatch();
  const tokenSelecter = useSelector((state) => state.token.value);

  const Write = () => {
    const select = [
      { value: "", label: "카테고리" },
      { value: "friend", label: "동네친구" },
      { value: "pride", label: "동물자랑" },
      { value: "anmalInfo", label: "동물정보" },
    ]; //원래는 select 태그 안에 들어가는 애들을 배열로 만들어준다.

    const [selectMenu, setSelectMenu] = useState(select[0]);
    //안에 들어가는 값을 받아야해서 state사용

    return (
      <Select
        options={select} //위에서 만든 배열을 select로 넣기
        onChange={setSelectMenu} //값이 바뀌면 setState되게
        defaultValue={select[0]} //사용자가 값을 선택하지 않아도 기본 값으로 '온라인'=={online[0]}이 값으로 들어갈 수 있게
      />
    );
  };

  function enterkey() {
    if (window.event.keyCode == 13) {
      document.getElementById("serchForm").submit();
    }
  }

  //pagination 함수
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };

  const [postData, setPostData] = useState([
    {
      uid: "",
      mainName: "",
      title: "",
      commentCount: "",
      user: { nickname: "" },
      createdAt: "",
      viewer: "",
      likeCount: "",
    },
  ]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/dogposts?pageUid=2`).then((resp) => {
      setPostData(resp.data);
    });
  }, []);

  const boardList = postData.map((data) => {
    return (
      <div className="main3_list">
        <div>
          <div>{data.uid}</div>
          <div>&lt;{data.mainName}&gt;</div>
          <div>
            <Link to={`/detailpost?uid=` + data.uid}>
              <div>{data.title}</div>
            </Link>
            <p>[{data.commentCount}]</p>
          </div>
        </div>
        <div>
          <p>닉네임 {data.user.nickname}</p>
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
      <div className="dogPostContaner">
        <img
          className="dogPostLogo"
          src="../image/Untitled.png"
          alt="토끼그림"
        ></img>
        <div className="dogPostFunc">
          {/* <Write></Write> */}
          <select className="category" name="languages" id="lang" required>
            <option value="" disabled selected>
              카테고리
            </option>
            <option value="php">동네친구</option>
            <option value="java">동물자랑</option>
            <option value="golang">동물상식</option>
          </select>
          <Link to="/write">
            <button>글작성</button>
          </Link>
        </div>
        <div className="mypostlist">{boardList}</div>
        <form>
          <input onKeyUp={enterkey} type="search" placeholder="검색어 입력" />
        </form>
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
      <Footer></Footer>
    </>
  );
}
