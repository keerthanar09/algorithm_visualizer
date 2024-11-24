function Carousal(){
  return(
    <div>
      <div id="carouselExampleFade" class="carousel slide carousel-fade">
  <div class="carousel-inner">
    <div class="carousel-item active"active>
      <img src="/images/download.jpg" class="d-block w-100" alt="sorting">
      </img>
    </div>
    <div class="carousel-item">
      <img src="/images/images.jpg" class="d-block w-100" alt="pathfinding">
      </img>
    </div>
    <div class="carousel-item">
      <img src="/images/Understanding-Binary-Search-Algorithm.png" class="d-block w-100" alt="search">
      </img>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

export default Carousal;