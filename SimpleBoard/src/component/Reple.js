import { useRef, useState } from "react";
import '../css/Comment.css';

export default function Reple(props) {
    const pid = props.pid;
    const id = props.id;
    const post = JSON.parse(localStorage.getItem('posts'));
    const replyRef = useRef();

    function getIdx() {
        let idx = post[pid].comments[id]['reply'].length;
        if (idx === 0) return idx;

        return post[pid].comments[id].reply[idx] + 1;
    }

    function getDate() {
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        let date = now.getDate()
        let today = `${year}-${month}-${date}`

        return today;
    }

    // post 로컬에 저장될 대댓글 Obj
    const [reply, setReple] = useState({
        id: getIdx(),
        content: '',
        date: '',
    })

    const onContentChange = (event) => {
        setReple({
            ...reply,
            content: event.currentTarget.value
        })
    };

    const addPost = () => {
        if (reply.content === '') {
            alert("댓글을 작성해 주세요.");
            replyRef.current.focus();
        } else {
            reply.date = getDate()

            let idx = post.findIndex(e => e.id === id);
            // post[idx]['comments'].push(comment);
            localStorage.setItem('posts', JSON.stringify(post));

            Refresh()
        }
    }

    /* 새로고침 */
    const Refresh = () => {
        window.location.reload()
    }

    return (
        <>
            <div className="comment-form">
                <div className="reple-top">
                    <span className="reple-title">익명{id + 1}에게 답글 달기</span>
                    <button
                        className="posting-button"
                        onClick={addPost}
                        type="button"
                    >
                        등록
                    </button>
                </div>
                <textarea
                    className="reple-content"
                    onChange={onContentChange}
                    value={reply.content}
                    placeholder="대댓글을 입력해 주세요."
                    ref={replyRef}
                    type="text" >
                </textarea>
            </div>
        </>
    )
}