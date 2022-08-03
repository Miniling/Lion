import CommentCard from "./CommentCard";

export default function CommentList(props) {
    let data = 0;
    const reply = props.data;
    const pid = props.pid;

    if (reply) {
        data = 1;
    }

    return (
        <>
            <div>
                {data === 0 || reply.length === 0 ?
                    <a>아직 작성된 댓글이 없습니다.</a> :
                    <div className='board-list'>
                        {reply.filter((reple) =>
                            reple.pid === pid).map((reple) => (
                                <li className="post-card">
                                    <CommentCard
                                        data={reple}
                                    />
                                </li>
                            ))}
                    </div>}
            </div>
        </>
    )
}