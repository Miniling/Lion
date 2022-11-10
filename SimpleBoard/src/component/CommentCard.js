import { useRef, useState } from 'react';
import '../css/CommentCard.css';
import Reple from './Reple';

export default function CommentCard(props) {
    const reple = props.data;
    const pid = props.pid;
    const post = JSON.parse(localStorage.getItem('posts'));
    const commentRef = useRef();

    const [visible, setVisible] = useState(false);

    const setView = () => {
        setVisible(!visible);
    }

    const Switch = () => {
        setIsClicked(!isClicked);
    }

    /* 수정 관련 함수 */
    const [isClicked, setIsClicked] = useState(false);

    const [comment, setPost] = useState({
        content: reple.content,
        date: reple.date,
    })

    const onContentChange = (event) => {
        setPost({
            ...comment,
            content: event.currentTarget.value
        });
    };

    const updatePost = (id) => {
        // 중간에 삭제된 댓글이 생기면 인덱스값과 달라지므로 찾아주기
        let idx = post[pid]['comments'].findIndex(e => e.id === id);

        if (comment.content === '') {
            alert("댓글을 작성해 주세요.");
            commentRef.current.focus();
        } else {
            if (window.confirm("수정하시겠습니까?")) {
                post[pid].comments[idx].content = comment.content;
                localStorage.setItem('posts', JSON.stringify(post));  // 로컬에 저장

                setIsClicked(!isClicked);
                Refresh()
            }
        }
    }

    // /* 삭제 관련 함수 */
    // function updateRepleList(pid, id) {
    //     // 삭제할 댓글의 대댓글 삭제
    //     for (let i = 0; i < re_reple.length; i++) {
    //         if ((re_reple[i].pid === pid) && (re_reple[i].rid === id)) {
    //             delete re_reple[i];
    //         }
    //     }

    //     const updated = re_reple.filter((data) => data.length !== 0);
    //     // 댓글 고유 ID 유지되므로 대댓글 RID 변경 불필요

    //     return updated;
    // }

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

    const delPost = (id) => {
        // 중간에 삭제된 댓글이 생기면 인덱스값과 달라지므로 찾아주기
        let idx = post[pid]['comments'].findIndex(e => e.id === id);

        if (window.confirm("삭제하시겠습니까?")) {
            post[pid]['comments'].splice(idx, 1);
            localStorage.setItem('posts', JSON.stringify(post));  // 로컬에 저장
            alert("댓글 삭제");

            Refresh();
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
                                value={comment.content}
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
                                onClick={() => delPost(reple.id)}
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
                                onClick={() => updatePost(reple.id)}
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

            {visible === false ?
                null :
                <div className='card-reple'>
                    <Reple
                        pid={pid}
                        id={reple.id}
                    />
                </div>
            }
        </>
    )
}