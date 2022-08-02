import { useState } from "react";

const PeopleCard = ({ people }) => {
    const [visible, setVisible] = useState();
    return (
        <>
            <div className='peopleCard'>
                <img src={people.img} />
                <div className='cardCenter'>
                    <h3>{people.name}</h3>
                    <a>{people.department}</a>
                </div>
                <button onClick={() => {
                    setVisible(!visible);
                }}>
                    상세보기
                </button>
            </div>

            {visible &&
                <div className="peopleDetail">
                    <span>
                        <a>MBIT: </a>
                        {people.MBTI}
                    </span>
                    <span>
                        <a>INTRODUCE: </a>
                        {people.detail}
                    </span>
                </div>
            }
        </>
    )
}

export default PeopleCard;