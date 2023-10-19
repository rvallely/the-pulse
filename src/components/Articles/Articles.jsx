import Header from "../General/Header";
import Nav from "../General/Nav";
import { useSearchParams } from 'react-router-dom'

function Articles() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTopic = searchParams.get('topic')
    return (
        <div>
            <Header />
            <Nav selectedItem={searchTopic}/>
        </div>
    )
}

export default Articles;