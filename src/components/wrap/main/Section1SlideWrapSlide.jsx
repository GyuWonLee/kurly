import React from 'react';

export default function Section1SlideWrapSlide({이미지, n}) {

    const [cnt, setCnt] =  React.useState(0);
    const [isArrow, setIsArrow] =  React.useState(false);
    const refSlideWrap = React.useRef();

    // 슬라이드 전체너비(2200%)
    React.useEffect(()=>{        
        refSlideWrap.current.style.width = `${100*(n+2)}%`;
    },[n])


    const onClickNextArrowBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
    }

    const onClickPrevArrowBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt-1);
    }

    // 메인슬라이드함수
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const mainSlide=()=>{
        refSlideWrap.current.style.transition = `all 0.6s ease-in-out`;
        refSlideWrap.current.style.left = `${-(100*cnt)}%`;
        returnNextFirst(); // 처음으로 리턴
        returnPrevFirst(); // 마지막으로 리턴
    }

    // next 마지막슬라이드 처음으로 리턴하는 함수
    const returnNextFirst=()=>{
        if(cnt>n){ // 처음으로
            setCnt(1);
            refSlideWrap.current.style.transition = `none`;
            refSlideWrap.current.style.left = `0%`;
        }
    }
    // prev 처음 슬라이드 마지막으로 리턴하는 함수
    const returnPrevFirst=()=>{
        if(cnt<0){ // 마지막으로
            setCnt(n-1);
            refSlideWrap.current.style.transition = `none`;
            refSlideWrap.current.style.left = `${-(100*n)}%`;
        }
    }

    React.useEffect(()=>{        
        mainSlide();
    },[cnt, mainSlide])
    
    const onMouseEnterContainer=(e)=>{
        e.preventDefault();
        setIsArrow(true);
    }

    const onMouseLeaveContainer=(e)=>{
        e.preventDefault();
        setIsArrow(false);
    }

    return (
        <div className="slide-container" onMouseEnter={onMouseEnterContainer} onMouseLeave={onMouseLeaveContainer} >
            <div className="slide-view">
                
                <ul ref={refSlideWrap} className='slide-wrap'>

                    {
                        이미지.map((item, idx)=>{
                            return(
                                <li className="slide" key={idx}><a href="!#"><img src={item.src} alt="" /></a></li>
                            )
                        })
                    }

                </ul>

            </div>

            <a onClick={onClickNextArrowBtn} href="!#" className={`next-arrow-btn${isArrow?' on':''}`}><img src="./img/intro/icon_arrow_gray.svg" alt="" /></a>
            <a onClick={onClickPrevArrowBtn} href="!#" className={`prev-arrow-btn${isArrow?' on':''}`}><img src="./img/intro/icon_arrow_gray.svg" alt="" /></a>
            
            <span className='page-number-box'><em className='current-number'>{cnt+1>n?1:cnt+1}</em><i>/</i><em className='total-number'>{n}</em></span>

        </div>

    );
};
