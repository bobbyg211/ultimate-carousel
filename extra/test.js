// General

// $(".uc").each(function (i) {
//   UC(this).init();
// });

const c1 = UC("#slider-1", {
  navigationDirection: "two-way",
  maxSlidesShown: 3,
  itemsPerSlide: 2,
  showPerimeterSlides: "none",
  responsiveness: false,
});
c1.init();

// const c2 = UC("#slider-2", {
//   maxSlidesShown: 3,
//   itemsPerSlide: 2,
// });
// c2.init();

// =========================
// UC Code
// const podcastsBanner = UC(
//   ".podcasts-home-banner-wrapper .podcasts-list",
//   {
//     maxSlidesShown: 4,
//     navigationDirection: "one-way",
//     slideSpace: 60,
//   },
//   {
//     slideSpace: 40,
//     showPerimeterSlides: "both",
//     perimeterSlideVisibleAmount: 100,
//   }
// );
// podcastsBanner.init();
