import CommentCard from "./CommentCard";

export default function CommentList(props) {
    const id = props.id;
    const post = JSON.parse(localStorage.getItem('posts'));

    return (
        <>
            <div>
                {post[id]['comments'].length === 0 ?
                    <a>아직 작성된 댓글이 없습니다.</a> :
                    <div className='board-list'>
                        {post[id]['comments'].map(re => (
                            <li className="post-card">
                                <CommentCard
                                    data={re}
                                    pid={id}
                                />
                            </li>
                        ))}
                    </div>}
            </div>
        </>
    )
}