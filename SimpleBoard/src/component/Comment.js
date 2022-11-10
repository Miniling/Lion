import { useRef, useState } from "react";
import '../css/Comment.css';

export default function Comment(props) {
    const id = props.id;
    const post = JSON.parse(localStorage.getItem('posts'));
    const commentRef = useRef();

    function getIdx() {
        let idx = post[id]['comments'].length - 1;
        if (idx === 0) return 0;

        // 마지막 댓글 ID의 다음 값 반환
        return post[id].comments[idx]['id'] + 1;
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