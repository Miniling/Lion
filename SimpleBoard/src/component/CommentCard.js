import { useRef, useState } from 'react';
import '../css/CommentCard.css';

export default function CommentCard(props) {
    const reple = props.data;
    const list = JSON.parse(localStorage.getItem('posts'))
    const commentRef = useRef();

    const [visible, setVisible] = useState(false);

    const setView = () => {
        setVisible(!visible);
    }

    const Switch = () => {
        setIsClicked(!isClicked);
    }

    /* 댓글 개수 갱신 */
    function updateCount(reply) {
        for (let i = 0; i < list.length; i++) {
            list[i].reply = reply.length - 1;
        }
        localStorage.setItem('posts', JSON.stringify(list))
    }

    /* 해당 게시물의 댓글 Index 반환 */
    function findElement(list, pid, id) {
        let idx = -1;

        // 게시물 ID와 댓글 ID가 일치하는 댓글의 인덱스 반환
        for (let i = 0; i < list.length; i++) {
            if ((list[i].pid === pid) && (list[i].id === id)) {
                idx = i;
            }
        }
        return idx;
    }

    /* 수정 관련 함수 */
    const [isClicked, setIsClicked] = useState(false);

    const [reples, setPost] = useState({
        content: reple.content,
        date: reple.date,
    })

    const onContentChange = (event) => {
        setPost({
            ...reples,
            content: event.currentTarget.value
        });
    };

    const updatePost = (pid, id) => {
        if (reples.content === '') {
            alert("댓글을 작성해 주세요.");
            commentRef.current.focus();
        } else {
            const saved_array = JSON.parse(localStorage.getItem('reples'));
            let idx = findElement(saved_array, pid, id);
            saved_array[idx].content = reples.content;
            localStorage.setItem('reples', JSON.stringify(saved_array));  // 로컬에 저장

            setIsClicked(!isClicked);
            Refresh()
        }
    }

    /* 삭제 관련 함수 */
    function updateRepleList(pid, id) {

    }

    /* 갱신 함수 */
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

    const delPost = (pid, id) => {
        if (window.confirm("삭제하시겠습니까?")) {
            const saved_array = JSON.parse(localStorage.getItem('reples'));
            const reple_updated = updateRepleList(pid, id);
            let idx = findElement(saved_array, pid, id);
            delete saved_array[idx];
            const updated = updateList(saved_array, idx)
            localStorage.setItem('reples', JSON.stringify(updated));  // 로컬에 저장
            alert("댓글 삭제")

            updateCount(saved_array)
            Refresh()
        }
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
                                익명{reple.id + 1}
                            </a>
                            <a>{reple.content}</a>
                        </> :
                        <>
                            <textarea
                                className="content-update"
                                onChange={onContentChange}
                                value={reples.content}
                                placeholder="댓글을 입력해 주세요."
                                ref={commentRef}
                                type="text" />
                        </>
                    }
                </div>

                <div className='card-button'>
                    {isClicked === false ?
                        <>
                            <button
                                className="delete-button"
                                onClick={() => delPost(reple.pid, reple.id)}
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
                            <button
                                className="recomment-button"
                                onClick={() => setView()}
                                type="button"
                            >
                                댓글
                            </button>
                        </> :
                        <>
                            <button
                                className="update-button"
                                onClick={() => updatePost(reple.pid, reple.id)}
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
                <a className='info-re'>
                    {reple.reply}
                </a>

                <a className='info-date'>
                    {reple.date}
                </a>
            </div>
        </>
    )
}