if ($("div").hasClass("swiper-container")) {
  var swiper = new Swiper(".banner-featured", {
    speed: 1000,
    parallax: true,
    slidesPerView: 1.5,
    spaceBetween: 16,
    loop: true,
    navigation: {
      clickable: true,
      nextEl: ".button-lo-next",
      prevEl: ".button-lo-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1024: {
        slidesPerView: 2.2,
      }
    },
  });

  var swiper = new Swiper(".banner-promo", {
    autoplay: { delay: 5000 },
    speed: 1000,
    parallax: true,
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    navigation: {
      clickable: true,
      nextEl: ".button-lo-next",
      prevEl: ".button-lo-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    }
  });
}