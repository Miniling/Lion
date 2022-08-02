import '../css/about.css';

function About() {

    return (
        <>
            <div className="content">
                <div className="title">
                    ABOUT LIKELION
                </div>

                <div className="about">
                    <div className='aboutLeft'>
                        <img src="/img/ABOUT_image.png" />
                    </div>

                    <div className='aboutRight'>
                        <a>
                            멋쟁이사자처럼은 "HACK YOUR LIFE!,
                            내 아이디어를 내 손으로 실현한다."라는 가치 아래
                            전국 대학을 대상으로 온라인 기반의 강의와 오프라인
                            활동이 함께 이루어지는 웹 코딩 교육 동아리입니다.
                            또한 현재 42개의 대학이 함께하고 있는 웹 개발 교육
                            프로그램입니다. 금오공과대학교 멋쟁이사자처럼은
                            2022년 신규 동아리로 더 많은 사람들과 더 높은 꿈을
                            위해 도전해 나가고 있습니다.
                        </a>
                    </div>
                </div>

            </div>
        </>
    );
}

export default About;