import { Link } from "react-router-dom";
import Header from "../component/Header";
import "../css/homepage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "../css/swiper.css";
import { useState, useEffect } from "react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import React from "react";
import Footer from "../component/Footer";

export default function HomePage() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const [tipData, setTipData] = useState([
    {
      title: "",
    },
  ]);

  useEffect(() => {
    axios.get("http://localhost:8080/tip").then((resp) => {
      const reversedTipData = [...resp.data].reverse();
      setTipData(reversedTipData);
    });
  }, []);

  const boardList1 = (
    <div className="main2_grid">
      {tipData.slice(0, 2).map((data) => (
        <div className="main2_img">
          <img src="/image/강아지사진12.jpg" width="474px" height="300px"></img>
          <Link
            to={`/detailpost?uid=${data.uid}`}
            state={"tip"}
            onClick={handleClick}
          >
            <p id="tip_p">{data.title}</p>
          </Link>
        </div>
      ))}
      {tipData.slice(2, 4).map((data) => (
        <div className="main2_img">
          <img src="/image/강아지사진12.jpg" width="474px" height="300px"></img>
          <Link to={`/detailpost?uid=${data.uid}`} onClick={handleClick}>
            <p id="tip_p1">{data.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
  const [postData, setPostData] = useState([
    {
      title: "",
      nickname: "",
      createdAt: "",
      viewer: "",
    },
  ]);
  useEffect(() => {
    axios.get("http://localhost:8080/homenotice").then((resp) => {
      setPostData(resp.data);
    });
  }, []);
  const boardList = postData.slice(0, 5).map((data) => {
    const createdAtDate = new Date(data.createdAt);
    const formattedCreatedAt = `${createdAtDate.getFullYear()}-${(
      createdAtDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${createdAtDate
      .getDate()
      .toString()
      .padStart(2, "0")}`;
    return (
      <div className="main3_list">
        <Link
          to={`/detailpost?uid=${data.uid}`}
          state={"notice"}
          onClick={handleClick}
        >
          <div id="homenotice">{data.title}</div>
        </Link>
        <div>
          <p>{data.nickname}</p>
          <p>작성일 {formattedCreatedAt}</p>
          <p>조회 {data.viewer}</p>
        </div>
      </div>
    );
  });

  function enterkey() {
    if (window.event.keyCode == 13) {
      document.getElementById("serchForm").submit();
    }
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
      />
      <Header></Header>
      <nav>
        <div className="main1">
          <img src="/image/Untitled.png" width="230px" height="200px"></img>
          <form>
            <div>
              <input
                onKeyUp={enterkey}
                type="search"
                placeholder="검색어 입력"
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>

          <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
        </div>
        <div className="main2">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            <SwiperSlide>
              <img
                src="/image/강아지사진.jpg"
                width="1160px"
                height="400px"
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/image/이미지.jpg" width="1160px" height="400px"></img>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img
                src="/image/고양이1.webp"
                width="1160px"
                height="400px"
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img src="/image/이미지2.jpg" width="1160px" height="400px"></img>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img src="/image/만화2.webp" width="1160px" height="400px"></img>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="main2">
          <div>정보&팁</div>
          <div>{boardList1}</div>
        </div>
        <div className="main3">
          <div className="main3_1">
            <div>공지사항</div>
            <div>
              <div>+</div>
              <div>
                <Link to="notice" onClick={handleClick}>
                  더보기
                </Link>
              </div>
            </div>
          </div>
          {boardList}
        </div>
      </nav>
      <Footer></Footer>
    </>
  );
}
