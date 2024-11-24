import MergeSortVisualization from "../components/merge";
import NavBar from "../components/UI/navbar";

function MergeVizPage() {
    return(
        <div>
            <NavBar />
            <h1><center>Merge Sort Visualization</center></h1>
            <center><MergeSortVisualization /></center>
        </div>
    )
}

export default MergeVizPage;