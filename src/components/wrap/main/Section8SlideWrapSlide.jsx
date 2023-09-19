import React from 'react';

// 컨텍스트 가져오기
import {ViewProductContext} from '../../context/ViewProductContext';

export default function Section8SlideWrapSlide({상품}) {

    // 컨텍스트 사용 등록
    const {setViewProductFn} = React.useContext(ViewProductContext);

    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();
        setViewProductFn(item, imgPath); // 현재 클릭한 상품정보가 최상위 컴포넌트에게 전달된다.
    }
    return (  
        <ul className="slide-wrap">
        {    
            상품.map((item, idx)=>{
                return(
                    <li className="slide" key={item.번호}>
                        <div className="slide-gap"  onClick={(e)=>onClickViewProduct(e, item,`./img/intro/${item.이미지}`)}>
                            <div className="img-box">
                                <img src={`./img/intro/${item.이미지}`} alt="" />
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
                                                    <span>{(item.정가*(1-item.할인율)).toLocaleString('ko-KR')}원</span>
                                                    <em>{item.정가.toLocaleString('ko-KR')}원</em>
                                                </>
                                            )
                                            :
                                            (
                                                item.정가.toLocaleString('ko-KR')+'원'                                                
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
