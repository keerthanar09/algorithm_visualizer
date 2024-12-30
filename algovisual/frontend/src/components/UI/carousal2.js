import './styles/styles.css';

function Carousal2() {
  return (
    <div>
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div className="d-flex justify-content-center">
              <div class="card mx-2" style={{ width: "18rem" }}>
                <img
                  src="/images/img2.jpg"
                  class="card-img-top"
                  alt="image cap"
                ></img>
                <div class="card-body">
                  <h5 class="card-title">Sorting algorithms</h5>
                  <p class="card-text">
                    Click the below button to view the list of sorting algorithms that you can visualize!
                  </p>
                  <a href="/Sortinglist" class="btn btn-primary">
                    View List
                  </a>
                </div>
              </div>

              <div class="card mx-2" style={{ width: "18rem" }}>
                <img
                  src="/images/img4.png"
                  class="card-img-top"
                  alt="image cap"
                ></img>
                <div class="card-body">
                  <h5 class="card-title">Path Finding Algorithms</h5>
                  <p class="card-text">
                    Click the button below to find a list of path finding algorithms to visualize!
                  </p>
                  <a href="/pflist" class="btn btn-primary">
                    View List
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div className="d-flex justify-content-center">
              <div class="card mx-2" style={{ width: "18rem" }}>
                <img
                  src="/images/img3.png"
                  class="card-img-top"
                  alt="image cap"
                ></img>
                <div class="card-body">
                  <h5 class="card-title">Search Algorithms</h5>
                  <p class="card-text">
                    Click the button below to find a list of Search algorithms to visualize!
                  </p>
                  <a href="/SearchList" class="btn btn-primary">
                    View List
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
export default Carousal2;

{
  /* <div class="card" style={{width: "18rem"}}>
<img src="/images/img1.jpg" class="card-img-top" alt="image cap"></img>
<div class="card-body">
  <h5 class="card-title">Card title</h5>
  <p class="card-text">
    Some quick example text to build on the card title and make up the
    bulk of the card's content.
  </p>
  <a href="#" class="btn btn-primary">
    Go somewhere
  </a>
</div>
</div> */
}
