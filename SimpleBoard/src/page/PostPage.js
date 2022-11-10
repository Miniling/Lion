import { useLocation, Link } from 'react-router-dom';
import CommentList from '../component/CommentList';
import Comment from '../component/Comment';
import Footer from '../component/Footer';
import '../css/PostPage.css';

export default function PostPage() {
    const location = useLocation();
    const id = location.state.data;     // 게시물 ID
    const post = JSON.parse(localStorage.getItem('posts'));
    const idx = post.findIndex(e => e.id === id);   // 게시물 Index

    const delPost = () => {
        if (window.confirm("삭제하시겠습니까?")) {

            post.splice(idx, 1);
            localStorage.setItem('posts', JSON.stringify(post));  // 로컬에 저장
            alert("삭제되었습니다.")

            goHome()
        }
    }

    const goHome = () => {
        window.location.href = "/";
    }

    return (
        <>
            <section id="head">
                <div className="head-writing">
                    <a>{post[idx].title}</a>
                    <span className='button'>
                        <button
                            className="delete-button"
                            onClick={() => delPost()}
                            type="button"
                        >
                            삭제
                        </button>

                        <Link className="update-button"
                            to={`/post/${id}/update`}
                            state={{
                                data: post,
                            }}>
                            수정
                        </Link>
                    </span>
                </div>
            </section>

            <section id="body">
                <div className="form">
                    <div className="post-subject">{post[idx].subject}</div>
                    <div className="content-box">
                        {post[idx].content}
                    </div>
                </div>

                <div className="comment">
                    <Comment
                        id={id}
                    />
                    <CommentList
                        id={id}
                    />
                </div>

                <button
                    type="button"
                    className="back"
                    onClick={goHome} >
                    뒤로가기
                </button>
            </section>

            <section id="foot">
                <Footer />
            </section>
        </>
    )
}