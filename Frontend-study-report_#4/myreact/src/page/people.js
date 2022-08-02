import '../css/people.css';
import { getInfo } from '../frontendinfo';
import { Link, Outlet } from 'react-router-dom';
import PeopleCard from '../component/peopleCard';

function People() {
    const frontEndInfo = getInfo();

    const major = [];
    frontEndInfo.forEach((ele) => {
        if (!major.includes(ele.department))
            major.push(ele.department);
    });

    return (
        <>
            <div className="content">
                <div className="title">
                    KIT LIKELION FRONT-END
                </div>
                <div className="major">
                    {major.map((depart) => (
                        <Link
                            to={`/people/${depart}`}
                            key={`depart`}
                        >
                            {depart}
                        </Link>
                    ))}
                </div>

                <div className="peopleInfo">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default People;