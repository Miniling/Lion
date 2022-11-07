import { useRef, useState } from "react";
import '../css/Comment.css';

export default function Comment(props) {
    const post = props.post;
    const reply = props.data;
    const pid = props.pid;
    const list = JSON.parse(localStorage.getItem('posts'));
    const commentRef = useRef();

    /* 댓글 ID값 변경 */
    function getIdx(pid) {
        let idx = 0;

        if (reply) {
            for (let i = 0; i < reply.length; i++) {
                if (reply[i].pid === pid) {
                    // 해당 게시물의 댓글 중 ID값의 최대값으로 갱신
                    idx = (reply[i].id + 1);
                }
            }
        }

        return idx;
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
    const [reple, setReple] = useState({
        id: 0,
        content: '',
        date: '',
    })

    const [reples, setPost] = useState({
        pid: pid,
        id: getIdx(pid),
        content: '',
        date: '',
    })

    const onContentChange = (event) => {
        setReple({
            ...reple,
            content: event.currentTarget.value
        })
        setPost({
            ...reples,
            content: event.currentTarget.value
        });
    };

    const addPost = () => {
        if (reple.content === '') {
            alert("댓글을 작성해 주세요.");
            commentRef.current.focus();
        } else {
            reple.date = getDate()

            let idx = list.findIndex(e => e.id === post['id']);
            list[idx]['reples'].push(reple);
            localStorage.setItem('posts', JSON.stringify(list));

            Refresh()
        }
    }

    /* 새로고침 */
    const Refresh = () => {
        window.location.reload()
    }

    return (
        <>
            <div className="reple-form">
                <button
                    className="posting-button"
                    onClick={addPost}
                    type="button"
                >
                    등록
                </button>

                <textarea
                    className="reple-content"
                    onChange={onContentChange}
                    value={reple.content}
                    placeholder="댓글을 입력해 주세요."
                    ref={commentRef}
                    type="text" >
                </textarea>
            </div>
        </>
    )
}