import { useState } from 'react';
import '../style/PostCard.css';

export default function PostCard(props) {
    const post = props.data;

    /* 수정 관련 함수 */
    const [isClicked, setIsClicked] = useState(false);

    const [posts, setPost] = useState({
        title: post.title,
        content: post.content,
        date: post.date,
    })

    const onTitleChange = (event) => {
        setPost({
            ...posts,
            title: event.currentTarget.value
        });
    };

    const onContentChange = (event) => {
        setPost({
            ...posts,
            content: event.currentTarget.value
        });
    };

    const updatePost = (post) => {
        setIsClicked(!isClicked);
        const saved_array = JSON.parse(localStorage.getItem('posts'));
        saved_array[post.id].title = posts.title;
        saved_array[post.id].content = posts.content;
        localStorage.setItem('posts', JSON.stringify(saved_array));  // 로컬에 저장
        alert("수정되었습니다!")

        Refresh()
    }

    const Switch = () => {
        setIsClicked(!isClicked);
    }

    /* 삭제 관련 함수 */
    function updateList(list, idx) {
        const updated = [];

        for (let i = 0; i < idx; i++) {
            updated.push(list[i]);
        }
        for (let i = idx + 1; i < list.length; i++) {
            list[i].id -= 1;
            updated.push(list[i]);
        }

        return updated;
    }

    const delPost = (id) => {
        const saved_array = JSON.parse(localStorage.getItem('posts'));
        delete saved_array[id];
        const updated = updateList(saved_array, id)
        localStorage.setItem('posts', JSON.stringify(updated));  // 로컬에 저장
        alert("삭제되었습니다.")

        Refresh()
    }

    /* 새로고침 */
    const Refresh = () => {
        window.location.href = "/"
    }

    return (
        <>
            <div className="card-top">
                <div className='card-title'>
                    {isClicked === false ?
                        <>
                            <a>{post.title}</a>
                        </> :
                        <>
                            <input
                                className="title"
                                onChange={onTitleChange}
                                value={posts.title}
                                type="text" />
                        </>
                    }
                </div>

                <div className='button'>
                    {isClicked === false ?
                        <>
                            <button
                                className="update-button"
                                onClick={() => Switch()}
                                type="button"
                            >
                                수정
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => delPost(post.id)}
                                type="button"
                            >
                                삭제
                            </button>
                        </> :
                        <>
                            <button
                                className="cancel-button"
                                onClick={() => Switch()}
                                type="button"
                            >
                                취소
                            </button>
                            <button
                                className="update-button"
                                onClick={() => updatePost(post)}
                                type="button"
                            >
                                변경
                            </button>
                        </>}
                </div>
            </div>

            <div className="card-content">
                {isClicked === false ?
                    <>
                        <a>{post.content}</a>
                    </> :
                    <>
                        <textarea
                            className="content-update"
                            onChange={onContentChange}
                            value={posts.content}
                            type="text" />
                    </>
                }
            </div>
            <div className="card-info">
                <a className='info-re'>
                    {post.reply}
                </a>

                <a className='info-date'>
                    {post.date}
                </a>
            </div>
        </>
    )
}