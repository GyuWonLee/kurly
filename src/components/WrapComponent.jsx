import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HeaderModalComponent from './wrap/HeaderModalComponent';
import HeaderComponent from './wrap/HeaderComponent';
import MainComponent from './wrap/MainComponent';
import Sub01Component from './wrap/main_sub/Sub01Component';
import Sub02Component from './wrap/main_sub/Sub02Component';
import Sub03Component from './wrap/main_sub/Sub03Component';
import Sub04Component from './wrap/main_sub/Sub04Component';
import Sub05SignUpComponent from './wrap/main_sub/Sub05SignUpComponent';
import Sub06SignInComponent from './wrap/main_sub/Sub06SignInComponent';
import Sub07NoticeComponent from './wrap/main_sub/Sub07NoticeComponent';
import FooterComponent from './wrap/FooterComponent';
import IntroModalComponent from './wrap/IntroModalComponent';
import GoTopComponent from './wrap/GoTopComponent';
import QuikMenuComponent from './wrap/QuikMenuComponent';
// 컨펌모달당(타입1,2)
// type=1 확인버튼
// type=2 취소,확인버튼
import ConfirmComponent  from './wrap/ConfirmComponent';

// 주소검색 API
import PostCodeComponent from './wrap/PostCodeComponent';


// 컨텍스트 가져오기
import { ViewProductContext } from './context/ViewProductContext';


