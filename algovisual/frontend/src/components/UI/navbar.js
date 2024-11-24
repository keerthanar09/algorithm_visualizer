import './styles/styles.css';
import 'animate.css';
import 'animate.css/source/animate.css';

{/*Not gonna change the name of the function for convenience as i'd have to change it everywhere
  but this function serves as a HEADER thats present in every page!*/ }



function NavBar() {
    return (
      <div id="header">
        <h1 class="animate__animated animate__bounceInDown">Algorithm Visualizer</h1>
        <div class="container">
        <nav class="navbar" style= {{ backgroundColor: "#e3f2fd" }}>
            <div class="container-fluid">
              <a class="navbar-brand" href="/">
                Home
              </a>
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                ></input>
                <button class="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </nav>
        </div>
      </div>
    );
}
export default NavBar; 