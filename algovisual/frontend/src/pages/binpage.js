import BinarySearchVisualization from "../components/binsearch";
import NavBar from "../components/UI/navbar";

function BinarySearchPage() {
    return(
        <div>
            <NavBar />
            <h1><center>Binary Search Algorithm Visualization</center></h1>
            <center><BinarySearchVisualization /></center>
        </div>
    )
}

export default BinarySearchPage;