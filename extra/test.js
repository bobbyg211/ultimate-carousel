// General

// $(".uc").each(function (i) {
//   UC(this).init();
// });

const c1 = UC("#slider-1", {
  navigationDirection: "two-way",
  maxSlidesShown: 4,
  itemsPerSlide: 2,
});
c1.init();

// const c2 = UC("#slider-2", {
//   maxSlidesShown: 3,
//   itemsPerSlide: 2,
// });
// c2.init();

// =========================

// Featured content

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

// UC Code
const recentOther = UC(".featured-content-wrapper .posts.recent > .other", {
  itemsPerSlide: 2,
  navigationDirection: "one-way",
  mobileHideArrows: true,
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

// ======================

// Featured Partners & Offers

$(
  ".featured-partners-offers-wrapper .content-area .title-area .type-nav .type.partners"
).click(function () {
  $(
    ".featured-partners-offers-wrapper .content-area .title-area .type-nav .type"
  ).removeClass("active");
  $(this).addClass("active");
  $(".featured-partners-offers-wrapper .content-area").removeClass(
    "community offers"
  );
  $(".featured-partners-offers-wrapper .content-area").addClass("partners");
});

$(
  ".featured-partners-offers-wrapper .content-area .title-area .type-nav .type.community"
).click(function () {
  $(
    ".featured-partners-offers-wrapper .content-area .title-area .type-nav .type"
  ).removeClass("active");
  $(this).addClass("active");
  $(".featured-partners-offers-wrapper .content-area").removeClass(
    "partners offers"
  );
  $(".featured-partners-offers-wrapper .content-area").addClass("community");
});

$(
  ".featured-partners-offers-wrapper .content-area .title-area .type-nav .type.offers"
).click(function () {
  $(
    ".featured-partners-offers-wrapper .content-area .title-area .type-nav .type"
  ).removeClass("active");
  $(this).addClass("active");
  $(".featured-partners-offers-wrapper .content-area").removeClass(
    "partners community"
  );
  $(".featured-partners-offers-wrapper .content-area").addClass("offers");
});

// UC Code
const strategicPartners = UC(
  ".featured-partners-offers-wrapper .content-area .partners-offers-area .partners .items",
  { itemsPerSlide: 5, navigationDirection: "one-way" }
);
strategicPartners.init();

const communityPartners = UC(
  ".featured-partners-offers-wrapper .content-area .partners-offers-area .community .items",
  { itemsPerSlide: 5, navigationDirection: "one-way" }
);
communityPartners.init();

// const offers = UC(
//   ".featured-partners-offers-wrapper .content-area .partners-offers-area .offers .items",
//   { itemsPerSlide: 5, navigationDirection: "one-way" }
// );
// offers.init();

// UC Code
const podcastsBanner = UC(
  ".podcasts-home-banner-wrapper .slider-area .podcasts-list",
  { maxSlidesShown: 4, navigationDirection: "one-way", slideSpace: 80 }
);
podcastsBanner.init();
