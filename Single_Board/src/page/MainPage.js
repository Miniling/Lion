import List from "../component/List";
import Write from "../component/Write";
import '../style/MainPage.css';

export default function MainPage() {
    const list = JSON.parse(localStorage.getItem('posts'));

    return (
        <>
            <section id="head">
                header
            </section>

            <section id="body">
                <Write
                    data={list}
                />
                <List
                    data={list}
                />
            </section>

            <section id="foot">
                footer
            </section>
        </>
    )
}