import { useState } from 'react';
import Footer from '../component/Footer';
import '../css/WritingPage.css';

export default function WritingPage() {
    function getIdx() {
        var idx = 0;
        if (JSON.parse(localStorage.getItem('posts')) != null) {
            idx = JSON.parse(localStorage.getItem('posts')).length
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

    const onSubjectChange = (event) => {
        setPost({
            ...posts,
            subject: event.currentTarget.value === '주제'
                ? ''
                : event.currentTarget.value
        });
    };

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

    const [posts, setPost] = useState({
        id: getIdx(),
        subject: '',
        title: '',
        content: '',
        reply: 0,
        date: '',
    })

    const subjects = [
        '주제', '일상', '과제', '수강신청', '동아리', '취업', '시험', '알바'
    ]

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
        alert("등록되었습니다!")

        goHome()
    }

    const goHome = () => {
        window.location.href = "/"
    }

    return (
        <>
            <section id="head">
                <div className="head-writing">
                    <a>글 작성하기</a>
                    <span>
                        <button
                            className="posting-button"
                            onClick={addPost}
                            type="button"
                        >
                            완료
                        </button>
                    </span>
                </div>
            </section>

            <section id="body">
                <div className="form">
                    <select
                        className="subject"
                        onChange={onSubjectChange}
                        value={posts.subject} >
                        {subjects.map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>

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
                        className="back"
                        onClick={goHome}
                        type="button"
                    >
                        뒤로가기
                    </button>
                </div>
            </section>

            <section id="foot">
                <Footer />
            </section>
        </>
    )
}