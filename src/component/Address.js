import React, { useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode'; // React용 다음 우편번호 서비스 라이브러리

export default function AddressForm() {
    const postcodeRef = useRef(); // 우편번호 입력란 ref
    const roadAddressRef = useRef(); // 도로명주소 입력란 ref
    const jibunAddressRef = useRef(); // 지번주소 입력란 ref
    const detailAddressRef = useRef(); // 상세주소 입력란 ref
    const extraAddressRef = useRef(); // 참고항목 입력란 ref

    // 우편번호 찾기 버튼 클릭 시 실행되는 함수
    const handleClickPostcode = () => {
        postcodeRef.current.handleOpen(); // 다음 우편번호 팝업 열기
    };

    // 다음 우편번호 팝업에서 주소를 선택했을 때 실행되는 함수
    const handleCompletePostcode = (data) => {
        // 우편번호 및 주소 정보 설정
        document.getElementById('sample4_postcode').value = data.zonecode;
        document.getElementById('sample4_roadAddress').value = data.roadAddress;
        document.getElementById('sample4_jibunAddress').value = data.jibunAddress;

        // 참고항목 설정
        let extraRoadAddr = '';
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')';
        }
        document.getElementById('sample4_extraAddress').value = extraRoadAddr;

        // 참고항목 표시
        const guideTextBox = document.getElementById('guide');
        if (data.autoRoadAddress) {
            const expRoadAddr = data.autoRoadAddress + extraRoadAddr;
            guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
            guideTextBox.style.display = 'block';
        } else if (data.autoJibunAddress) {
            const expJibunAddr = data.autoJibunAddress;
            guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
            guideTextBox.style.display = 'block';
        } else {
            guideTextBox.innerHTML = '';
            guideTextBox.style.display = 'none';
        }
    };

    
/*
    const [addressStyle, setAddressStyle] = useState({ display: 'none' });
    const handelClickAddressButton = () => {
        const offStyle = { display: 'none' };
        const onStyle = { position :"absolute"  }; // 오타 수정: 'fixed'로 변경
        setAddressStyle(addressStyle === offStyle ? onStyle : offStyle);
    }
*/

    return (
        <>
            <button>주소 입력창 열기</button>
            {/* 우편번호 입력란 */}
            <input type="text" id="sample4_postcode"  style={{ display: 'none' }}placeholder="우편번호" />
            {/* 우편번호 찾기 버튼 */}
            <input type="button"  style={{ display: 'none' }}value="우편번호 찾기" /><br />
            {/* 도로명주소 입력란 */}
            <input type="text" id="sample4_roadAddress" placeholder="도로명주소" ref={roadAddressRef} />
            {/* 지번주소 입력란 */}
            <input type="text" id="sample4_jibunAddress" style={{ display: 'none' }} placeholder="지번주소" ref={jibunAddressRef} />
            {/* 참고항목 */}
            <span id="guide" style={{ color: '#999', display: 'none' }}></span>
            {/* 상세주소 입력란 */}
            <input type="text" id="sample4_detailAddress" placeholder="상세주소" ref={detailAddressRef} />
            {/* 참고항목 입력란 */}
            <input type="text" id="sample4_extraAddress"  style={{ display: 'none' }} placeholder="참고항목" ref={extraAddressRef} />
            {/* 다음 우편번호 팝업 */}
            <DaumPostcode ref={postcodeRef} className='off_inputAddress' onComplete={handleCompletePostcode} />
        </>
    );
}