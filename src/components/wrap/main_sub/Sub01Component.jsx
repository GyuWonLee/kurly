import React, {useState, useEffect} from 'react';
import './scss/main_sub.scss';
import axios from 'axios';
import $ from 'jquery';
import {ViewProductContext} from '../../context/ViewProductContext';

export default function Sub01Component() {

    const {setViewProductFn} = React.useContext(ViewProductContext);
    const [state, setState] = useState({
        상품: []
     });



   useEffect(()=>{

        axios({
            url:'./data/sub_01.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                let 상품 = []; // 이유는 상태변수는 반복적으로 동작하면 마지막만 저장된다. 새로고침으로 인한 문제

                res.data.상품.map((item)=>{
                    상품 = [
                            ...상품, 
                            {
                                번호: item.번호,
                                이미지: item.이미지,
                                상품이름: item.상품이름,
                                할인율: item.할인율,
                                정가: item.정가,
                                판매가: Math.round(item.정가 * (1-item.할인율)),
                                후기카운트: item.후기카운트
                            }
                        ]
                });
                
                // 상태관리변수는 반복처리 끝나고 한번에 저장
                setState({ 
                    상품: 상품,
                    total: 상품.length,
                    list: 6,
                    totPage: 상품.length/6,
                    isCurrent: false,
                    clickNum: 1,  // 첫페이지 기본 => 클릭하면 해당페이지,
                    cnt: 1        // 첫페이지 노출
                })
            }    
        })
        .catch((err)=>{
            console.log('AXIOS 실패!' + err );
        });

    },[]);

    // 카테고리 버튼
    const [isCategoryBtn1, setIsCategoryBtn1] = React.useState(false);
    const [isCategoryBtn2, setIsCategoryBtn2] = React.useState(false);
    const [isCategoryBtn3, setIsCategoryBtn3] = React.useState(false);
    const [isCategoryBtn4, setIsCategoryBtn4] = React.useState(false);
    const [isCategoryBtn5, setIsCategoryBtn5] = React.useState(false);
    // 서브
    const [isSub2Order, setIsSub2Order] = React.useState(true);
    const [toggle1, setToggle1] = React.useState(false);
    const [toggle2, setToggle2] = React.useState(false);
    const [toggle3, setToggle3] = React.useState(false);
    const [toggle4, setToggle4] = React.useState(false);
    const [toggle5, setToggle5] = React.useState(false);

    React.useEffect(()=>{
 
        $('.category-btn1').on({
            click(e){                
                e.preventDefault();                   
                if(toggle1===false){
                    setToggle1(true);
                    $(this).next().stop().slideDown(200);
                    setIsCategoryBtn1(true);
                }
                else{
                    setToggle1(false);
                    $(this).next().stop().slideUp(300);
                    setIsCategoryBtn1(false);
                }
            }
        });

        $('.category-btn2').on({
            click(e){                
                e.preventDefault();                   
                if(toggle2===false){
                    setToggle2(true);
                    $(this).next().stop().slideDown(200);
                    setIsCategoryBtn2(true);
                }
                else{
                    setToggle2(false);
                    $(this).next().stop().slideUp(300);
                    setIsCategoryBtn2(false);
                }
            }
        });

        $('.category-btn3').on({
            click(e){                
                e.preventDefault();                   
                if(toggle3===false){
                    setToggle3(true);
                    $(this).next().stop().slideDown(200);
                    setIsCategoryBtn3(true);
                }
                else{
                    setToggle3(false);
                    $(this).next().stop().slideUp(300);
                    setIsCategoryBtn3(false);
                }
            }
        });
        $('.category-btn4').on({
            click(e){                
                e.preventDefault();                   
                if(toggle4===false){
                    setToggle4(true);
                    $(this).next().stop().slideDown(200);
                    setIsCategoryBtn4(true);
                }
                else{
                    setToggle4(false);
                    $(this).next().stop().slideUp(300);
                    setIsCategoryBtn4(false);
                }
            }
        });
        $('.category-btn5').on({
            click(e){                
                e.preventDefault();                   
                if(toggle5===false){
                    setToggle5(true);
                    $(this).next().stop().slideDown(200);
                    setIsCategoryBtn5(true);
                }
                else{
                    setToggle5(false);
                    $(this).next().stop().slideUp(300);
                    setIsCategoryBtn5(false);
                }
            }
        });


    },[toggle1,toggle2,toggle3,toggle4,toggle5]);
    // 카테고리

    const onClickOrder=(e, orderName)=>{
        e.preventDefault();
        if( orderName==='추천순' ){       // 데이터 상품명(문자열) 오름차순(Aescending; ASC)
            setState({
                ...state,
                상품: state.상품.sort((a,b) => (a.상품이름 < b.상품이름) ? (-1) : (a.상품이름 > b.상품이름 ? 1 : 0))
            })
        }        
        else if( orderName==='신상품순' ){ // 데이터 번호 오름차순(Aescending; ASC)
            setState({
                ...state,
                상품: state.상품.sort((a,b) => a.번호 - b.번호)
            })
        }
        else if( orderName==='오래된순' ){ // 데이터 번호 내림차순(Descending; DESC)
            setState({
                ...state,
                상품:  state.상품.sort((a,b) => b.번호 - a.번호)
            })
        }
        else if( orderName==='혜택순' ){  // 할인율 내림차순(Descending; DESC)
            setState({
                ...state,
                상품:  state.상품.sort((a,b) => b.할인율 - a.할인율)
            })
        }
        else if( orderName==='낮은가격순' ){ // 판매가 오름차순(Aescending; ASC)
            setState({
                ...state,
                상품:  state.상품.sort((a,b) => a.판매가 - b.판매가)
            })
        }
        else if( orderName==='높은가격순' ){ // 판매가 내림차순(Descending; DESC)
            setState({
                ...state,
                상품:  state.상품.sort((a,b)=> b.판매가 - a.판매가)
            })
        }

    }



    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();
        setViewProductFn(item, imgPath); // 현재 클릭한 상품정보가 최상위 컴포넌트에게 전달된다.
    }



    // 페이지네이션 
    // 페이지버튼 클릭 이벤트
    const onClickPageBtn=(e, clickNum)=>{
        e.preventDefault();
        setState({
            ...state,
            clickNum: clickNum
        })
    }

    // 페이지네이션 : 이전페이지 1씩감소 카운트
    const onClickPrev=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            cnt: state.cnt - 1
        })
    }

    // 페이지네이션 : 다음페이지 1씩증가 카운트
    const onClickNext=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            cnt: state.cnt + 1
        })
    }


    return (
        <main id='mainSub01' className='mainSub'>
            <section id="section1">
               <div className="container">
                    <div className="gap">
                        <div className="title hide">
                            <h2>이 주에 신상 랭킹</h2>
                        </div>  
                        <div className="content">
                            <a href="!#"><img src="./img/sub_page/sub_01/XEHvkNIHnhWSJWvAUhvSHJ0V8lFfguaBTCtj88HU.jpg" alt="" /></a> 
                        </div> 
                    </div>
               </div> 
            </section>
            <section id="section2">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>신상품</h2>
                        </div>    
                        <div className="content">
                            <div className="left">
                                <div className="left-head">
                                    <h3>필터</h3>
                                    <span><img src="./img/sub_page/sub_01/icon_refresh.svg" alt="" />초기화</span>
                                </div>
                                <nav id='category'>
                                    <ul>
                                        <li>
                                            <a href="!#" className={`category-btn1${isCategoryBtn1?' on':''}`}>카테고리<i></i></a>
                                            <div className="sub sub1">
                                                <ul>
                                                    <li><label htmlFor="sub1Chk1" ><input type='checkbox' name='sub1_chk' id='sub1Chk1'  value='수산·해산·건어물'/>수산·해산·건어물</label></li>
                                                    <li><label htmlFor="sub1Chk2" ><input type='checkbox' name='sub1_chk' id='sub1Chk2'  value='샐러드·간편식'/>샐러드·간편식</label></li>
                                                    <li><label htmlFor="sub1Chk3" ><input type='checkbox' name='sub1_chk' id='sub1Chk3'  value='국·반찬·메인요리'/>국·반찬·메인요리</label></li>
                                                    <li><label htmlFor="sub1Chk4" ><input type='checkbox' name='sub1_chk' id='sub1Chk4'  value='과일·견과·쌀'/>과일·견과·쌀</label></li>
                                                    <li><label htmlFor="sub1Chk5" ><input type='checkbox' name='sub1_chk' id='sub1Chk5'  value='헤어·바디·구강'/>헤어·바디·구강</label></li>
                                                    <li><label htmlFor="sub1Chk6" ><input type='checkbox' name='sub1_chk' id='sub1Chk6'  value='면·양념·오일'/>면·양념·오일</label></li>
                                                    <li><label htmlFor="sub1Chk7" ><input type='checkbox' name='sub1_chk' id='sub1Chk7'  value='채소'/>채소</label></li>
                                                    <li><label htmlFor="sub1Chk8" ><input type='checkbox' name='sub1_chk' id='sub1Chk8'  value='주방용품'/>주방용품</label></li>
                                                    <li><label htmlFor="sub1Chk9" ><input type='checkbox' name='sub1_chk' id='sub1Chk9'  value='간식·과자·떡'/>간식·과자·떡</label></li>
                                                    <li><label htmlFor="sub1Chk10"><input type='checkbox' name='sub1_chk' id='sub1Chk10' value='건강식품'/>건강식품</label></li>
                                                </ul>
                                                <button>카테고리 더보기 <img src="./img/sub_page/sub_01/icon_arrow_right.svg" alt="" /></button>
                                            </div>
                                        </li>
                                        <li>                                            
                                            <a href="!#" className={`category-btn2${isCategoryBtn2?' on':''}`}>브랜드<i></i></a>
                                            <div className="sub sub2">
                                                <div className="row1">
                                                    <button className={isSub2Order?'on':''}>가나다순</button>
                                                    <i>|</i>
                                                    <button className={isSub2Order?'':'on'}>상품 많은순</button>
                                                </div>
                                                <div className="row2">
                                                    <a href="!#">전체</a>
                                                    <i></i>
                                                    <a href="!#">ㄱ</a>
                                                    <i></i>
                                                    <a href="!#">ㄴ</a>
                                                    <i></i>
                                                    <a href="!#">ㄷ</a>
                                                    <i></i>
                                                    <a href="!#">ㄹ</a>
                                                    <i></i>
                                                    <a href="!#">ㅁ</a>
                                                    <i></i>
                                                    <a href="!#">ㅂ</a>
                                                    <i></i>
                                                    <a href="!#">ㅅ</a>
                                                    <i></i>
                                                    <a href="!#">ㅇ</a>
                                                    <i></i>
                                                    <a href="!#">ㅈ</a>
                                                    <i></i>
                                                    <a href="!#">ㅊ</a>
                                                    <i></i>
                                                    <a href="!#">ㅌ</a>
                                                    <i></i>
                                                    <a href="!#">ㅋ</a>
                                                    <i></i>
                                                    <a href="!#">ㅎ</a>
                                                    <a href="!#">A-Z</a>
                                                </div>

                                                <ul>
                                                    <li><label htmlFor="sub2Chk1" ><input type='checkbox' name='sub2_chk' id='sub2Chk1'  value='수산·해산·건어물'/>수산·해산·건어물</label></li>
                                                    <li><label htmlFor="sub2Chk2" ><input type='checkbox' name='sub2_chk' id='sub2Chk2'  value='샐러드·간편식'/>샐러드·간편식</label></li>
                                                    <li><label htmlFor="sub2Chk3" ><input type='checkbox' name='sub2_chk' id='sub2Chk3'  value='국·반찬·메인요리'/>국·반찬·메인요리</label></li>
                                                    <li><label htmlFor="sub2Chk4" ><input type='checkbox' name='sub2_chk' id='sub2Chk4'  value='과일·견과·쌀'/>과일·견과·쌀</label></li>
                                                    <li><label htmlFor="sub2Chk5" ><input type='checkbox' name='sub2_chk' id='sub2Chk5'  value='헤어·바디·구강'/>헤어·바디·구강</label></li>
                                                    <li><label htmlFor="sub2Chk6" ><input type='checkbox' name='sub2_chk' id='sub2Chk6'  value='면·양념·오일'/>면·양념·오일</label></li>
                                                    <li><label htmlFor="sub2Chk7" ><input type='checkbox' name='sub2_chk' id='sub2Chk7'  value='채소'/>채소</label></li>
                                                    <li><label htmlFor="sub2Chk8" ><input type='checkbox' name='sub2_chk' id='sub2Chk8'  value='주방용품'/>주방용품</label></li>
                                                    <li><label htmlFor="sub2Chk9" ><input type='checkbox' name='sub2_chk' id='sub2Chk9'  value='간식·과자·떡'/>간식·과자·떡</label></li>
                                                    <li><label htmlFor="sub2Chk10"><input type='checkbox' name='sub2_chk' id='sub2Chk10' value='건강식품'/>건강식품</label></li>
                                                </ul>
                                                <button>카테고리 더보기 <img src="./img/sub_page/sub_01/icon_arrow_right.svg" alt="" /></button>
                                            </div>                                            
                                        </li>
                                        <li>
                                            <a href="!#" className={`category-btn3${isCategoryBtn3?' on':''}`}>가격<i></i></a>                                         
                                            <div className="sub sub1">
                                                <ul>
                                                    <li><label htmlFor="sub1Chk1" ><input type='checkbox' name='sub1_chk' id='sub1Chk1'  value='5,980원 미만'/>5,980원 미만</label></li>
                                                    <li><label htmlFor="sub1Chk2" ><input type='checkbox' name='sub1_chk' id='sub1Chk2'  value='5,980원 ~ 9,800원'/>5,980원 ~ 9,800원</label></li>
                                                    <li><label htmlFor="sub1Chk3" ><input type='checkbox' name='sub1_chk' id='sub1Chk3'  value='9,800원 ~ 18,900원'/>9,800원 ~ 18,900원</label></li>
                                                    <li><label htmlFor="sub1Chk4" ><input type='checkbox' name='sub1_chk' id='sub1Chk4'  value='18,900원 이상'/>18,900원 이상</label></li>                                                    
                                                </ul>                                                
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" className={`category-btn4${isCategoryBtn4?' on':''}`}>혜택<i></i></a>
                                            <div className="sub sub1">
                                                <ul>
                                                    <li><label htmlFor="sub1Chk1" ><input type='checkbox' name='sub1_chk' id='sub1Chk1'  value='할인상품'/>할인상품</label></li>
                                                </ul>                                                
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" className={`category-btn5${isCategoryBtn5?' on':''}`}>유형<i></i></a>
                                            <div className="sub sub1">
                                                <ul>
                                                    <li><label htmlFor="sub1Chk4" ><input type='checkbox' name='sub1_chk' id='sub1Chk4'  value='Kurly Only'/>Kurly Only</label></li>                                                    
                                                    <li><label htmlFor="sub1Chk4" ><input type='checkbox' name='sub1_chk' id='sub1Chk4'  value='희소가치 프로젝트'/>희소가치 프로젝트</label></li>                                                    
                                                </ul>                                                
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="right">
                                <div className="right-head">
                                    <span>총 205건</span>
                                    <span>
                                        
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '추천순')}>추천순 </a><img src="./img/sub_page/sub_01/quesion.svg" alt="" />
                                        <i>|</i>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '신상품순')} className='on'>신상품순</a>
                                        <i>|</i>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '오래된순')}>오래된순</a>
                                        <i>|</i>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '혜택순')} >혜택순</a>
                                        <i>|</i>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '낮은가격순')}>낮은 가격순</a>
                                        <i>|</i>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '높은가격순')}>높은 가격순</a>
                                    </span>
                                </div>

                                <ul className='product'>
                                    {
                                      state.상품.map((item, idx)=>{

                                        if( Math.ceil((idx+1)/state.list) === state.clickNum  ){
                                            // console.log( Math.ceil((idx+1)/state.list) + '  ' +  state.clickNum )
                                            return(
                                                <li className="list"  key={item.번호}  data-produckt-key={item.번호} >
                                                    <div className="list-gap"   onClick={(e)=>onClickViewProduct(e, item,`./img/sub_page/sub_01/${item.이미지}`)}>
                                                        <div className="img-box">
                                                            <img src={`./img/sub_page/sub_01/${item.이미지}`} alt="" />
                                                            <span><img src="./img/intro/icon_cart_purple.svg" alt="" /></span>
                                                        </div>
                                                        <div className="txt-box">
                                                            <ul>
                                                                <li>{item.상품이름}</li>
                                                                <li>
                                                                    {
                                                                        item.할인율 > 0 ? (  
                                                                            <>
                                                                                <strong>{Math.round(item.할인율*100)}%</strong>
                                                                                <span>{Math.round(Number((item.정가*(1-item.할인율)))).toLocaleString('ko-KR')}원</span>
                                                                                <em>{Number(item.정가).toLocaleString('ko-KR')}원</em>
                                                                            </>
                                                                        )
                                                                        :
                                                                        (
                                                                            Number(item.정가).toLocaleString('ko-KR')+'원'                                                
                                                                        )
                                                                    }
                                                                </li>
                                                                <li>
                                                                    <img src={`./img/intro/icon_review.svg`} alt="" />
                                                                    <span>{`후기`}</span>
                                                                    <span>{item.후기카운트}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            )

                                        }
                                      })
                                    }
                                </ul>

                                <div className="page-btn-box">
                                     
                                     { state.cnt > 1 && <a  onClick={onClickPrev} href="!#" className='prev-btn'><img src="./img/sub_page/icon_arrow_right.svg" alt="" /></a>}

                                     {
                                        // 페이지네이션 : 페이지번호 바인딩 클릭 이벤트
                                        //                그룹페이지1    그룹페이지2     그룹페이지3       그룹페이지4      그룹페이지5
                                        // 그룹 5개 묶음 : 1 2 3 4 5  => 6 7 8 9 10 => 11 12 13 14 15 => 16 17 18 19 20 =>  21 22
                                        // 시작&끝페이지 : 1(0)  ~  5(4)  => 6(5)   ~   10 => 11(10)     ~    15(14) => 16    ~      20 => 21 ~ 22

                                        // 이전페이지 --
                                        // 다음페이지 ++
                                        (()=>{

                                            let group = 5;
                                            let from  = (state.cnt-1) * group;
                                            let to    = from + group;
                                            let groupPageTotal = Math.ceil(state.total/state.list); // 그룹페이지 총 개수


                                            let pageEl = [];                                            
                                            for(let i=from; i<to; i++){
                                                if(i<groupPageTotal){
                                                    pageEl = [...pageEl,  <a key={i+1}  onClick={(e)=>onClickPageBtn(e, i+1)}   href='!#' className={state.clickNum===(i+1) ? 'on':''}>{i+1}</a>]
                                                }
                                            }

                                            return  pageEl

                                        })()
                                    }

                                    { state.cnt < Math.ceil(state.total/state.list/5) && <a  onClick={onClickNext}  href="!#" className='next-btn'><img src="./img/sub_page/icon_arrow_right.svg" alt="" /></a>}

                                </div>

                            </div>
                        </div>    
                    </div>    
                </div>
            </section>
        </main>
    );
};
