import CommentCard from "./CommentCard";

export default function CommentList(props) {
    const post = JSON.parse(localStorage.getItem('posts'));
    const id = post.findIndex(e => e.id === props.id);    // 게시물 Index

    return (
        <>
            <div>
                {post[id]['comments'].length === 0 ?
                    <a>아직 작성된 댓글이 없습니다.</a> :
                    <div className='board-list'>
                        {post[id]['comments'].map(reple => (
                            <li className="post-card">
                                <CommentCard
                                    data={reple}
                                    pid={props.id}
                                />
                            </li>
                        ))}
                    </div>}
            </div>
        </>
    )
}