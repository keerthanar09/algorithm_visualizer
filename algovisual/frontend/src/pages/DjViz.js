import DijkstraVisualization from "../components/dijkstra";
import NavBar from "../components/UI/navbar";

function DijViz() {
    return(
        <div>
            <NavBar />
            <h1><center>Dijkstra's Algorithm Visualization</center></h1>
            <center><DijkstraVisualization /></center>
        </div>
    )
}

export default DijViz;