import LinearSearchVisualization from "../components/linsearch";
import NavBar from "../components/UI/navbar";

function LinearSearchPage() {
    return(
        <div>
            <NavBar />
            <h1><center>Linear Search Algorithm Visualization</center></h1>
            <center><LinearSearchVisualization /></center>
        </div>
    )
}

export default LinearSearchPage;