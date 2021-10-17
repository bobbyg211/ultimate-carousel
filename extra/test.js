// General

// $(".uc").each(function (i) {
//   UC(this).init();
// });

const c1 = UC("#slider-1", {
  navigationDirection: "two-way",
  maxSlidesShown: 3,
  itemsPerSlide: 2,
});
c1.init();

// const c2 = UC("#slider-2", {
//   maxSlidesShown: 3,
//   itemsPerSlide: 2,
// });
// c2.init();

// =========================
// UC Code
const sponsorSpots = UC(
  ".podcasts [class*='recent-episodes-wrapper'] .podcasts-list .podcast .posts-area .posts-list",
  {
    maxSlidesShown: 1,
    itemsPerSlide: 3,
    navigationDirection: "one-way",
  },
  {
    showPerimeterSlides: "right",
    maxSlidesShown: 1,
    hideArrows: true,
  }
);
sponsorSpots.init();
