import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import Section1SlideWrapSlide from './Section1SlideWrapSlide';

export default function Section1Component() {

    // 상태관리 Statement 
    // 실행주기(1)
    const [state, setState] = React.useState({
        이미지: [],   // 이미지 소스 22 개저장
        n: 0        
    });


    // 메인슬라이드 콘트럴러(Controler)
    React.useEffect(()=>{
        axios({
            url:'./data/sec1_slide.json',
            method:'GET'
        })
        .then((res)=>{
           
            // 가져온 데이터 상태 배열 변수에 저장
            if(res.status===200){
                setState({
                    이미지: res.data.이미지,  // data: json 데이터 객체 속성이름
                    n: res.data.이미지.length-2
                });
            }
        })
        .catch((err)=>{
            console.log( 'axios 실패!' );
            console.log(  err );
        });
    },[]);  // 빈배열


    return (
        <section id='section1'>
            
            <Section1SlideWrapSlide 이미지={state.이미지} n={state.n} />

        </section>
    );
};