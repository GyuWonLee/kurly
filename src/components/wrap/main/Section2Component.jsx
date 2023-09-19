import React,{useEffect, useState} from 'react';
import Section2SlideWrapSlide from './Section2SlideWrapSlide';
import axios from 'axios';
import $ from 'jquery';



export default function Section2Component() {



    const [state, setState] = useState({
        상품: [],
        n: 0
    });

   useEffect(()=>{

        axios({
            url:'./data/sec2_slide.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    상품: res.data.상품,
                    n: res.data.상품.length
                })
                $('#section2 .slide-wrap').css({width: `${25 * res.data.상품.length}%` })
            }
        })
        .catch((err)=>{
            console.log('AXIOS 실패!' + err );
        });

    },[]);


    // 섹션2 슬라이드 클릭 이벤트
    useEffect(()=>{
        let cnt=0;

        //1. 메인슬라이드함수
        mainSlide(); // 처음에 실행
        function mainSlide(){

            $('#section2 .slide-wrap').stop().animate({left: `${-100*cnt}%` },600);
            if(cnt===(Math.ceil(state.n / 4) - 1)){
                $('#section2 .arrow-next-btn').stop().fadeOut(300);
            }
            else{
                $('#section2 .arrow-next-btn').stop().fadeIn(300);
            }
            if(cnt===0){
                $('#section2 .arrow-prev-btn').stop().fadeOut(300);
            }
            else{
                $('#section2 .arrow-prev-btn').stop().fadeIn(300);
            }
        }
        
        //2-1. 다음카운트함수
        function nextCount(){
            cnt++;
            if(cnt>Math.ceil(state.n / 4) - 1) cnt=4;
            mainSlide();
        }
        //2-2. 이전카운트함수
        function prevCount(){
            cnt--;
            if(cnt<1) cnt=0;
            mainSlide();
        }

        //3. 다음버튼클릭이벤트
        $('#section2 .arrow-next-btn').on({
            click(e){
                e.preventDefault();
                nextCount();
            }
        });
        //3-2. 이전버튼클릭이벤트
        $('#section2 .arrow-prev-btn').on({
            click(e){
                e.preventDefault();
                prevCount();
            }
        });


    },[state.n]);



    return (
        <section id='section2'>
            <div className="container">
                <div className="title">
                    <h2>이 상품 어때요?</h2>
                </div>    
                <div className="content">
                    <div className="slide-container">
                        <div className="slide-view">                            
                            <Section2SlideWrapSlide  상품={state.상품} />
                        </div>
                        <a href="!#" className='arrow-next-btn'><img src="./img/intro/slide_arrow_white.svg" alt="" /></a>
                        <a href="!#" className='arrow-prev-btn'><img src="./img/intro/slide_arrow_white.svg" alt="" /></a>
                    </div>  
                </div>    
            </div>    
        </section>
    );
};
