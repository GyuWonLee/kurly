import React from 'react';
import {ViewProductContext} from '../context/ViewProductContext';
import './scss/confirm.scss';

export default function ConfirmComponent() {

    const {confrimModalClose, msg, type} = React.useContext(ViewProductContext);

    // 컨펌모달 닫기
    // 삭제하시겠습니까? 확인 삭제함.
    const onClickOkEvent=()=>{
        confrimModalClose();
    }

    // 컨펌모달 닫기
    // 삭제하시겠습니까? 취소 삭제안함.
    const onClickCancleEvent=()=>{

    }

    return (
        <div id='confirmModal'>
            <div className="wrap">
                <div className="container">
                    <div className="content">
                        <div className='message-bocx'>
                            <div className='msg'>{msg}</div>
                        </div>
                        <div className="button-box">
                            {type===2?<button  onClick={onClickCancleEvent}>취소</button>:null}
                            <button onClick={onClickOkEvent}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
