import { useState } from 'react';
import '../style/List.css';
import PostCard from './PostCard';

export default function List(props) {
    let data = 0;
    const list = props.data;

    let listDesc = [];
    if (list) {
        data = 1;

        // 배열 역순 정렬
        listDesc = list.slice(0).reverse().map(data => data);
    }

    return (
        <>
            <div>
                {data === 0 ?
                    <a>게시글이 없습니다!</a> :
                    <div className='board-list'>
                        {listDesc.map((post) => (
                            <li className="post-card">
                                <PostCard
                                    data={post}
                                />
                            </li>
                        ))}
                    </div>}
            </div>
        </>
    )
}