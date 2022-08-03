import { useState } from "react";
import '../css/Comment.css';

export default function Comment(props) {
    const re_reple = props.data;
    const pid = props.pid;
    const rid = props.rid;
    const list = JSON.parse(localStorage.getItem('posts'))

    /* 댓글 개수 갱신 */
    function updateCount() {
        list[pid].reply++;
        localStorage.setItem('posts', JSON.stringify(list))
    }

    /* 댓글 ID값 변경 */
    function getIdx(pid) {
        let idx = 0;

        if (re_reple) {
            for (let i = 0; i < re_reple.length; i++) {
                if ((re_reple[i].pid === pid) && (re_reple[i].rid === rid)) {
                    // 해당 게시물의 댓글 중 ID값의 최대값으로 갱신
                    idx = (re_reple[i].id + 1);
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

    const [re_reples, setPost] = useState({
        pid: pid,
        rid: rid,
        id: getIdx(pid, rid),
        content: '',
        date: '',
    })

    const onContentChange = (event) => {
        setPost({
            ...re_reples,
            content: event.currentTarget.value
        });
    };

    const addPost = () => {
        re_reples.date = getDate()

        if (!localStorage.getItem('re_reples')) {
            const index_array = [];
            index_array.push(re_reples);
            localStorage.setItem('re_reples', JSON.stringify(index_array));  // 로컬에 저장
        }
        else {
            const saved_array = JSON.parse(localStorage.getItem('re_reples'));
            saved_array.push(re_reples);
            localStorage.setItem('re_reples', JSON.stringify(saved_array));  // 로컬에 저장
        }

        Refresh()
        updateCount()
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
                    value={re_reples.content}
                    type="text" >
                </textarea>
            </div>
        </>
    )
}