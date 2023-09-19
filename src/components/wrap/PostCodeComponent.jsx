import React from 'react';
import PostCodeChild from './PostCodeChild';
import './scss/post_code.scss';

export default function PostCodeComponent () {

    const [state, setState] = React.useState({
        isShow: true
    });

    return (
        <div id='postCode'>
            <h2>주소검색 API</h2>
            {
                state.isShow && <PostCodeChild />           
            }
        </div>
    );
};