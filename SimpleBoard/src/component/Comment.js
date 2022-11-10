import { useRef, useState } from "react";
import '../css/Comment.css';

export default function Comment(props) {
    const post = JSON.parse(localStorage.getItem('posts'));
    const id = post.findIndex(e => e.id === props.id);     // 게시물 Index
    const commentRef = useRef();

    // 현재 게시물의 마지막 댓글 ID + 1, 없으면 ID=0
    function getId() {
        let idx = post[id]['comments'].length;
        if (idx === 0) return idx;
        else return post[id].comments[idx - 1].id + 1;
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
        id: getId(),
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
            post[id]['comments'].push(comment);
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
                    <span className="comment-title">댓글 {post[id]['comments'].length}</span>
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