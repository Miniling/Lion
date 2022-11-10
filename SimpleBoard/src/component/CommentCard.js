import { useRef, useState } from 'react';
import '../css/CommentCard.css';
import Reple from './Reple';

export default function CommentCard(props) {
    const post = JSON.parse(localStorage.getItem('posts'));
    const reple = props.data;   // 각 댓글카드의 댓글 데이터
    const pid = post.findIndex(e => e.id === props.pid);  // 게시물 Index
    const commentRef = useRef();

    const [visible, setVisible] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // 대댓글 입력창 열고닫기
    const setView = () => {
        setVisible(!visible);
    }

    // 댓글 수정 열고닫기
    const Switch = () => {
        setIsClicked(!isClicked);
    }

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

    // 댓글 수정 기능
    const updatePost = (id) => {
        // 중간에 삭제된 댓글이 생기면 인덱스값이 달라지므로 찾아주기
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

    // 댓글 삭제 기능
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