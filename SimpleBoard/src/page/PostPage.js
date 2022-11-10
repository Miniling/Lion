import { useLocation, Link } from 'react-router-dom';
import CommentList from '../component/CommentList';
import Comment from '../component/Comment';
import Footer from '../component/Footer';
import '../css/PostPage.css';

export default function PostPage() {
    const location = useLocation();
    const id = location.state.data;
    const post = JSON.parse(localStorage.getItem('posts'));

    /* 갱신 함수 */
    function updateList(list) {
        const updated = list.filter((data) => data.length !== 0);

        // 게시물 ID 갱신
        for (let i = 0; i < updated.length; i++) {
            updated[i].id = i;
        }

        return updated;
    }

    const delPost = (id) => {
        if (window.confirm("삭제하시겠습니까?")) {
            delete post[id];
            const post_updated = updateList(post)
            localStorage.setItem('posts', JSON.stringify(post_updated));  // 로컬에 저장
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
                    <a>{post[id].title}</a>
                    <span className='button'>
                        <button
                            className="delete-button"
                            onClick={() => delPost(id)}
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
                    <div className="post-subject">{post[id].subject}</div>
                    <div className="content-box">
                        {post[id].content}
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