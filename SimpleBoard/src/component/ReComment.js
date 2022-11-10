import { useRef, useState } from "react";
import '../css/Comment.css';

export default function ReComment(props) {
    const id = props.id;
    const post = JSON.parse(localStorage.getItem('posts'));
    const commentRef = useRef();

    function getIdx() {
        let idx = post[id]['comments'].length;
        if (idx === 0) return idx;

        return post[id].comments[idx] + 1;
    }

    function getDate() {
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        let date = now.getDate()
        let today = `${year}-${month}-${date}`

        return today;
    }

    // post 로컬에 저장될 댓글 Obj
    const [comment, setReple] = useState({
        id: getIdx(),
        content: '',
        date: '',
        reply: [],
    })

    const onContentChange = (event) => {
        setReple({
            ...comment,
            content: event.currentTarget.value
        })
    };

    const addPost = () => {
        if (comment.content === '') {
            alert("댓글을 작성해 주세요.");
            commentRef.current.focus();
        } else {
            comment.date = getDate()

            let idx = post.findIndex(e => e.id === id);
            post[idx]['comments'].push(comment);
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
                <div className="comment-top">
                    <span>댓글 {post[id]['comments'].length}</span>
                    <button
                        className="posting-button"
                        onClick={addPost}
                        type="button"
                    >
                        등록
                    </button>
                </div>
                <textarea
                    className="comment-content"
                    onChange={onContentChange}
                    value={comment.content}
                    placeholder="댓글을 입력해 주세요."
                    ref={commentRef}
                    type="text" >
                </textarea>
            </div>
        </>
    )
}