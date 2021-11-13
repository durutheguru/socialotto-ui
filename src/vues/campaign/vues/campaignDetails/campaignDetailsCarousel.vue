<template>
  <div class="">
    <!-- <img
      src="https://socialotto.s3.ca-central-1.amazonaws.com/uploads/default-img-md-bg.jpeg"
      style="width:100%"
    /> -->
    <div class="slideshow-container">
      <div class="mySlides fade">
        <div class="numbertext">1 / 3</div>
        <img
          src="https://socialotto.s3.ca-central-1.amazonaws.com/uploads/default-img-md-bg.jpeg"
          style="width:100%; height: 360px;"
        />
        <div class="text">Caption Text</div>
      </div>

      <div class="mySlides fade">
        <div class="numbertext">2 / 3</div>
        <img
          src="https://socialotto.s3.ca-central-1.amazonaws.com/uploads/images.jpg"
          style="width:100% height: 360px;"
        />
        <div class="text">Caption Two</div>
      </div>

      <div class="mySlides fade">
        <div class="numbertext">3 / 3</div>
        <img
          src="https://socialotto.s3.ca-central-1.amazonaws.com/uploads/images.jpg"
          style="width:100% height: 360px;"
        />
        <div class="text">Caption Three</div>
      </div>

      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>
    </div>
    <br />

    <div style="text-align:center">
      <span class="dot" @click="currentSlide(1)"></span>
      <span class="dot" @click="currentSlide(2)"></span>
      <span class="dot" @click="currentSlide(3)"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "CampaignDetailsCarousel",
})
export default class CampaignDetailsCarousel extends Vue {
  private plusSlides: any;
  private currentSlide: any;
  private showSlides: any;

  private mounted() {
    let slideIndex = 1;

    this.showSlides = (n: number) => {
      let i;
      let slides = document.getElementsByClassName(
        "mySlides"
      ) as HTMLCollectionOf<HTMLElement>;
      let dots = document.getElementsByClassName("dot") as HTMLCollectionOf<
        HTMLElement
      >;
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";

      dots[slideIndex - 1].className += " active";
    };

    this.showSlides(slideIndex);

    this.plusSlides = (n: number) => {
      this.showSlides((slideIndex += n));
    };

    this.currentSlide = (n: number) => {
      this.showSlides((slideIndex = n));
    };
  }
  // private slideIndex: number = 1;
  // // private self = this;
  // private showSlides(n: number) {
  //   let i;
  //   let slides = document.getElementsByClassName(
  //     "mySlides"
  //   ) as HTMLCollectionOf<HTMLElement>;
  //   let dots = document.getElementsByClassName("dot") as HTMLCollectionOf<
  //     HTMLElement
  //   >;
  //   if (n > slides.length) {
  //     this.slideIndex = 1;
  //   }
  //   if (n < 1) {
  //     this.slideIndex = slides.length;
  //   }
  //   for (i = 0; i < slides.length; i++) {
  //     slides[i].style.display = "none";
  //   }
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" active", "");
  //   }
  //   slides[this.slideIndex - 1].style.display = "block";
  //   dots[this.slideIndex - 1].className += " active";
  // }

  // this.showSlides(this.slideIndex);

  // private plusSlides(n: number) {
  //   this.showSlides(this.slideIndex += n);
  // }

  // private currentSlide(n) {
  //   this.showSlides(this.slideIndex = n);
  // }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
body {
  font-family: Verdana, sans-serif;
  margin: 0;
}
.mySlides {
  display: none;
}
img {
  vertical-align: middle;
}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active,
.dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .prev,
  .next,
  .text {
    font-size: 11px;
  }
}
</style>
