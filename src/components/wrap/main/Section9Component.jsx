import React,{useEffect, useState} from 'react';
import Section9SlideWrapSlide from './Section9SlideWrapSlide';
import axios from 'axios';
import $ from 'jquery';

export default function Section9Component() {

    const [state, setState] = useState({
        상품: [],
        n: 0,
        param: '샐러드·간편식'
    });

    const [para, setPara] = useState('샐러드·간편식');

    const onClickTabBtn=(e, value)=>{
        e.preventDefault();
        axiosApi(value);
        setPara(value);
    }


   const axiosApi=(value)=>{      
        let item = '';

        if(value===undefined){
            item = state.param;
        }
        else{
            item = value;
        }

        
        axios({
            url:'./data/sec9_slide.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){  
                
                    if( item==="샐러드·간편식" ){
                        setState({
                            ...state,
                            상품: res.data.샐러드·간편식,
                            n: res.data.샐러드·간편식.length
                        })
                        $('#section9 .slide-wrap').css({width: `${25 * res.data.샐러드·간편식.length}%` })
                    }
                    else if( item==="과일·견과·쌀" ){
                        setState({
                            ...state,
                            상품: res.data.과일·견과·쌀,
                            n: res.data.과일·견과·쌀.length
                        })
                        $('#section9 .slide-wrap').css({width: `${25 * res.data.과일·견과·쌀.length}%` })
                    }                    
                    else if( item==="국·반찬·메인요리" ){
                        setState({
                            ...state,
                            상품: res.data.국·반찬·메인요리,
                            n: res.data.국·반찬·메인요리.length
                        })
                        $('#section9 .slide-wrap').css({width: `${25 * res.data.국·반찬·메인요리.length}%` })
                    }
                    else if( item==="헤어·바디·구강" ){
                        setState({
                            ...state,
                            상품: res.data.헤어·바디·구강,
                            n: res.data.헤어·바디·구강.length
                        })
                        $('#section9 .slide-wrap').css({width: `${25 * res.data.헤어·바디·구강.length}%` })
                    }
                    
                    else if( item==="정육·계란" ){
                        setState({
                            ...state,
                            상품: res.data.정육·계란,
                            n: res.data.정육·계란.length
                        })
                        $('#section9 .slide-wrap').css({width: `${25 * res.data.정육·계란.length}%` })
                    }
                    
                    else if( item==="생수·음료·우유·커피" ){
                        setState({
                            ...state,
                            상품: res.data.생수·음료·우유·커피,
                            n: res.data.생수·음료·우유·커피.length
                        })
                        $('#section9 .slide-wrap').css({width: `${25 * res.data.생수·음료·우유·커피.length}%` })
                    }
                    
                    else if( item==="베이커리·치즈·델리" ){
                        setState({
                            ...state,
                            상품: res.data.베이커리·치즈·델리,
                            n: res.data.베이커리·치즈·델리.length
                        })
                        $('#section9 .slide-wrap').css({width: `${25 * res.data.베이커리·치즈·델리.length}%` })
                    }
                    
                    else if( item==="스킨케어·메이크업" ){
                        setState({
                            ...state,
                            상품: res.data.스킨케어·메이크업,
                            n: res.data.스킨케어·메이크업.length
                        })
                        $('#section9 .slide-wrap').css({width: `${25 * res.data.스킨케어·메이크업.length}%` })
                    }
                    
                    else if( item==="채소" ){
                        setState({
                            ...state,
                            상품: res.data.채소,
                            n: res.data.채소.length
                        })
                        $('#section9 .slide-wrap').css({width: `${25 * res.data.채소.length}%` })
                    }
                    
                    else if( item==="수산·해산·건어물" ){
                        setState({
                            ...state,
                            상품: res.data.수산·해산·건어물,
                            n: res.data.수산·해산·건어물.length
                        })
                        $('#section9 .slide-wrap').css({width: `${25 * res.data.수산·해산·건어물.length}%` })
                    }
                    
                    else if( item==="생활용품·리빙·캠핑" ){
                        setState({
                            ...state,
                            상품: res.data.생활용품·리빙·캠핑,
                            n: res.data.생활용품·리빙·캠핑.length
                        })
                        $('#section9 .slide-wrap').css({width: `${25 * res.data.생활용품·리빙·캠핑.length}%` })
                    }
                    else if( item==="면·양념·오일" ){
                        setState({
                            ...state,
                            상품: res.data.면·양념·오일,
                            n: res.data.면·양념·오일.length
                        })
                        $('#section9 .slide-wrap').css({width: `${25 * res.data.생활용품·리빙·캠핑.length}%` })
                    }
                    else if( item==="주방용품" ){
                        setState({
                            ...state,
                            상품: res.data.주방용품,
                            n: res.data.주방용품.length
                        })
                        $('#section9 .slide-wrap').css({width: `${25 * res.data.주방용품.length}%` })
                    }
                
        
               
            }
        })
        .catch((err)=>{
            console.log('AXIOS 실패!' + err );
        });
   } 

   useEffect(()=>{
       
        axiosApi();

    },[]);


    // 슬라이드 클릭 이벤트
    useEffect(()=>{
        let cnt=0;

        //1. 메인슬라이드함수
        mainSlide(); // 처음에 실행
        function mainSlide(){

            $('#section9 .slide-wrap').stop().animate({left: `${-100*cnt}%` },600);
            if(cnt===(Math.ceil(state.n / 4) - 1)){
                $('#section9 .arrow-next-btn').stop().fadeOut(300);
            }
            else{
                $('#section9 .arrow-next-btn').stop().fadeIn(300);
            }
            if(cnt===0){
                $('#section9 .arrow-prev-btn').stop().fadeOut(300);
            }
            else{
                $('#section9 .arrow-prev-btn').stop().fadeIn(300);
            }
        }
        
        //2-1. 다음카운트함수
        function nextCount(){
            cnt++;
            //if(cnt>Math.ceil(state.n / 4) - 1) cnt=4;
            mainSlide();
        }
        //2-2. 이전카운트함수
        function prevCount(){
            cnt--;
            //if(cnt<1) cnt=0;
            mainSlide();
        }

        //3. 다음버튼클릭이벤트
        $('#section9 .arrow-next-btn').on({
            click(e){
                e.preventDefault();
                nextCount();
            }
        });
        //3-2. 이전버튼클릭이벤트
        $('#section9 .arrow-prev-btn').on({
            click(e){
                e.preventDefault();
                prevCount();
            }
        });


    },[state.n]);



    return (
        <section id='section9'>
            <div className="container">
                <div className="title">
                    <h2><a href="!#">MD의 추천</a></h2>
                </div>    
                <div className="content">
                    <nav className='sec9-tab-menu'>
                        <ul>
                            <li><a href="!#" onClick={(e)=>onClickTabBtn(e,"샐러드·간편식")} className={para === "샐러드·간편식" ? 'on':''}>샐러드·간편식</a></li>
                            <li><a href="!#" onClick={(e)=>onClickTabBtn(e,"과일·견과·쌀")} className={para === "과일·견과·쌀" ? 'on':''}>과일·견과·쌀</a></li>
                            <li><a href="!#" onClick={(e)=>onClickTabBtn(e,"국·반찬·메인요리")} className={para === "국·반찬·메인요리" ? 'on':''}>국·반찬·메인요리</a></li>
                            <li><a href="!#" onClick={(e)=>onClickTabBtn(e,"헤어·바디·구강")} className={para === "헤어·바디·구강" ? 'on':''}>헤어·바디·구강</a></li>
                            <li><a href="!#" onClick={(e)=>onClickTabBtn(e,"정육·계란")} className={para === "정육·계란" ? 'on':''}>정육·계란</a></li>
                            <li><a href="!#" onClick={(e)=>onClickTabBtn(e,"생수·음료·우유·커피")} className={para === "생수·음료·우유·커피" ? 'on':''}>생수·음료·우유·커피</a></li>
                            <li><a href="!#" onClick={(e)=>onClickTabBtn(e,"베이커리·치즈·델리")} className={para === "베이커리·치즈·델리" ? 'on':''}>베이커리·치즈·델리</a></li>
                            <li><a href="!#" onClick={(e)=>onClickTabBtn(e,"스킨케어·메이크업")} className={para === "스킨케어·메이크업" ? 'on':''}>스킨케어·메이크업</a></li>
                            <li><a href="!#" onClick={(e)=>onClickTabBtn(e,"채소")} className={para === "채소" ? 'on':''}>채소</a></li>
                            <li><a href="!#" onClick={(e)=>onClickTabBtn(e,"수산·해산·건어물")} className={para === "수산·해산·건어물" ? 'on':''}>수산·해산·건어물</a></li>
                            <li><a href="!#" onClick={(e)=>onClickTabBtn(e,"생활용품·리빙·캠핑")} className={para === "생활용품·리빙·캠핑" ? 'on':''}>생활용품·리빙·캠핑</a></li>
                            <li><a href="!#" onClick={(e)=>onClickTabBtn(e,"면·양념·오일")} className={para === "면·양념·오일" ? 'on':''}>면·양념·오일</a></li>
                            <li><a href="!#" onClick={(e)=>onClickTabBtn(e,"주방용품")} className={para === "주방용품" ? 'on':''}>주방용품</a></li>
                        </ul>
                    </nav>
                    <div className="slide-container">
                        <div className="slide-view">                            
                            <Section9SlideWrapSlide  상품={state.상품} />
                        </div>
                        <a href="!#" className='arrow-next-btn'><img src="./img/intro/slide_arrow_white.svg" alt="" /></a>
                        <a href="!#" className='arrow-prev-btn'><img src="./img/intro/slide_arrow_white.svg" alt="" /></a>
                    </div>  
                </div>    
            </div>    
        </section>
    );
};
