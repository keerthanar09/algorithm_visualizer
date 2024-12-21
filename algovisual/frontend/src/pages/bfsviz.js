import BFSVisualization from "../components/bfs";
import NavBar from "../components/UI/navbar";

function BFSVisPage() {
    return(
        <div>
            <NavBar />
            <h1><center>Breath First Search Algorithm Visualization</center></h1>
            <center><BFSVisualization /></center>
        </div>
    )
}

export default BFSVisPage;