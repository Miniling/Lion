import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../component/Footer';
import '../css/WritingPage.css';

export default function UpdatePage() {
    const location = useLocation();
    const post = location.state.data;


    const subjectRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();

    const subjects = [
        '주제', '일상', '과제', '수강신청', '동아리', '취업', '시험', '알바'
    ]

    const [posts, setPost] = useState({
        subject: post.subject,
        title: post.title,
        content: post.content,
        reply: post.reply,
    })

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

    const updatePost = () => {
        if (posts.subject === '' || posts.subject === '주제') {
            alert("주제를 선택해 주세요.");
            subjectRef.current.focus();
        } else if (posts.title === '') {
            alert("제목을 입력해 주세요.");
            titleRef.current.focus();
        } else if (posts.content === '') {
            alert("내용을 입력해 주세요.");
            contentRef.current.focus();
        } else {
            if (window.confirm("수정하시겠습니까?")) {
                const saved_array = JSON.parse(localStorage.getItem('posts'));
                let idx = saved_array.findIndex(e => e.id === post.id);
                saved_array[idx].title = posts.title;
                saved_array[idx].content = posts.content;
                saved_array[idx].subject = posts.subject;
                localStorage.setItem('posts', JSON.stringify(saved_array));  // 로컬에 저장
                alert("수정되었습니다.");

                goHome()
            }
        }
    }

    const goHome = () => {
        window.location.href = "/"
    }

    return (
        <>
            <section id="head">
                <div className="head-writing">
                    <a>글 수정하기</a>
                    <span>
                        <button
                            className="posting-button"
                            onClick={() => updatePost()}
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
                        value={posts.subject}
                        ref={subjectRef}
                    >
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
                        ref={titleRef}
                        placeholder="제목을 입력해 주세요."
                    />

                    <textarea
                        className="content"
                        onChange={onContentChange}
                        value={posts.content}
                        type="text"
                        ref={contentRef}
                        placeholder="내용을 입력해 주세요."
                    />

                    <button
                        className="back"
                        onClick={goHome}
                        type="button"
                    >
                        홈으로
                    </button>
                </div>
            </section>

            <section id="foot">
                <Footer />
            </section>
        </>
    )
}