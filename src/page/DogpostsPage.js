import Header from "../component/Header"
import Footer from "../component/Footer"
import React, { useEffect, useState } from "react"
import '../css/dogpostpage.css';
import Select from "react-select";


export default function DogpostPage(){
    
    const Write = () => {
        const select = [
         { value: "", label: "선택하세요" },
         { value: "friend", label: "동네친구" },
         { value: "pride", label: "동물자랑" },
         { value: "anmalInfo", label: "동물정보" }
        ] //원래는 select 태그 안에 들어가는 애들을 배열로 만들어준다.
        
        const [selectMenu, setSelectMenu] = useState(select[0]);
        //안에 들어가는 값을 받아야해서 state사용
        
        return(
            <Select options={select} //위에서 만든 배열을 select로 넣기
            onChange={setSelectMenu} //값이 바뀌면 setState되게
            defaultValue={select[0]} //사용자가 값을 선택하지 않아도 기본 값으로 '온라인'=={online[0]}이 값으로 들어갈 수 있게
            /> 
        )
    }

    return (
        <>
        <Header></Header>
        <div className="dogPostContaner">
            <img className="dogPostLogo" src="../image/Untitled.png" alt="토끼그림"></img>
            <div className="dogPostFunc">
                <Write></Write>
                <button>글작성</button>
            </div>
            <div className="dogPost">
                <span>1</span>
                <div>
                    <p>{"<"}동네친구{">"} 같이산책해요</p>
                    <ul>
                        <li>작성자</li>
                        <li>작성일</li>
                        <li>죄회</li>
                        <li>좋아요</li>
                    </ul>
                </div>
            </div>
            <div></div>
        </div>
        <Footer></Footer>
        </>
    )
}