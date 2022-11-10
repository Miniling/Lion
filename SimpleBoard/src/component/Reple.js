import { useRef, useState } from "react";
import '../css/Comment.css';

export default function Reple(props) {
    const post = JSON.parse(localStorage.getItem('posts'));
    const pid = post.findIndex(e => e.id === props.pid);  // 게시물 index
    const id = post.findIndex(e => e[pid].comments.id === props.id);    // 댓글 index
    console.log(post);
    const repleRef = useRef();

    // 현재 댓글의 마지막 대댓글 ID + 1, 없으면 ID=0
    function getId() {
        let idx = post[pid].comments[id]['reply'].length;
        if (idx === 0) return idx;
        else return post[pid].comments[id].reply[idx]['id'] + 1;
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
    const [reple, setReple] = useState({
        id: getId(),
        content: '',
        date: '',
    })

    const onContentChange = (event) => {
        setReple({
            ...reple,
            content: event.currentTarget.value
        })
    };

    const addPost = () => {
        if (reple.content === '') {
            alert("댓글을 작성해 주세요.");
            repleRef.current.focus();
        } else {
            reple.date = getDate()

            console.log(pid, id);
            // post[idx]['comments'].push(comment);
            // localStorage.setItem('posts', JSON.stringify(post));

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
                    <span className="reple-title">익명{props.id + 1}에게 답글 달기</span>
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
                    value={reple.content}
                    placeholder="대댓글을 입력해 주세요."
                    ref={repleRef}
                    type="text" >
                </textarea>
            </div>
        </>
    )
}