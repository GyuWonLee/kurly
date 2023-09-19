import React from 'react';
import './scss/intro_modal.scss';
import introModalImage from './images/47ba90e5-40a4-4bfd-b1f6-e8b444942a9d.jpg';



export default function IntroModalComponent ({introModalClocse, cookie}) {

    const {cookieName, cookieValue, cookieExpires} = cookie;  // 구조 분할 할당


    // 닫기 단순히 모달창만 안보이게 닫는다.
    const onClickClose=(e)=>{
        e.preventDefault();
        introModalClocse();  // 부모컴포넌트의 인트로 모달창 닫기함수 실행
    }

    // 다시 안 보기 1일 쿠키 설정하고 모달창 닫는다.
    const setCookie=()=>{
        let today = new Date();
        today.setDate(today.getDate() + cookieExpires); // 3일 셋팅 = 오늘날짜+1일        
        document.cookie = `${cookieName}=${cookieValue}; path=/; expires=${today.toUTCString()}`; 
    }

    // 다시 안 보기 클릭 이벤트
    const onClickSetCookieClose=(e)=>{
        e.preventDefault();
        setCookie();
        introModalClocse();
    }

    return (
        <div id='introModal'>
            <div className="container">
                <div className="wrap">
                    <div className="content">
                        <ul>
                            <li><a href="!#"><img src={introModalImage} alt="" /></a></li>
                            <li>
                                <button onClick={onClickSetCookieClose} >다시 안 보기</button>
                                <button onClick={onClickClose}>닫기</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};