import ReCommentCard from "./ReCommentCard";

export default function ReCommentList(props) {
    let data = 0;
    const re_reple = props.data;
    const pid = props.pid;
    const rid = props.rid;

    if (re_reple) {
        data = 1;
    }

    return (
        <>
            <div>
                {data === 0 || re_reple.length === 0 ?
                    <></> :
                    <div className='board-list'>
                        {re_reple.filter((reple) =>
                            (reple.pid === pid) &&
                            (reple.rid === rid)).map((re_reple) => (
                                <li className="post-card">
                                    <ReCommentCard
                                        data={re_reple}
                                    />
                                </li>
                            ))}
                    </div>}
            </div>
        </>
    )
}