import { useState } from 'react';
import '../css/CommentCard.css';

export default function ReCommentCard(props) {
    const re_reple = props.data;
    const list = JSON.parse(localStorage.getItem('posts'));
    const reply = JSON.parse(localStorage.getItem('reples'));

    const Switch = () => {
        setIsClicked(!isClicked);
    }

    /* 댓글 개수 갱신 */
    function updateCount(re_reples) {
        for (let i = 0; i < list.length; i++) {
            list[i].reply = (reply.length) + (re_reples.length - 1);
        }
        localStorage.setItem('posts', JSON.stringify(list))
    }

    /* 해당 게시물의 댓글 Index 반환 */
    function findElement(list, pid, rid, id) {
        let idx = -1;

        // 게시물 ID와 댓글 ID가 일치하는 댓글의 인덱스 반환
        for (let i = 0; i < list.length; i++) {
            if ((list[i].pid === pid) && (list[i].rid === rid) && (list[i].id === id)) {
                idx = i;
            }
        }
        return idx;
    }

    /* 수정 관련 함수 */
    const [isClicked, setIsClicked] = useState(false);

    const [re_reples, setPost] = useState({
        content: re_reple.content,
        date: re_reple.date,
    })

    const onContentChange = (event) => {
        setPost({
            ...re_reples,
            content: event.currentTarget.value
        });
    };

    const updatePost = (pid, rid, id) => {
        const saved_array = JSON.parse(localStorage.getItem('re_reples'));
        let idx = findElement(saved_array, pid, rid, id);
        saved_array[idx].content = re_reples.content;
        localStorage.setItem('re_reples', JSON.stringify(saved_array));  // 로컬에 저장

        setIsClicked(!isClicked);
        Refresh()
    }

    /* 삭제 관련 함수 */
    function updateList(list, idx) {
        const updated = [];

        for (let i = 0; i < idx; i++) {
            updated.push(list[i]);
        }
        for (let i = idx + 1; i < list.length; i++) {
            updated.push(list[i]);
        }

        return updated;
    }

    const delPost = (pid, rid, id) => {
        const saved_array = JSON.parse(localStorage.getItem('re_reples'));
        let idx = findElement(saved_array, pid, rid, id);
        delete saved_array[idx];
        const updated = updateList(saved_array, idx)
        localStorage.setItem('re_reples', JSON.stringify(updated));  // 로컬에 저장
        alert("대댓글 삭제")

        updateCount(saved_array)
        Refresh()
    }

    /* 새로고침 */
    const Refresh = () => {
        window.location.reload()
    }

    return (
        <>
            <div className="card-top">
                <div className='card-content'>
                    {isClicked === false ?
                        <>
                            <a className='card-user'>
                                대댓글{re_reple.id + 1}
                            </a>
                            <a>{re_reple.content}</a>
                        </> :
                        <>
                            <textarea
                                className="content-update"
                                onChange={onContentChange}
                                value={re_reples.content}
                                type="text" />
                        </>
                    }
                </div>

                <div className='card-button'>
                    {isClicked === false ?
                        <>
                            <button
                                className="delete-button"
                                onClick={() => delPost(re_reple.pid, re_reple.rid, re_reple.id)}
                                type="button"
                            >
                                삭제
                            </button>
                            <button
                                className="update-button"
                                onClick={() => Switch()}
                                type="button"
                            >
                                수정
                            </button>
                        </> :
                        <>
                            <button
                                className="update-button"
                                onClick={() => updatePost(re_reple.pid, re_reple.rid, re_reple.id)}
                                type="button"
                            >
                                변경
                            </button>
                            <button
                                className="cancel-button"
                                onClick={() => Switch()}
                                type="button"
                            >
                                취소
                            </button>
                        </>}
                </div>
            </div>

            <div className="card-info">
                <a className='info-date'>
                    {re_reple.date}
                </a>
            </div>
        </>
    )
}