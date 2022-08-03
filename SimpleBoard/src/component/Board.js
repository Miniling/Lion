import { Link } from 'react-router-dom';
import '../css/Board.css';

export default function Board(props) {
    var data = 0;
    const list = props.data;
    const reply = JSON.parse(localStorage.getItem('reples'))

    function updateCount() {
        for (let i = 0; i < list.length; i++) {
            list[i].reply = reply.filter(
                (reple) => reple.pid === i).length
        }
        localStorage.setItem('posts', JSON.stringify(list));
    }

    function initCount() {
        for (let i = 0; i < list.length; i++) {
            list[i].reply = 0;
        }
        localStorage.setItem('posts', JSON.stringify(list));
    }

    var listDesc = [];
    if (list) {
        data = 1;

        if (reply) {
            updateCount()
        }
        else {
            initCount()
        }

        // 배열 역순 정렬
        listDesc = list.slice(0).reverse().map(data => data);
    }

    return (
        <>
            <div>
                {data === 0 || list.length === 0 ?
                    <a>게시글이 없습니다!</a> :
                    <div>
                        {listDesc.map((post) => (
                            <Link className='post-link'
                                to={`/post/${post.id}`}
                                state={{
                                    data: post,
                                }}>
                                <li className="post-card">
                                    <a className="post-title">{post.title}</a>
                                    <a className="post-content">{post.content}</a>
                                    <div className="post-info">
                                        <a className='info-left'>{post.subject}</a>
                                        <span className='info-right'>
                                            <a>댓글{post.reply}</a>
                                            <a>{post.date}</a>
                                        </span>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </div>}
            </div>
        </>
    )
}