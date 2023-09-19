import React,{useEffect, useState} from 'react';
import Section5SlideWrapSlide from './Section5SlideWrapSlide';
import axios from 'axios';
import $ from 'jquery';

export default function Section5Component({setViewProductFn}) {
    
    const [state, setState] = useState({
        상품: [],
        n: 0
    });

   useEffect(()=>{

        axios({
            url:'./data/sec5_slide.json',
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
        <section id='section5'>
            <div className="container">
                <div className="title hide">
                    <h2>럭셔리 위크 일일특가</h2>
                </div>    
                <div className="content">
                    <div className="slide-container">
                        <div className="slide-view">                            
                            <Section5SlideWrapSlide  상품={state.상품} />
                        </div>
                       
                    </div>  
                </div>    
            </div>    
        </section>
    );
};
