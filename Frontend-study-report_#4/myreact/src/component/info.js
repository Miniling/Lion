import '../css/people.css';

import { getInfo } from '../frontendinfo';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import PeopleCard from './peopleCard';

function Info() {
    const [visible, setVisible] = useState();

    const params = useParams();
    const frontEndInfo = getInfo();

    const student = [];
    frontEndInfo.forEach((ele) => {
        if (ele.department == params.department)
            student.push(
                {
                    name: ele.name,
                    department: ele.department,
                    MBTI: ele.MBTI,
                    detail: ele.detail,
                    img: ele.photo,
                }
            )
    });

    return (
        <>
            {student.map((ele) => (
                <div className='people'>
                    <PeopleCard
                        people={ele}
                    />
                </div>
            ))}
        </>
    )
}

export default Info;