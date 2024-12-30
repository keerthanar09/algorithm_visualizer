
import NavBar from "../components/UI/navbar";
import SearchAlgorithmList from "../components/UI/SearchList";

function SearchListPage(){
    return(
        <div>
            <NavBar />
            <h1>Searching Algorithms</h1>
            <SearchAlgorithmList/>
        </div>
    )
}

export default SearchListPage;