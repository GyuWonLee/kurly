import React,{useEffect, useState} from 'react';
import Section6SlideWrapSlide from './Section6SlideWrapSlide';
import axios from 'axios';
import $ from 'jquery';

export default function Section6Component() {
    
    const [state, setState] = useState({
        상품: [],
        n: 0
    });

   useEffect(()=>{

        axios({
            url:'./data/sec6_slide.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    상품: res.data.상품,
                    n: res.data.상품.length
                })                
            }
        })
        .catch((err)=>{
            console.log('AXIOS 실패!' + err );
        });

    },[]);





    return (
        <section id='section6'>
            <div className="container">
                <div className="title  hide">
                    <h2>기저귀 최저가 도전</h2>
                </div>    
                <div className="content">
                    <div className="slide-container">
                        <div className="slide-view">                            
                            <Section6SlideWrapSlide  상품={state.상품} />
                        </div>
                       
                    </div>  
                </div>    
            </div>    
        </section>
    );
};
