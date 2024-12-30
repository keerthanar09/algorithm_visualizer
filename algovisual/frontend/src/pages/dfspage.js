import DFSVisualization from "../components/dfs";
import NavBar from "../components/UI/navbar";

function DFSVisPage() {
    return(
        <div>
            <NavBar />
            <h1><center>Depth First Search Algorithm Visualization</center></h1>
            <center><DFSVisualization /></center>
        </div>
    )
}

export default DFSVisPage;