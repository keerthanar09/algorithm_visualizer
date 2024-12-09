import BellmanVisualization from "../components/bellman's";
import NavBar from "../components/UI/navbar";

function BellmanVizPage() {
    return(
        <div>
            <NavBar />
            <h1><center>Bellman Ford's Visualization</center></h1>
            <center><BellmanVisualization /></center>
        </div>
    )
}

export default BellmanVizPage;