export default function WrapComponent() {


    // 주소검색 상태변수
    const [post, setPost] = React.useState({
        addressKey: 'KURLYADDRESSKEY',
        isPostCode: false,
        주소1:'',
        주소2:''
    });

    // 로딩시 또는 새로고침시 
    // sessionStorage() 에서 등록된 주소가 있다면 
    // 가져와서 상태변수에 저장한다.
    React.useEffect(()=>{
        let result = '';
        if(sessionStorage.getItem(post.addressKey)!==null){
            result = JSON.parse(sessionStorage.getItem(post.addressKey));
            setPost({
                ...post,
                주소1: result.주소1,
                주소2: result.주소2
            })
        }
    },[]);




    // 최근 본 상품 상태관리 변수
    // 최근 본 상품 키 : GW_KURLY_VIEW_PRODUCT
    // 장바구니 상품 키 : GW_KURLY_CART_PRODUCT
    const [viewProduct, setViewProduct] = React.useState({        
        viewProductKEY: 'GW_KURLY_VIEW_PRODUCT',
        최근본상품: {},
        isClick: false,
        isTime: false,
        isQuickMenu: false,
        최근본상품리스트: [],
        imgPath: ''
    });

    // 비구조화(구조분할할당)
    const {viewProductKEY,최근본상품,isClick,isTime,최근본상품리스트} = viewProduct;

    // 로딩시 저장소에서 가져오기
    // 퀵메뉴 리스트 내려 보낼 최근본상품리스트 
    React.useEffect(()=>{
        if( localStorage.getItem(viewProductKEY)!==null ){
            setViewProduct({
                ...viewProduct,
                최근본상품리스트: JSON.parse(localStorage.getItem(viewProductKEY))
            })
        }
    },[]);


    // 2. 상태변숙가 변경되면 즉시 동작하는 훅을 사용
    React.useEffect(()=>{  // 2. time: 1/1000초 날짜시간 추가
        
        if(isClick===true){
            setViewProduct({
                ...viewProduct,
                최근본상품: {
                    ...최근본상품,
                    이미지: viewProduct.imgPath,
                    time: new Date().getTime()   // Client(고객)이 클릭한 싯점 날짜시간을저장                 
                },
                isClick: false, // 초기화
                isTime: true
            })
        }

    },[최근본상품]); //로딩시 1회 실행 그리고 다시 최근본상품이 변경되면 실행

    // 3. 로컬스토레이지 저장소에 최근 본 상품 time 추가 항목까지 배열로 저장
    //    (*저장소는 반드시 객체(Object)를 문자열로 변환 저장한다.)

    React.useEffect(()=>{
        //1. 로컬스토레이지에 저장된 데이터 가져오기
        //2. 가져온데이터와 현재 데이터를 병합하여 배열로 저장
        let arr = [];  // 임시배열       
        //3-1. 저장소에 저장된 데이터가 있을때  !==null
        //3-2. 저장소에 저장된 데이터가 없을때
        if(isTime===true){

            if(localStorage.getItem(viewProductKEY)!==null){ //...있을때 
                arr = JSON.parse(localStorage.getItem(viewProductKEY)); // [{...},{...}]
                arr = [최근본상품, ...arr];   // 스택(맨처음에 삽입)( 언쉬프트 arr.unshift(viewProduct.최근본상품))                                                  // arr = [...arr, 최근본상품];   // 큐(맨끝에 추가) (푸쉬 arr.push(viewProduct.최근본상품))
            }
            else{
                arr = [최근본상품];  // [{...}]
            }
            // 최근 본 상품의 데이터 최종 저장소 저장
            localStorage.setItem(viewProductKEY,  JSON.stringify(arr) );
            
            setViewProduct({
                ...viewProduct,
                isTime: false,
                isQuickMenu: true,  // 퀵메뉴에게 전송할 신호                
                최근본상품리스트: arr
            });
        }

    },[최근본상품.time]);


    // 1. 최근 본 상품 세터함수()
    // - 클릭하면 로컬스토레이지 상품정보 모두 가져온다.    
    // - 저장소에 제코품코드와 방금 클릭한 제품코드를 비교하고
    // - 클릭한 상품정보 데이터 중 제품코드가 이미 등록된 상품(로컬스토레이지 저장소)이면
    //   저장하지 않는다.    
    // - 단 저장소에 데이터가 없다면 비교 안하고 바로 저장하고
    //   그렇지 않고 있다면 비교
    const setViewProductFn=(value, imgPath)=>{        
        if(localStorage.getItem(viewProductKEY)!==null){
            let result = JSON.parse(localStorage.getItem(viewProductKEY));
           
            // 전체를 비교하고 많은 데이터 중에 1개라도 있다면 저장안함
            // let found=false;
            // result.map((item)=>{ 
            //    if(item.번호===value.번호){                    
            //         found=true; // 중복
            //    }               
            // });

            // if( found===false ){
            //     setViewProduct({
            //         ...viewProduct,
            //         최근본상품: value, //1. 저장
            //         isClick: true,
            //         imgPath: imgPath
            //     })  
            // }

            // 다른방법 1
            // 배열처리 비교 한줄코딩 
            //  found에는 결과값이 배열로 저장된다. 예시] found[false,false,false,true,false,false]
            const found =  result.map((item)=> item.번호===value.번호 );            
            // console.log( found );
            // console.log( found.includes(true) ); // 배열안에 true  가 포함되어 있냐 true, false
            if(found.includes(true)===false){ // 중복된 데이터가 아니면(true 가 포함되어 있지 않으면)
                setViewProduct({
                    ...viewProduct,
                    최근본상품: value, //1. 저장
                    isClick: true,
                    imgPath: imgPath
                })      
            }


        }
        else{
            // 이부분을 중복된 데이터가 있다면 저장안함
            setViewProduct({
                ...viewProduct,
                최근본상품: value, //1. 저장
                isClick: true,
                imgPath: imgPath
            })      
        }

    }

///////////////////////////////////////////////////////////////////////////////////////////

    // 탑모달 => 로컬스토레이지
    const [storageCookie] = useState({
        key: 'GWKURLY_HEADERMODAL',
        value: 'SIGNUP_SALE_EVENT',
        expires: 1  // 1년
    });
    const {key, value, expires} = storageCookie;

    // 탑모달 => 로컬스토레이지
    const [headerModal, setHeaderModal] = useState(true);
        
    // 탑모달 닫기함수
    const setHeaderModalClose=()=>{
        setHeaderModal(false);
        
        let toDay = new Date();
        // toDay.setDate(toDay.getDate()+expires);
        toDay.setFullYear(toDay.getFullYear()+expires);

        const val = {
            value: value,
            expires: toDay.getTime()
        }

        localStorage.setItem(key,  JSON.stringify(val));  // 객체는 문자열로 변환 저장
    }

    // 로컬스토레이지에 저장된 탑모달의 키와 키값
    useEffect(()=>{
        if(localStorage.getItem(key)===null) return; // 키가 없다면 리턴 강제종료

        const topModal = JSON.parse(localStorage.getItem(key));
        
        if(new Date() > new Date(topModal.expires)){  // 만료일 지남 모달 열기
            setHeaderModal(true);
        }
        else{ // 만료일 남았음 모달 닫기
            setHeaderModal(false);
        }

    },[]);










    // 인트로 모달
    const [cookie] = useState({
        cookieName: 'GWKURLY_INTROMODAL_01',
        cookieValue: 'YEAR8_SALE_EVENT_MODALWINDOW',
        cookieExpires: 3  // 3일
    });
    const {cookieName, cookieValue} = cookie;  // 비고조화 (구조 분할 할당) 


    const [introModal, setIntroModal] = useState(true);


    // 모달창 닫기 함수
    const introModalClocse=()=>{
        setIntroModal(false);
    }

    // 겟쿠키 : 쿠키 가져오기
    const getCookie=()=>{
        if(document.cookie==='') return;  // 가져올 모든 쿠키가 없다면  리턴 예외처리

        let cookie = document.cookie.split(';'); // 1차원 배열
        let arr = [];
        cookie.map((item, idx)=>{ // 2차원 배월
            arr[idx] = {
                쿠키이름: item.split('=')[0].trim(),
                쿠키값:   item.split('=')[1].trim(),
            }
        });

        // 이제 쿠키이름, 쿠키값을  기준 쿠키이름과 쿠키값과 비교 
        // 만약 같다면(찾았다 found) 모달창 닫기
        // 만약 없다면(못찾았다 not found) 모달창 열기        
        arr.map((item)=>{
            if(item.쿠키이름 === cookieName  &&  item.쿠키값 === cookieValue){
                setIntroModal(false);
            }
        });
    }
    useEffect(()=>{
        
        getCookie();

    },[introModal]);


    ///////////////////////////////////////////////////////////////////////////////
    // 컨펌모달 상태변수
    const [confirm, setConfirm] =  React.useState({
        isConfirm: false,
        msg: '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합',
        type: 1,
        timerStart: false
    });
    const {msg,type,isConfirm,timerStart} = confirm;

    // 컨펌모달 닫기함수    
    const confrimModalClose=()=>{
        if(msg.includes('인증번호')===true){
            setConfirm({ 
                isConfirm: false,
                timerStart: true
            });
        }
        else{
            setConfirm({ 
                isConfirm: false
            });
        }
       
        document.querySelector('html').style.overflowY = 'auto';
    }

    // 컨펌모달 열기함수
    const confrimModalOpen=(msg, type)=>{
        setConfirm({ 
            isConfirm: true,
            msg: msg,
            type: type 
        });
        document.querySelector('html').style.overflow = 'hidden';
    }


    return (
        <div id='wrap'>

          <ViewProductContext.Provider value={{setViewProductFn, confrimModalOpen, confrimModalClose, msg, type, timerStart, post, setPost }}>
                { headerModal && <HeaderModalComponent setHeaderModalClose={setHeaderModalClose} /> }

                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <Routes>
                            <Route path='/' element={<HeaderComponent />}>
                                <Route index         element={<MainComponent />} />
                                <Route path='/main'  element={<MainComponent />} />
                                <Route path='/sub01' element={<Sub01Component />} />
                                <Route path='/sub02' element={<Sub02Component />} />
                                <Route path='/sub03' element={<Sub03Component />} />
                                <Route path='/sub04' element={<Sub04Component/>} />
                                <Route path='/signUp' element={<Sub05SignUpComponent/>} />
                                <Route path='/signIn' element={<Sub06SignInComponent/>} />
                                <Route path='/notice' element={<Sub07NoticeComponent/>} />
                            </Route>
                        </Routes>
                    </BrowserRouter>    

                <FooterComponent />
                { introModal && <IntroModalComponent introModalClocse={introModalClocse} cookie={cookie}  /> }
                <GoTopComponent />
                <QuikMenuComponent 최근본상품리스트={최근본상품리스트} />
                {isConfirm && <ConfirmComponent />}
                
                { post.isPostCode && <PostCodeComponent />}

          </ViewProductContext.Provider>  
        </div>

    );
};