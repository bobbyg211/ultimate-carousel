$(
  ".featured-content-wrapper .content-area .title-area .type-nav .type.recent"
).click(function () {
  $(
    ".featured-content-wrapper .content-area .title-area .type-nav .type"
  ).removeClass("active");
  $(this).addClass("active");
  $(".featured-content-wrapper .content-area").removeClass("watch listen read");
  $(".featured-content-wrapper .content-area").addClass("recent");
});

$(
  ".featured-content-wrapper .content-area .title-area .type-nav .type.watch"
).click(function () {
  $(
    ".featured-content-wrapper .content-area .title-area .type-nav .type"
  ).removeClass("active");
  $(this).addClass("active");
  $(".featured-content-wrapper .content-area").removeClass(
    "recent listen read"
  );
  $(".featured-content-wrapper .content-area").addClass("watch");
});

$(
  ".featured-content-wrapper .content-area .title-area .type-nav .type.listen"
).click(function () {
  $(
    ".featured-content-wrapper .content-area .title-area .type-nav .type"
  ).removeClass("active");
  $(this).addClass("active");
  $(".featured-content-wrapper .content-area").removeClass("recent watch read");
  $(".featured-content-wrapper .content-area").addClass("listen");
});

$(
  ".featured-content-wrapper .content-area .title-area .type-nav .type.read"
).click(function () {
  $(
    ".featured-content-wrapper .content-area .title-area .type-nav .type"
  ).removeClass("active");
  $(this).addClass("active");
  $(".featured-content-wrapper .content-area").removeClass(
    "recent watch listen"
  );
  $(".featured-content-wrapper .content-area").addClass("read");
});

// $(".uc").each(function (i) {
//   UC(this).init();
// });

const c1 = UC("#slider-1", {
  navigationDirection: "two-way",
  maxSlidesShown: 1,
});
c1.init();

// const c2 = UC("#slider-2", {
//   maxSlidesShown: 3,
//   itemsPerSlide: 2,
// });
// c2.init();

// UC Code
const recentOther = UC(".featured-content-wrapper .posts.recent > .other", {
  itemsPerSlide: 2,
  navigationDirection: "one-way",
  stopOnHover: false,
});
recentOther.init();

const watchOther = UC(".featured-content-wrapper .posts.watch > .other", {
  itemsPerSlide: 4,
  navigationDirection: "one-way",
});
watchOther.init();

const listenOther = UC(".featured-content-wrapper .posts.listen > .other", {
  itemsPerSlide: 4,
  navigationDirection: "one-way",
});
listenOther.init();

const readOther = UC(".featured-content-wrapper .posts.read > .other", {
  itemsPerSlide: 4,
  navigationDirection: "one-way",
});
readOther.init();
