import { Link } from "react-router-dom";
import Header from "../component/Header";
import "../css/homepage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "../css/swiper.css";
import { useState, useEffect } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import React from "react";
import Footer from "../component/Footer";

export default function HomePage() {
  const [postData, setPostData] = useState([
    {
      title: "제목입니다",
      nickname: "작성자",
      createdAt: "0000.00.00",
      viewer: "0",
    },
    {
      title: "제목입니다",
      nickname: "작성자",
      createdAt: "0000.00.00",
      viewer: "0",
    },
    {
      title: "제목입니다",
      nickname: "작성자",
      createdAt: "0000.00.00",
      viewer: "0",
    },
    {
      title: "제목입니다",
      nickname: "작성자",
      createdAt: "0000.00.00",
      viewer: "0",
    },
    {
      title: "제목입니다",
      nickname: "작성자",
      createdAt: "0000.00.00",
      viewer: "0",
    },
  ]);

  const boardList = postData.map((data) => {
    return (
      <div className="main3_list">
        <div>{data.title}</div>
        <div>
          <p>{data.nickname}</p>
          <p>작성일 {data.createdAt}</p>
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
                src="/image/99901_86791_3616.jpg"
                width="1160px"
                height="400px"
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/image/동물3.jpg" width="1160px" height="400px"></img>
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
              <img
                src="/image/고양이2.webp"
                width="1160px"
                height="400px"
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img src="/image/만화2.webp" width="1160px" height="400px"></img>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="main2">
          <div>정보&팁</div>
          <div>
            <div className="main2_img">
              <img src="/image/만화1.webp" width="474px" height="300px"></img>
              <p>제목</p>
            </div>
            <div className="main2_img">
              <img src="/image/동물1.jpg" width="474px" height="300px"></img>
              <p>제목</p>
            </div>
          </div>
          <div>
            <div className="main2_img">
              <img src="/image/동물2.jpg" width="474px" height="300px"></img>
              <p>제목</p>
            </div>
            <div className="main2_img">
              <img src="/image/강아지1.webp" width="474px" height="300px"></img>
              <p>제목</p>
            </div>
          </div>
        </div>
        <div className="main3">
          <div className="main3_1">
            <div>공지사항</div>
            <div>
              <div>+</div>
              <div>더보기</div>
            </div>
          </div>
          {boardList}
        </div>
      </nav>
      <Footer></Footer>
    </>
  );
}
