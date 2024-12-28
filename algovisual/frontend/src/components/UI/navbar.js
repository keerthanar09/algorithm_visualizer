import "./styles/styles.css";
import "animate.css";
import "animate.css/source/animate.css";
import SearchBar from "./searchbar";

{
  /*Not gonna change the name of the function for convenience as i'd have to change it everywhere
  but this function serves as a HEADER thats present in every page!*/
}

function NavBar() {
  return (
    <div id="header">
      <h1 class="animate__animated animate__bounceInDown">
        Algorithm Visualizer
      </h1>
      <div class="container">
        <nav class="navbar" style={{ backgroundColor: "#e3f2fd" }}>
          <div class="container-fluid">
            <a class="navbar-brand" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="currentColor"
                class="bi bi-house-door"
                viewBox="0 0 16 16"
              >
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
              </svg>
              &nbsp; Home
            </a>
            <SearchBar/>
          </div>
        </nav>
      </div>
    </div>
  );
}
export default NavBar;
