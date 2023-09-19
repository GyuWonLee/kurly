import React from 'react';



export default function HeaderModalComponent({setHeaderModalClose}) {

   

    const onClickHeaderModalClose=(e)=>{
        e.preventDefault();
        setHeaderModalClose();        
    }

    return (
        <div id='headerModal'>
           <div className="container">
            <div className="content">
                <a href="!#">지금 가입하고, <strong>1만원 할인 쿠폰</strong> 받아가세요! <span onClick={onClickHeaderModalClose}><img src="./img/header_modal/close.svg" alt="" /></span></a>                
            </div>
           </div>
        </div>
    );
};
