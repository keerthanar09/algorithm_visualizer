import BubbleSortVisualization from "../components/bubblesort";
import NavBar from "../components/UI/navbar";

function BubbleVizPage() {
    return(
        <div>
            <NavBar />
            <h1><center>Bubble Sort Visualization</center></h1>
            <center><BubbleSortVisualization /></center>
        </div>
    )
}

export default BubbleVizPage;