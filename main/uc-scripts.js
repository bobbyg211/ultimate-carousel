const UC = function (element, options) {
  const validOpts = {
    ...options,

    animationSpeed: options.animationSpeed || 500, // milliseconds
    autoSlide:
      (options.autoSlide && !options.continuousLoop) ||
      options.navigationDirection === "none"
        ? true
        : false,
    autoSlideDelay: options.autoSlideDelay || 5000,
    continuousLoop: options.continuousLoop ? true : false,
    continuousSpeed: errorHandling("continuousSpeed", options.continuousSpeed), // scale 1-10
    infiniteLoop: errorHandling("infiniteLoop", options.infiniteLoop),
    maxSlidesShown: options.maxSlidesShown || 1,
    navigationDirection: errorHandling(
      "navigationDirection",
      options.navigationDirection
    ), // "two-way", "one-way", "none"
    showIndicatorDots:
      (options.showIndicatorDots === undefined || options.showIndicatorDots) &&
      !options.continuousLoop
        ? true
        : false,
    stopOnHover: options.stopOnHover || options.continuousLoop ? true : false,
  };

  function errorHandling(option, value) {
    // Continuous Speed
    if (option === "continuousSpeed") {
      if (
        (typeof value === "number" && value >= 1 && value <= 10) ||
        value === undefined
      ) {
        return value || 5;
      } else {
        let err = new Error(
          `continuousSpeed value must be a number from 1-10.`
        );
        err.name = `Invalid Value '${value}'`;
        throw err;
      }
    }

    // Infinite Loop
    if (option === "infiniteLoop") {
      if (
        options.infiniteLoop === undefined ||
        options.infiniteLoop ||
        options.continuousLoop ||
        options.autoSlide ||
        options.navigationDirection === "one-way" ||
        options.navigationDirection === "none"
      ) {
        if (options.infiniteLoop !== undefined) {
          if (options.continuousLoop) {
            console.warn(
              "Warning: Setting a value for infiniteLoop will have no effect because continuousLoop is set to TRUE."
            );
          }

          if (options.autoSlide) {
            console.warn(
              "Warning: Setting a value for infiniteLoop will have no effect because autoSlide is set to TRUE."
            );
          }

          if (options.navigationDirection === "one-way") {
            console.warn(
              "Warning: Setting a value for infiniteLoop will have no effect because navigationDirection is set to 'one-way'."
            );
          }

          if (options.navigationDirection === "none") {
            console.warn(
              "Warning: Setting a value for infiniteLoop will have no effect because navigationDirection is set to 'none'."
            );
          }
        }

        return true;
      } else {
        return false;
      }
    }

    // Navigation Direction
    if (option === "navigationDirection") {
      if (
        (typeof options.navigationDirection === "string" &&
          (options.navigationDirection === "two-way" ||
            options.navigationDirection === "one-way" ||
            options.navigationDirection === "none")) ||
        options.navigationDirection === undefined
      ) {
        if (
          options.continuousLoop &&
          options.navigationDirection !== undefined
        ) {
          console.warn(
            "Warning: Setting a value for navigationDirection will have no effect here because continuousLoop is set to TRUE."
          );
        }

        return options.navigationDirection || "two-way";
      } else {
        let err = new Error(
          `navigationDirection value must be "two-way", "one-way", or "none".`
        );
        err.name = `Invalid Value '${value}'`;
        throw err;
      }
    }
  }

  function restructureHTML() {
    console.log(validOpts);

    let slider = {};

    // Adjust main wrappers
    slider.el = $(element);

    slider.el.addClass("uc--wrapper");
    let html = slider.el.html();
    slider.el.empty();
    slider.el.append("<div class='uc--scroll-area'>" + html + "</div>");
    slider.el.find(".uc--scroll-area > *").addClass("uc--slide real");

    // Wrap all content in "Content" DIV
    let slides = slider.el.find(".uc--slide");
    $(slides).each(function () {
      let html = $(this).html();
      $(this).empty();
      $(this).append("<div class='uc--content'>" + html + "</div>");
    });

    // Add slide copies
    if (validOpts.infiniteLoop) {
      slider.firstSlides = slider.el.find(
        ".uc--slide:nth-child(-n+" + validOpts.maxSlidesShown + ")"
      );
      slider.lastSlides = slider.el.find(
        ".uc--slide:nth-last-child(-n+" + validOpts.maxSlidesShown + ")"
      );

      if (!validOpts.continuousLoop) {
        slider.el
          .find(".uc--scroll-area")
          .prepend(
            slider.lastSlides
              .clone()
              .removeClass("real")
              .addClass("copy before")
          );
      }

      slider.el
        .find(".uc--scroll-area")
        .append(
          slider.firstSlides.clone().removeClass("real").addClass("copy after")
        );
    }

    // Add arrows and dots
    if (!validOpts.continuousLoop) {
      let indicators = `
    <div class="uc--indicators">
      
      ${
        validOpts.navigationDirection === "two-way"
          ? `<button class="uc--scroll-left uc--arrow">
      <img
        src="https://www.enrollify.org/hubfs/Empower/images/icons/grey-arrow-left.svg"
        alt="Scroll Left"
      />
    </button>`
          : ""
      }
      ${
        validOpts.navigationDirection !== "none"
          ? `<button class="uc--scroll-right uc--arrow">
        <img
          src="https://www.enrollify.org/hubfs/Empower/images/icons/grey-arrow-right.svg"
          alt="Scroll Right"
        />
      </button>`
          : ""
      }
      
      ${
        validOpts.showIndicatorDots
          ? `<div class="uc--slider-indics">
      <span class="uc--dot active trailing"></span>
      <span class="uc--dot active leading"></span>
    </div>`
          : ""
      }
      
    </div>
    `;

      slider.el.append(indicators);

      for (let i = 0; i < slider.el.find(".uc--slide.real").length; i++) {
        slider.el
          .find(".uc--slider-indics")
          .append("<span class='uc--dot'></span>");
      }
    }
  }

  function applyLayout() {
    let slider = {};

    slider.el = $(element);

    if (validOpts.maxSlidesShown) {
      slider.el
        .find(".uc--slide")
        .css("flex-basis", `${100 / validOpts.maxSlidesShown}%`);
    }
  }

  function initVars() {
    const slider = {};

    // GLOBAL variables
    slider.el = $(element);

    slider.scrollArea = slider.el.find(".uc--scroll-area");

    slider.arrows = slider.el.find(".uc--arrow");
    slider.rightArrow = slider.el.find(".uc--scroll-right");
    slider.leftArrow = slider.el.find(".uc--scroll-left");

    slider.sliderIndicsWidth = slider.el.find(".uc--slider-indics").width();
    slider.activeDots = slider.el.find(".uc--dot.active");
    slider.leadingDot = slider.el.find(".uc--dot.active.leading");
    slider.trailingDot = slider.el.find(".uc--dot.active.trailing");

    slider.scrollWidth = slider.el.find(".uc--scroll-area")[0].scrollWidth;
    slider.clientWidth = slider.el.find(".uc--scroll-area")[0].clientWidth;
    slider.slideWidth = slider.el.find(".uc--slide.real").outerWidth();
    slider.numChildren = slider.el.find(".uc--slide").length;
    slider.numRealChildren = slider.el.find(".uc--slide.real").length;
    slider.numBeforeChildren = slider.el.find(".uc--slide.before").length;

    slider.counter = 0;

    // RESPONSIVE variables
    slider.scrollDist = slider.scrollWidth - slider.clientWidth;
    slider.startingPos = slider.slideWidth * slider.numBeforeChildren;
    slider.endingPos = slider.scrollDist - slider.slideWidth;
    slider.dotActiveWidth =
      8 * validOpts.maxSlidesShown + 8 * (validOpts.maxSlidesShown - 1);

    // DEPENDANT variables
    slider.max = validOpts.infiniteLoop
      ? slider.numRealChildren
      : slider.numRealChildren - validOpts.maxSlidesShown;
    slider.indicEndpoint = 8 * slider.max + 8 * 3;
    slider.speed = validOpts.animationSpeed;
    slider.halfspeed = slider.speed / 2;

    return slider;
  }

  function scrollActions(slider, direction) {
    if (
      validOpts.infiniteLoop ||
      (!validOpts.infiniteLoop &&
        ((direction && slider.counter !== slider.max) ||
          (!direction && slider.counter !== 0)))
    ) {
      slider.rightArrow.css("pointer-events", "none");
      slider.leftArrow.css("pointer-events", "none");

      let edge, pos, reset;

      if (direction) {
        edge = slider.max;
        reset = 0;
        pos = slider.startingPos;
      } else {
        edge = 0;
        reset = slider.max;
        pos = slider.endingPos;
      }

      slider.scrollArea.animate(
        {
          scrollLeft: `${direction ? "+" : "-"}=${slider.slideWidth}`,
        },
        slider.speed
      );

      slider.activeDots
        .animate(
          {
            width: slider.dotActiveWidth + 16,
            marginLeft: `${direction ? "+=0px" : "-=16px"}`,
          },
          slider.halfspeed
        )
        .promise()
        .then(function () {
          slider.activeDots
            .animate(
              {
                width: slider.dotActiveWidth,
                left: `${direction ? "+=16px" : "-=0"}`,
              },
              slider.halfspeed
            )
            .promise()
            .then(function () {
              if (direction && slider.counter !== slider.max) {
                slider.counter++;
              }

              if (!direction) {
                slider.activeDots.css("margin-left", "5px");
                const leadLeftPos = parseInt(
                    $(slider.leadingDot).css("left"),
                    10
                  ),
                  trailLeftPos = parseInt(
                    $(slider.trailingDot).css("left"),
                    10
                  );
                slider.leadingDot.css("left", leadLeftPos - 16 + "px");
                slider.trailingDot.css("left", trailLeftPos - 16 + "px");
              }

              if (slider.counter === edge && validOpts.infiniteLoop) {
                slider.scrollArea.scrollLeft(pos);
                slider.counter = reset;
              }

              slider.activeDots.each(function () {
                if (
                  parseInt($(this).css("left"), 10) ===
                  slider.sliderIndicsWidth + 16
                ) {
                  $(this).css(
                    "left",
                    "-" + (slider.sliderIndicsWidth - 16) + "px"
                  );
                } else if (
                  parseInt($(this).css("left"), 10) ===
                  -slider.sliderIndicsWidth
                ) {
                  $(this).css("left", slider.sliderIndicsWidth + "px");
                }
              });

              if (!direction && slider.counter !== 0) {
                slider.counter--;
              }

              slider.rightArrow.css("pointer-events", "auto");
              slider.leftArrow.css("pointer-events", "auto");
            });
        });
    }
  }

  function infiniteScroll(slider) {
    let speed =
      ((slider.scrollDist - slider.scrollArea.scrollLeft()) /
        (slider.slideWidth * validOpts.maxSlidesShown)) *
      1000 *
      (11 - validOpts.continuousSpeed);

    slider.scrollArea.animate(
      {
        scrollLeft: slider.scrollDist,
      },
      speed,
      "linear",
      function () {
        slider.scrollArea.scrollLeft(0);
        infiniteScroll(slider);
      }
    );
  }

  function initIndics(slider) {
    if (!validOpts.continuousLoop) {
      // Initial positioning
      slider.scrollArea.scrollLeft(slider.startingPos);
      slider.activeDots.width(slider.dotActiveWidth);
      slider.leadingDot.css("left", slider.sliderIndicsWidth + "px");

      // Scroll on click
      slider.arrows.click(function () {
        if ($(this).hasClass("uc--scroll-right")) {
          scrollActions(slider, true);
        } else {
          scrollActions(slider, false);
        }

        // Stop auto slide on arrow click
        if (validOpts.autoSlide) {
          clearInterval(scrollInterval);
          scrollInterval = setInterval(function () {
            scrollActions(slider, true);
          }, validOpts.autoSlideDelay);
        }
      });

      // Auto slide
      let scrollInterval;
      if (validOpts.autoSlide) {
        scrollInterval = setInterval(function () {
          scrollActions(slider, true);
        }, validOpts.autoSlideDelay);
      }

      // Stop auto slide on hover
      if (validOpts.autoSlide && validOpts.stopOnHover) {
        slider.el.mouseover(function () {
          clearInterval(scrollInterval);
        });

        slider.el.mouseleave(function () {
          scrollInterval = setInterval(function () {
            scrollActions(slider, true);
          }, validOpts.autoSlideDelay);
        });
      }
    } else {
      infiniteScroll(slider);

      if (validOpts.stopOnHover) {
        slider.el.mouseenter(function () {
          slider.scrollArea.stop(true);
        });

        slider.el.mouseleave(function () {
          infiniteScroll(slider);
        });
      }
    }
  }

  function init() {
    restructureHTML();
    applyLayout();
    let slider = initVars();
    initIndics(slider);
  }

  return {
    init: init,
  };
};

const firstUC = new UC("#slider-1", {
  infiniteLoop: false,
  maxSlidesShown: 1,
  navigationDirection: "one-way",
  continuousLoop: true,
  continuousSpeed: 4,
});
firstUC.init();

const secondUC = new UC("#slider-2", {
  maxSlidesShown: 3,
});
secondUC.init();
