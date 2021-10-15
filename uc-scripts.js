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
    itemsPerSlide: 1,
    mobileItemsPerSlide: 1,
    maxSlidesShown: 1,
    mobileSwipeToScroll: true,
    mobileHideArrows: false,
    navigationDirection: "two-way",
    showIndicatorDots: true,
    stopOnHover: true,
    slideSpace: 20,
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
        if (
          (typeof value === "number" && value >= 250) ||
          value === undefined
        ) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "number", [], 250, "infinity");
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
        if (
          (typeof value === "number" && value >= 500) ||
          value === undefined
        ) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "number", [], 500, "infinity");
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

      // Continuous Speed
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

      // itemsPerSlide
      if (key === "itemsPerSlide") {
        const numSlides = carousel.el.children().length;
        const maxSlides = optObj.maxSlidesShown || defaults.maxSlidesShown;

        if (
          (typeof value === "number" &&
            value > 0 &&
            value <= Math.ceil(numSlides / maxSlides - 1)) ||
          value === undefined
        ) {
          validOpts[key] = value;
        } else {
          errorHandler(
            option,
            "number",
            [],
            1,
            Math.ceil(numSlides / maxSlides - 1)
          );
        }
      }

      // mobileItemsPerSlide
      if (key === "mobileItemsPerSlide") {
        const numSlides = carousel.el.children().length;
        const maxSlides = optObj.maxSlidesShown || defaults.maxSlidesShown;

        if (
          (typeof value === "number" &&
            value > 0 &&
            value <= Math.ceil(numSlides / maxSlides - 1)) ||
          value === undefined
        ) {
          validOpts[key] = value;
        } else {
          errorHandler(
            option,
            "number",
            [],
            1,
            Math.ceil(numSlides / maxSlides - 1)
          );
        }
      }

      // maxSlidesShown
      if (key === "maxSlidesShown") {
        const numSlides = carousel.el.children().length;
        if (
          (typeof value === "number" &&
            value > 0 &&
            value <= numSlides - 1 &&
            value <= 5) ||
          value === undefined
        ) {
          validOpts[key] = value;
        } else {
          if (value > 5) {
            errorHandler(option, "number", [], 1, 5);
          } else {
            errorHandler(option, "number", [], 1, numSlides - 1);
          }
        }
      }

      // mobileSwipeToScroll
      if (key === "mobileSwipeToScroll") {
        if (typeof value === "boolean" || value === undefined) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "boolean");
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

      // Slide Space
      if (key === "slideSpace") {
        if ((typeof value === "number" && value > 0) || value === undefined) {
          validOpts[key] = value;
        } else {
          errorHandler(option, "number", [], 1, "infinity");
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
        if (optObj[key]) {
          requiredOpts["infiniteLoop"] = true;
        }
      }

      // Auto Slide Delay
      if (key === "autoSlideDelay") {
        // NONE
      }

      // Continuous Loop
      if (key === "continuousLoop") {
        if (optObj[key]) {
          requiredOpts["infiniteLoop"] = true;
          requiredOpts["showIndicatorDots"] = false;
          requiredOpts["mobileSwipeToScroll"] = false;
        }
      }

      // Continuous Speed
      if (key === "continuousSpeed") {
        if (optObj[key]) {
          requiredOpts["navigationDirection"] = "none";
        }
      }

      // Infinite Loop
      if (key === "infiniteLoop") {
        if (optObj[key] === false) {
          requiredOpts["navigationDirection"] = "two-way";
        }
      }

      // maxSlidesShown
      if (key === "maxSlidesShown") {
        // NONE
      }

      // Navigation Direction
      if (key === "navigationDirection") {
        if (optObj[key] === "none") {
          requiredOpts["autoSlide"] = true;
        }
      }

      // Show Indicator Dots
      if (key === "showIndicatorDots") {
        // NONE
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
      if (key === "maxSlidesShown") {
        let err;
        if (value > 5) {
          err = new Error(`${key} can not be greater than 5.`);
        } else {
          err = new Error(
            `${key} must be greater than 0 and less than the total number of slides (${
              max + 1
            }).`
          );
        }

        err.name = `Invalid Value '${key}: ${value}'`;
        throw err;
      } else if (key === "itemsPerSlide") {
        let err = new Error(
          `maxSlidesShown and the total number of slides limits this value. With current values, ${key} must be between ${min} and ${max}.`
        );
        err.name = `Invalid Value '${key}: ${value}'`;
        throw err;
      } else {
        let err = new Error(
          `${key} must be ${
            max !== "infinity" ? `between ${min} and ${max}` : `at least ${min}`
          }.`
        );
        err.name = `Invalid Value '${key}: ${value}'`;
        throw err;
      }
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
    const allClasses = carousel.el[0].className;
    carousel.el.addClass("uc--wrapper");
    const origSlides = carousel.el
      .find("> *")
      .map(function () {
        return $(this)[0].outerHTML;
      })
      .get();

    if (options.navigationDirection === "two-way") {
      carousel.el.css("margin", "0 50px");
    } else if (options.navigationDirection === "one-way") {
      carousel.el.css("margin", "0 50px 0 0");
    } else if (options.navigationDirection === "none") {
      carousel.el.css("margin", "0");
    }

    carousel.el.empty();
    carousel.el.append(`<div class="uc--scroll-area"></div>`);

    let numUsed = 0;
    let itemsPerSlide;
    if ($(window).width() > 767) {
      itemsPerSlide = options.itemsPerSlide;
    } else {
      itemsPerSlide = options.mobileItemsPerSlide;
    }
    for (let i = 1; i <= Math.ceil(origSlides.length / itemsPerSlide); i++) {
      carousel.el
        .find(".uc--scroll-area")
        .append(
          `<div class="uc--slide real ${
            i - 1 < options.maxSlidesShown ? "active" : ""
          }"><div class="uc--content ${allClasses}"></div></div>`
        );

      for (let j = numUsed; j < numUsed + itemsPerSlide; j++) {
        const currSlide = carousel.el.find(
          `.uc--slide:nth-child(${i}) .uc--content`
        );
        currSlide.append(origSlides[j]);
      }
      numUsed += itemsPerSlide;
    }

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
            .removeClass("active")
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
  }

  function carouselOptions() {
    carousel.scrollArea = carousel.el.find(".uc--scroll-area");
    carousel.allSlides = carousel.el.find(".uc--slide");
    carousel.afterSlides = carousel.el.find(".uc--slide.copy.after");
    carousel.beforeSlides = carousel.el.find(".uc--slide.copy.before");

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
    carousel.numVisibleBeforeChildren = carousel.el.find(
      ".uc--slide.before:visible"
    ).length;

    carousel.counter = 0;

    carousel.scrollDist = carousel.scrollWidth - carousel.clientWidth;
    carousel.startingPos =
      carousel.slideWidth * carousel.numVisibleBeforeChildren;
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

  function initPos(slidesShown) {
    carousel.scrollArea.scrollLeft(carousel.startingPos);
    carousel.dotActiveWidth = 8 * slidesShown + 8 * (slidesShown - 1);
    carousel.activeDots.width(carousel.dotActiveWidth);
    carousel.leadingDot.css("left", carousel.carouselIndicsWidth + "px");
    carousel.trailingDot.css("left", "0px");
  }

  function stopAnimations() {
    // HOVER OVER ELEMENT
    if (options.stopOnHover) {
      carousel.el.mouseenter(function () {
        if (options.continuousLoop) {
          carousel.scrollArea.stop(true);
        } else if (options.autoSlide) {
          clearInterval(carousel.scrollInterval);
        }
      });

      carousel.el.mouseleave(function () {
        if (options.continuousLoop) {
          infiniteScroll();
        } else if (options.autoSlide) {
          carousel.scrollInterval = setInterval(function () {
            scrollActions(true);
          }, carousel.speed + options.autoSlideDelay);
        }
      });
    }

    // DOCUMENT HIDDEN

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (options.continuousLoop) {
          carousel.scrollArea.stop(true);
        } else if (options.autoSlide) {
          clearInterval(carousel.scrollInterval);
        }
      } else {
        if (options.continuousLoop) {
          infiniteScroll();
        } else if (options.autoSlide) {
          carousel.scrollInterval = setInterval(function () {
            scrollActions(true);
          }, carousel.speed + options.autoSlideDelay);
        }
      }
    });

    // OUT OF VIEW

    let isScrolling;
    carousel.wasVis = false;

    ["scroll", "load", "resize"].forEach(function (e) {
      window.addEventListener(e, function () {
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(function () {
          carousel.position = carousel.el[0].getBoundingClientRect();
          carousel.visible =
            carousel.position.top >= -carousel.el.height() &&
            carousel.position.bottom <=
              window.innerHeight + carousel.el.height();

          if (options.continuousLoop) {
            if (!carousel.visible) {
              carousel.scrollArea.stop(true);
              carousel.wasVis = true;
            } else {
              if (carousel.wasVis) {
                infiniteScroll();
                carousel.wasVis = false;
              }
            }
          } else if (options.autoSlide) {
            if (!carousel.visible) {
              clearInterval(carousel.scrollInterval);
              carousel.wasVis = true;
            } else {
              if (carousel.wasVis) {
                carousel.scrollInterval = setInterval(function () {
                  scrollActions(true);
                }, carousel.speed + options.autoSlideDelay);
                carousel.wasVis = false;
              }
            }
          }
        }, 66);
      });
    });
  }

  function initActions() {
    if (!options.continuousLoop) {
      // Scroll on click
      carousel.arrows.click(function () {
        if ($(this).hasClass("uc--scroll-right")) {
          scrollActions(true);
        } else {
          scrollActions(false);
        }

        // Stop auto slide on arrow click
        if (options.autoSlide) {
          clearInterval(carousel.scrollInterval);
          carousel.scrollInterval = setInterval(function () {
            scrollActions(true);
          }, carousel.speed + options.autoSlideDelay);
        }
      });

      // Auto slide
      if (options.autoSlide) {
        carousel.scrollInterval = setInterval(function () {
          scrollActions(true);
        }, carousel.speed + options.autoSlideDelay);
      }

      // Mobile swipe to scroll
      if ($(window).width() <= 767 && options.mobileSwipeToScroll) {
        carousel.el[0].addEventListener(
          "touchstart",
          function (event) {
            touchstartX = event.changedTouches[0].screenX;
          },
          false
        );

        carousel.el[0].addEventListener(
          "touchend",
          function (event) {
            touchendX = event.changedTouches[0].screenX;
            handleGesture();
          },
          false
        );

        function handleGesture() {
          if (touchendX < touchstartX) {
            scrollActions(true);
          }

          if (touchendX > touchstartX) {
            scrollActions(false);
          }
        }
      }
    } else {
      infiniteScroll();
    }

    $(window).on("resize", function () {
      responsiveAdjust();
    });
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

              carousel.el.find(".uc--slide").each(function (i) {
                let elLeftPos = $(this).position().left;

                if (elLeftPos > 0 && elLeftPos < carousel.scrollArea.width()) {
                  $(this).addClass("active");
                } else {
                  $(this).removeClass("active");
                }
              });

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

  // Responsiveness

  function responsiveAdjust() {
    carousel.el
      .find(".uc--slide")
      .css("flex-basis", `${100 / options.maxSlidesShown}%`);

    carousel.el
      .find(".uc--content")
      .css("margin", `0 ${options.slideSpace / 2}px`);

    carousel.afterSlides.each(function (i) {
      $(this).show();
    });

    $(carousel.beforeSlides.get().reverse()).each(function (i) {
      $(this).show();
    });

    carouselOptions();
    initPos(options.maxSlidesShown);

    if ($(window).width() <= 767 && options.mobileHideArrows) {
      carousel.arrows.hide();
    } else {
      carousel.arrows.show();
    }

    // FOUR slides
    if ($(window).width() <= 1500 && options.maxSlidesShown > 4) {
      carousel.el.find(".uc--slide").css("flex-basis", `${100 / 4}%`);

      carousel.afterSlides.each(function (i) {
        if (i >= 4) {
          $(this).hide();
        }
      });

      $(carousel.beforeSlides.get().reverse()).each(function (i) {
        if (i >= 4) {
          $(this).hide();
        }
      });

      carouselOptions();
      initPos(4);
    }

    // THREE slides
    if ($(window).width() <= 1200 && options.maxSlidesShown > 3) {
      carousel.el.find(".uc--slide").css("flex-basis", `${100 / 3}%`);

      carousel.afterSlides.each(function (i) {
        if (i >= 3) {
          $(this).hide();
        }
      });

      $(carousel.beforeSlides.get().reverse()).each(function (i) {
        if (i >= 3) {
          $(this).hide();
        }
      });

      carouselOptions();
      initPos(3);
    }

    // TWO slides
    if ($(window).width() <= 1000 && options.maxSlidesShown > 2) {
      carousel.el.find(".uc--slide").css("flex-basis", `${100 / 2}%`);

      carousel.afterSlides.each(function (i) {
        if (i >= 2) {
          $(this).hide();
        }
      });

      $(carousel.beforeSlides.get().reverse()).each(function (i) {
        if (i >= 2) {
          $(this).hide();
        }
      });

      carouselOptions();
      initPos(2);
    }

    // ONE slide
    if ($(window).width() <= 767 && options.maxSlidesShown > 1) {
      carousel.el.find(".uc--slide").css("flex-basis", `${100 / 1}%`);

      carousel.afterSlides.each(function (i) {
        if (i >= 1) {
          $(this).hide();
        }
      });

      $(carousel.beforeSlides.get().reverse()).each(function (i) {
        if (i >= 1) {
          $(this).hide();
        }
      });

      carouselOptions();
      initPos(1);
    }
  }

  function respondToVisibility(element, callback) {
    var options = {
      root: document.documentElement,
    };

    var observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        callback(entry.intersectionRatio > 0);
      });
    }, options);

    observer.observe(element);
  }

  // Initialize

  function init() {
    let rendered = false;
    respondToVisibility(carousel.el[0], (visible) => {
      if (visible && !rendered) {
        createCarousel();
        carouselOptions();
        responsiveAdjust();
        initActions();
        stopAnimations();

        console.log(_);

        rendered = true;
      }
    });
  }

  return {
    init: init,
    options,
    carousel,
  };
};
