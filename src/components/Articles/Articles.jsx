import UserDisplay from "../General/UserDisplay";
import Header from "../General/Header";
import Nav from "../General/Nav";
import { useSearchParams, Link } from 'react-router-dom'

function Articles(params) {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTopic = searchParams.get('topic')
    return <Nav selectedItem={searchTopic}/>
}

export default Articles;