import React from 'react';
// 컨텍스트 가져오기
import {ViewProductContext} from '../../context/ViewProductContext';

export default function Section5SlideWrapSlide({상품}) {
    
    // 컨텍스트 사용 등록
    const {setViewProductFn} = React.useContext(ViewProductContext);

    const [time, setTime] = React.useState({
        H:0,
        M:0,
        S:0
    });


    React.useEffect(()=>{

         let setId = setInterval(function(){
                // 타이머카운트 : 타임세일 24시간
                // 시작시간 = 현재시간(타임세일시작시간)
                // 종료시간 = 현재시간(타임세일시작시간)+24시간
                // 현재시간
                // 남은시간 = 종료시간 - 현재시간
                let timeSale = '2023-07-01 21:00:00';
                let start = new Date(timeSale);             // 타임세일시작시간
                    start.setHours(start.getHours()+24);    // 24시간 타임세일(종료시간)
                let now = new Date();                       // 현재시간
                let countTime = start - now;                // 남은시간(카운트타임) = 타임세일종료시간-현재시간
                let h = 0;
                let m = 0;
                let s = 0;


                // 종료
                if( now >= start ){
                    clearInterval(setId);
                    h=0;
                    m=0;
                    s=0;
                }
                else{
                    h = Math.floor(countTime/(60*60*1000)) % 24 ;
                    m = Math.floor(countTime/(60*1000)) % 60 ;
                    s = Math.floor(countTime/(1000)) % 60 ;
                }

                setTime({
                    ...time,
                    H: h<10 ? `0${h}`: h,
                    M: m<10 ? `0${m}`: m,
                    S: s<10 ? `0${s}`: s
                })
              

         }, 1000);   

    },[]);

    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();
        setViewProductFn(item, imgPath); // 현재 클릭한 상품정보가 최상위 컴포넌트에게 전달된다.
    }

    return (
        <ul className="slide-wrap">
            <li className="slide slide1">
                <div className="slide-gap">
                    <ul>
                        <li><h2>럭셔리 위크 일일특가</h2></li>
                        <li><h3>고품격 뷰티 쇼핑 찬스!</h3></li>
                        <li>
                            <div className="timer">
                                <img src="./img/intro/timer.svg" alt="" />
                            </div>
                            <div className="timer-counter">
                                <span className='hours'  >{time.H}</span>
                                <i>:</i>
                                <span className='minutes'>{time.M}</span>
                                <i>:</i>
                                <span className='seconds'>{time.S}</span>
                            </div>

                        </li>
                        <li>
                            <p>망설이면 늦어요!</p>
                        </li>
                    </ul>
                </div>
            </li>  
        {    
            상품.map((item, idx)=>{
                return(
                    <li className="slide slide2" key={item.번호}>
                        <div className="slide-gap"  onClick={(e)=>onClickViewProduct(e, item, `./img/intro/7056cd91-57f2-43f2-bf0d-0dc94350831a.jpg`)}>
                            <div className="img-box">
                                <img src={`./img/intro/${item.이미지}`} alt="" />
                                <span><img src="./img/intro/icon_cart_purple.svg" alt="" /></span>
                            </div>
                            <div className="txt-box">
                                <ul>
                                    <li>{item.상품소개}</li>
                                    <li>{item.상품이름}</li>
                                    <li>
                                        {
                                            item.할인율 > 0 ? (  
                                                <>
                                                    <strong>{Math.round(item.할인율*100)}%</strong>
                                                    <span>{(Math.round(item.정가*(1-item.할인율))).toLocaleString('ko-KR')}원</span>
                                                    <em>{item.정가.toLocaleString('ko-KR')}원</em>
                                                </>
                                            )
                                            :
                                            (
                                                item.정가.toLocaleString('ko-KR')                                                
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
            })            
        }
        </ul>
    );
};
