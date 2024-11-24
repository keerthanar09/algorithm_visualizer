import SelectionSortVisualization from "../components/selection";
import NavBar from "../components/UI/navbar";

function SelVizPage() {
    return(
        <div>
            <NavBar />
            <h1><center>Selection Sort Visualization</center></h1>
            <center><SelectionSortVisualization /></center>
        </div>
    )
}

export default SelVizPage;