const UC = (element, settings) => {
  // GLOBAL variables
  settings = settings || {};
  const _this = this;
  _this._ = {};
  const { _ } = _this;
  _.carousel = {};
  const { carousel } = _;
  carousel.el = $(element);

  // Options setup & validation

  defaults = {
    animationSpeed: 500,
    autoSlide: false,
    autoSlideDelay: 3000,
    continuousLoop: false,
    continuousSpeed: 5,
    infiniteLoop: true,
    maxSlidesShown: 1,
    navigationDirection: "two-way",
    showIndicatorDots: true,
    stopOnHover: true,
  };

  validated = optValidation(settings);
  required = optRequirements(validated);

  _.options = {
    ...defaults,
    ...validated,
    ...required,
  };

  const { options } = _;

  function optValidation(optObj) {
    let validOpts = {};

    Object.entries(optObj).forEach((option) => {
      let [key, value] = option;

      // Animation Speed
      if (key === "animationSpeed") {
        if ((typeof value === "number" && value > 0) || value === undefined) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "number", [], 1, "infinity");
        }
      }

      // Auto Slide
      if (key === "autoSlide") {
        if (typeof value === "boolean" || value === undefined) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "boolean");
        }
      }

      // Auto Slide Delay
      if (key === "autoSlideDelay") {
        if ((typeof value === "number" && value > 0) || value === undefined) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "number", [], 1, "infinity");
        }
      }

      // Continuous Loop
      if (key === "continuousLoop") {
        if (typeof value === "boolean" || value === undefined) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "boolean");
        }
      }

      // Continuous Speed -- FIX
      if (key === "continuousSpeed") {
        if ((typeof value === "number" && value > 0) || value === undefined) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "number", [], 1, 10);
        }
      }

      // Infinite Loop
      if (key === "infiniteLoop") {
        if (typeof value === "boolean" || value === undefined) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "boolean");
        }
      }

      // maxSlidesShown
      if (key === "maxSlidesShown") {
        if ((typeof value === "number" && value > 0) || value === undefined) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "number", [], 1, "infinity");
        }
      }

      // Navigation Direction
      if (key === "navigationDirection") {
        if (
          value === undefined ||
          (typeof value === "string" &&
            (value === "two-way" || value === "one-way" || value === "none"))
        ) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "string", ["two-way", "one-way", "none"]);
        }
      }

      // Show Indicator Dots
      if (key === "showIndicatorDots") {
        if (typeof value === "boolean" || value === undefined) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "boolean");
        }
      }

      // Stop On Hover
      if (key === "stopOnHover") {
        if (typeof value === "boolean" || value === undefined) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "boolean");
        }
      }
    });

    return validOpts;
  }

  function optRequirements(optObj) {
    let requiredOpts = {};

    Object.entries(optObj).forEach((option) => {
      let [key, value] = option;

      // Animation Speed
      if (key === "animationSpeed") {
        // NONE
      }

      // Auto Slide
      if (key === "autoSlide") {
        if (optObj.navigationDirection === "none") {
          requiredOpts[key] = true;
        }
      }

      // Auto Slide Delay
      if (key === "autoSlideDelay") {
        // NONE
      }

      // Continuous Loop
      if (key === "continuousLoop") {
        // NONE
      }

      // Continuous Speed
      if (key === "continuousSpeed") {
        // NONE
      }

      // Infinite Loop
      if (key === "infiniteLoop") {
        if (optObj.autoSlide || optObj.continuousLoop) {
          requiredOpts[key] = true;
        }
      }

      // maxSlidesShown
      if (key === "maxSlidesShown") {
        // NONE
      }

      // Navigation Direction
      if (key === "navigationDirection") {
        if (optObj.continuousLoop) {
          requiredOpts[key] = "none";
        } else if (optObj.infiniteLoop === false) {
          requiredOpts[key] = "two-way";
        }
      }

      // Show Indicator Dots
      if (key === "showIndicatorDots") {
        if (optObj.continuousLoop) {
          requiredOpts[key] = false;
        }
      }

      // Stop On Hover
      if (key === "stopOnHover") {
        // NONE
      }
    });

    return requiredOpts;
  }

  function errorHandler(option, type, array, min, max) {
    let [key, value] = option;
    array = array || [];

    // WRONG TYPE
    if (typeof value !== type) {
      let err = new Error(`${key} value must be of type '${type}'.`);
      err.name = `Invalid Type '${typeof value}'`;
      throw err;
    }

    // BAD VALUE 'number'
    if (value < min || value > max) {
      let err = new Error(
        `${key} must be ${
          max !== "infinity" ? `between ${min} and ${max}` : `at least ${min}`
        }.`
      );
      err.name = `Invalid Value '${key}: ${value}'`;
      throw err;
    }

    // BAD VALUE 'string'
    if (!array.includes(value)) {
      let err = new Error(
        `${key} must be one of the following values: '${array}'.`
      );
      err.name = `Invalid Value '${key}: ${value}'`;
      throw err;
    }
  }

  // Create Carousel

  function createCarousel() {
    carousel.el.addClass("uc--wrapper");
    let html = carousel.el.html();
    carousel.el.empty();
    carousel.el.append("<div class='uc--scroll-area'>" + html + "</div>");
    carousel.el.find(".uc--scroll-area > *").addClass("uc--slide real");

    // Wrap all content in "Content" DIV
    let slides = carousel.el.find(".uc--slide");
    $(slides).each(function () {
      let html = $(this).html();
      $(this).empty();
      $(this).append("<div class='uc--content'>" + html + "</div>");
    });

    // Add slide copies
    if (options.infiniteLoop) {
      carousel.firstSlides = carousel.el.find(
        ".uc--slide:nth-child(-n+" + options.maxSlidesShown + ")"
      );
      carousel.lastSlides = carousel.el.find(
        ".uc--slide:nth-last-child(-n+" + options.maxSlidesShown + ")"
      );

      if (!options.continuousLoop) {
        carousel.el
          .find(".uc--scroll-area")
          .prepend(
            carousel.lastSlides
              .clone()
              .removeClass("real")
              .addClass("copy before")
          );
      }

      carousel.el
        .find(".uc--scroll-area")
        .append(
          carousel.firstSlides
            .clone()
            .removeClass("real")
            .addClass("copy after")
        );
    }

    // Add arrows and dots
    if (!options.continuousLoop) {
      let indicators = `
    <div class="uc--indicators">
      
      ${
        options.navigationDirection === "two-way"
          ? `<button class="uc--scroll-left uc--arrow">
      <img
        src="https://www.enrollify.org/hubfs/Empower/images/icons/grey-arrow-left.svg"
        alt="Scroll Left"
      />
    </button>`
          : ""
      }
      ${
        options.navigationDirection !== "none"
          ? `<button class="uc--scroll-right uc--arrow">
        <img
          src="https://www.enrollify.org/hubfs/Empower/images/icons/grey-arrow-right.svg"
          alt="Scroll Right"
        />
      </button>`
          : ""
      }
      
      ${
        options.showIndicatorDots
          ? `<div class="uc--dots">
      <span class="uc--dot active trailing"></span>
      <span class="uc--dot active leading"></span>
    </div>`
          : ""
      }
      
    </div>
    `;

      carousel.el.append(indicators);

      for (let i = 0; i < carousel.el.find(".uc--slide.real").length; i++) {
        carousel.el.find(".uc--dots").append("<span class='uc--dot'></span>");
      }
    }

    if (options.maxSlidesShown) {
      carousel.el
        .find(".uc--slide")
        .css("flex-basis", `${100 / options.maxSlidesShown}%`);
    }

    carousel.scrollArea = carousel.el.find(".uc--scroll-area");

    carousel.arrows = carousel.el.find(".uc--arrow");
    carousel.rightArrow = carousel.el.find(".uc--scroll-right");
    carousel.leftArrow = carousel.el.find(".uc--scroll-left");

    carousel.carouselIndicsWidth = carousel.el.find(".uc--dots").width();
    carousel.activeDots = carousel.el.find(".uc--dot.active");
    carousel.leadingDot = carousel.el.find(".uc--dot.active.leading");
    carousel.trailingDot = carousel.el.find(".uc--dot.active.trailing");

    carousel.scrollWidth = carousel.el.find(".uc--scroll-area")[0].scrollWidth;
    carousel.clientWidth = carousel.el.find(".uc--scroll-area")[0].clientWidth;
    carousel.slideWidth = carousel.el.find(".uc--slide.real").outerWidth();
    carousel.numChildren = carousel.el.find(".uc--slide").length;
    carousel.numRealChildren = carousel.el.find(".uc--slide.real").length;
    carousel.numBeforeChildren = carousel.el.find(".uc--slide.before").length;

    carousel.counter = 0;

    carousel.scrollDist = carousel.scrollWidth - carousel.clientWidth;
    carousel.startingPos = carousel.slideWidth * carousel.numBeforeChildren;
    carousel.endingPos = carousel.scrollDist - carousel.slideWidth;
    carousel.dotActiveWidth =
      8 * options.maxSlidesShown + 8 * (options.maxSlidesShown - 1);

    carousel.max = options.infiniteLoop
      ? carousel.numRealChildren
      : carousel.numRealChildren - options.maxSlidesShown;
    carousel.indicEndpoint = 8 * carousel.max + 8 * 3;
    carousel.speed = options.animationSpeed;
    carousel.halfSpeed = carousel.speed / 2;
  }

  function initActions() {
    if (!options.continuousLoop) {
      // Initial positioning
      carousel.scrollArea.scrollLeft(carousel.startingPos);
      carousel.activeDots.width(carousel.dotActiveWidth);
      carousel.leadingDot.css("left", carousel.carouselIndicsWidth + "px");

      // Scroll on click
      carousel.arrows.click(function () {
        if ($(this).hasClass("uc--scroll-right")) {
          scrollActions(true);
        } else {
          scrollActions(false);
        }

        // Stop auto slide on arrow click
        if (options.autoSlide) {
          clearInterval(scrollInterval);
          scrollInterval = setInterval(function () {
            scrollActions(true);
          }, options.autoSlideDelay);
        }
      });

      // Auto slide
      let scrollInterval;
      if (options.autoSlide) {
        scrollInterval = setInterval(function () {
          scrollActions(true);
        }, options.autoSlideDelay);
      }

      // Stop auto slide on hover
      if (options.autoSlide && options.stopOnHover) {
        carousel.el.mouseover(function () {
          clearInterval(scrollInterval);
        });

        carousel.el.mouseleave(function () {
          scrollInterval = setInterval(function () {
            scrollActions(true);
          }, options.autoSlideDelay);
        });
      }
    } else {
      infiniteScroll();

      if (options.stopOnHover) {
        carousel.el.mouseenter(function () {
          carousel.scrollArea.stop(true);
        });

        carousel.el.mouseleave(function () {
          infiniteScroll();
        });
      }
    }
  }

  // Scroll Functions

  function scrollActions(direction) {
    if (
      options.infiniteLoop ||
      (!options.infiniteLoop &&
        ((direction && carousel.counter !== carousel.max) ||
          (!direction && carousel.counter !== 0)))
    ) {
      carousel.rightArrow.css("pointer-events", "none");
      carousel.leftArrow.css("pointer-events", "none");

      let edge, pos, reset;

      if (direction) {
        edge = carousel.max;
        reset = 0;
        pos = carousel.startingPos;
      } else {
        edge = 0;
        reset = carousel.max;
        pos = carousel.endingPos;
      }

      carousel.scrollArea.animate(
        {
          scrollLeft: `${direction ? "+" : "-"}=${carousel.slideWidth}`,
        },
        carousel.speed
      );

      console.log(carousel.halfSpeed);

      carousel.activeDots
        .animate(
          {
            width: carousel.dotActiveWidth + 16,
            marginLeft: `${direction ? "+=0px" : "-=16px"}`,
          },
          carousel.halfSpeed
        )
        .promise()
        .then(function () {
          carousel.activeDots
            .animate(
              {
                width: carousel.dotActiveWidth,
                left: `${direction ? "+=16px" : "-=0"}`,
              },
              carousel.halfSpeed
            )
            .promise()
            .then(function () {
              if (direction && carousel.counter !== carousel.max) {
                carousel.counter++;
              }

              if (!direction) {
                carousel.activeDots.css("margin-left", "5px");
                const leadLeftPos = parseInt(
                    $(carousel.leadingDot).css("left"),
                    10
                  ),
                  trailLeftPos = parseInt(
                    $(carousel.trailingDot).css("left"),
                    10
                  );
                carousel.leadingDot.css("left", leadLeftPos - 16 + "px");
                carousel.trailingDot.css("left", trailLeftPos - 16 + "px");
              }

              if (carousel.counter === edge && options.infiniteLoop) {
                carousel.scrollArea.scrollLeft(pos);
                carousel.counter = reset;
              }

              carousel.activeDots.each(function () {
                if (
                  parseInt($(this).css("left"), 10) ===
                  carousel.carouselIndicsWidth + 16
                ) {
                  $(this).css(
                    "left",
                    "-" + (carousel.carouselIndicsWidth - 16) + "px"
                  );
                } else if (
                  parseInt($(this).css("left"), 10) ===
                  -carousel.carouselIndicsWidth
                ) {
                  $(this).css("left", carousel.carouselIndicsWidth + "px");
                }
              });

              if (!direction && carousel.counter !== 0) {
                carousel.counter--;
              }

              carousel.rightArrow.css("pointer-events", "auto");
              carousel.leftArrow.css("pointer-events", "auto");
            });
        });
    }
  }

  function infiniteScroll() {
    let speed =
      ((carousel.scrollDist - carousel.scrollArea.scrollLeft()) /
        (carousel.slideWidth * options.maxSlidesShown)) *
      1000 *
      (11 - options.continuousSpeed);

    carousel.scrollArea.animate(
      {
        scrollLeft: carousel.scrollDist,
      },
      speed,
      "linear",
      function () {
        carousel.scrollArea.scrollLeft(0);
        infiniteScroll(carousel);
      }
    );
  }

  // Initialize

  function init() {
    createCarousel();
    initActions();

    console.log(_);
  }

  return {
    init: init,
  };
};

const c1 = UC("#slider-1");
c1.init();
