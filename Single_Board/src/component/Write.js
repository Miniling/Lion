import { useState } from "react";
import '../style/Write.css';

export default function Write(props) {
    const list = props.data;

    function getIdx() {
        let idx = 0;
        if (list != null) {
            idx = list.length
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

    const [posts, setPost] = useState({
        id: getIdx(),
        title: '',
        content: '',
        date: '',
    })

    const onTitleChange = (event) => {
        setPost({
            ...posts,
            title: event.currentTarget.value
        });
    };

    const onContentChange = (event) => {
        setPost({
            ...posts,
            content: event.currentTarget.value
        });
    };

    const addPost = () => {
        posts.date = getDate()

        if (!localStorage.getItem('posts')) {
            const index_array = [];
            index_array.push(posts);
            localStorage.setItem('posts', JSON.stringify(index_array));  // 로컬에 저장
        }
        else {
            const saved_array = JSON.parse(localStorage.getItem('posts'));
            saved_array.push(posts);
            localStorage.setItem('posts', JSON.stringify(saved_array));  // 로컬에 저장
        }

        Refresh()
    }

    const Refresh = () => {
        window.location.href = "/"
    }

    return (
        <>
            <div className="form">
                <input
                    className="title"
                    onChange={onTitleChange}
                    value={posts.title}
                    type="text"
                    placeholder="제목을 입력하세요." >
                </input>

                <textarea
                    className="content"
                    onChange={onContentChange}
                    value={posts.content}
                    type="text"
                    placeholder="내용을 입력하세요." >
                </textarea>

                <button
                    className="posting-button"
                    onClick={addPost}
                    type="button"
                >
                    등록
                </button>
            </div>
        </>
    )
}