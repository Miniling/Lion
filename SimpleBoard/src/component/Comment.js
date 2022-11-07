import { useRef, useState } from "react";
import '../css/Comment.css';

export default function Comment(props) {
    const post = props.post;
    const reply = props.data;
    const pid = props.pid;
    const list = JSON.parse(localStorage.getItem('posts'));
    const commentRef = useRef();

    /* 댓글 개수 갱신 */
    function updateCount() {
        list[pid].reply++;
        localStorage.setItem('posts', JSON.stringify(list))
    }

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
        setPost({
            ...reples,
            content: event.currentTarget.value
        });
    };

    const addPost = () => {
        if (reples.content === '') {
            alert("댓글을 작성해 주세요.");
            commentRef.current.focus();
        } else {
            reples.date = getDate()

            if (!localStorage.getItem('reples')) {
                const index_array = [];
                index_array.push(reples);
                localStorage.setItem('reples', JSON.stringify(index_array));  // 로컬에 저장
            }
            else {
                const saved_array = JSON.parse(localStorage.getItem('reples'));
                saved_array.push(reples);
                localStorage.setItem('reples', JSON.stringify(saved_array));  // 로컬에 저장
            }

            Refresh()
            updateCount()
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
                    value={reples.content}
                    placeholder="댓글을 입력해 주세요."
                    ref={commentRef}
                    type="text" >
                </textarea>
            </div>
        </>
    )
}