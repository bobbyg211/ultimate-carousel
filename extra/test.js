// General

// $(".uc").each(function (i) {
//   UC(this).init();
// });

const c1 = UC(
  "#slider-1",
  {
    navigationDirection: "two-way",
    maxSlidesShown: 3,
    itemsPerSlide: 2,
  },
  {
    itemsPerSlide: 2,
    maxSlidesShown: 2,
    responsiveness: false,
  }
);
c1.init();

// const c2 = UC("#slider-2", {
//   maxSlidesShown: 3,
//   itemsPerSlide: 2,
// });
// c2.init();

// =========================
// UC Code
// UC Code
const recentOther = UC(
  ".featured-content-wrapper .posts.recent > .other",
  {
    navigationDirection: "one-way",
    itemsPerSlide: 2,
  },
  {
    hideArrows: true,
    itemsPerSlide: 1,
    showPerimeterSlides: "right",
    perimeterSlideVisibleAmount: 200,
  }
);
recentOther.init();

const watchOther = UC(
  ".featured-content-wrapper .posts.watch > .other",
  {
    itemsPerSlide: 4,
    navigationDirection: "one-way",
    slideSpace: 60,
  },
  {
    hideArrows: true,
    itemsPerSlide: 1,
    showPerimeterSlides: "right",
    perimeterSlideVisibleAmount: 200,
    slideSpace: 25,
  }
);
watchOther.init();

const listenOther = UC(
  ".featured-content-wrapper .posts.listen > .other",
  {
    navigationDirection: "one-way",
    itemsPerSlide: 4,
  },
  {
    hideArrows: true,
    itemsPerSlide: 1,
    showPerimeterSlides: "right",
    perimeterSlideVisibleAmount: 200,
  }
);
listenOther.init();

const readOther = UC(
  ".featured-content-wrapper .posts.read > .other",
  {
    navigationDirection: "one-way",
    itemsPerSlide: 4,
  },
  {
    hideArrows: true,
    itemsPerSlide: 1,
    showPerimeterSlides: "right",
    perimeterSlideVisibleAmount: 200,
  }
);
readOther.init();
