// $(".uc").each(function (i) {
//   UC(this).init();
// });

const c1 = UC("#slider-1", {
  navigationDirection: "two-way",
  slideSpace: 40,
});
c1.init();

// const c2 = UC("#slider-2", {
//   maxSlidesShown: 3,
//   itemsPerSlide: 2,
// });
// c2.init();

const watchRecent = UC(".featured-content-wrapper .posts.watch .other", {
  itemsPerSlide: 4,
  navigationDirection: "one-way",
  slideSpace: 100,
});
watchRecent.init();
