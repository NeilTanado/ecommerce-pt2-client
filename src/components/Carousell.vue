<template>
  <div class=" mb-3 mt-3">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="https://www.gizmochina.com/wp-content/uploads/2018/06/ASUS-ROG-Phone.png" alt="the-buzz-img3"  style="width:640px;height:400px">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="https://i1.wp.com/www.androidhits.com/wp-content/uploads/2018/04/Xiaomi-Black-Shark-AndroidHits-2.jpg?fit=1920%2C1080&ssl=1s" alt="the-buzz-img3"  style="width:640px;height:400px">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="https://www.beritateknologi.com/wp-content/uploads/2017/11/Razer-Phone-Singapore.jpg" alt="the-buzz-img3"  style="width:640px;height:400px">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
  .carousel-inner > .item > img, .carousel-inner > .item > a > img {
      width: 100%;
      height: 75%;
  }
</style>
