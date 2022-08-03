import { useLocation, Link } from 'react-router-dom';
import CommentList from '../component/CommentList';
import Comment from '../component/Comment';
import Footer from '../component/Footer';
import '../css/PostPage.css';

export default function PostPage() {
    const location = useLocation();
    const post = location.state.data;
    const reply = JSON.parse(localStorage.getItem('reples'));
    const re_reple = JSON.parse(localStorage.getItem('re_reples'));

    /* 삭제 관련 함수 */
    function updateRepleList(list, idx) {
        // 삭제할 게시물의 댓글 삭제
        for (let i = 0; i < list.length; i++) {
            if (list[i].pid === idx) {
                delete list[i]
            }
        }

        const updated = list.filter((data) => data.length !== 0);

        for (let i = 0; i < updated.length; i++) {
            // 게시물 ID에 맞게 PID 변경 
            if (updated[i].pid > idx) {
                updated[i].pid--;
            }
        }

        return updated;
    }

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
        const post_saved = JSON.parse(localStorage.getItem('posts'));
        const re_reple_updated = updateRepleList(re_reple, id);
        const reple_updated = updateRepleList(reply, id);
        delete post_saved[id];
        const post_updated = updateList(post_saved)
        localStorage.setItem('posts', JSON.stringify(post_updated));  // 로컬에 저장
        localStorage.setItem('reples', JSON.stringify(reple_updated));  // 로컬에 저장
        localStorage.setItem('re_reples', JSON.stringify(re_reple_updated));  // 로컬에 저장
        alert("삭제되었습니다.")

        goHome()
    }

    const goHome = () => {
        window.location.href = "/";
    }

    return (
        <>
            <section id="head">
                <div className="head-writing">
                    <a>{post.title}</a>
                    <span className='button'>
                        <button
                            className="delete-button"
                            onClick={() => delPost(post.id)}
                            type="button"
                        >
                            삭제
                        </button>

                        <Link className="update-button"
                            to={`/post/${post.id}/update`}
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
                    <div className="post-subject">{post.subject}</div>
                    <div className="content-box">
                        {post.content}
                    </div>
                </div>

                <div className="comment">
                    <Comment
                        pid={post.id}
                        data={reply}
                    />
                    <CommentList
                        pid={post.id}
                        data={reply}
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