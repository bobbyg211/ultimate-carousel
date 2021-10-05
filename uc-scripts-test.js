const UC = (element, options) => {
  const _ = this;

  _.defaults = {
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

  _.options = optValidation(options);

  function warningHandler(option, noEffectKeys, requiredKeys) {
    let [key, value] = option;
    noEffectKeys = noEffectKeys || [];
    requiredKeys = requiredKeys || [];

    if (value !== undefined) {
      // NO EFFECT
      noEffectKeys.forEach((neKey) => {
        if (options[neKey]) {
          console.warn(
            `Redundant Declaration '${key}: ${value}': ${key} will have no effect because ${neKey} is set to '${options[neKey]}'.`
          );
        }
      });

      // REQUIRED
      requiredKeys.forEach((rKey) => {
        if (options[rKey]) {
          console.warn(
            `Redundant Declaration '${key}: ${value}': ${key} TRUE is required because ${rKey} is set to '${options[rKey]}'.`
          );
        }
      });
    }
  }

  function errorHandler(option, type, min, max) {
    let [key, value] = option;

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
  }

  function optValidation(options) {
    let validOpts = {};

    Object.entries(options).forEach((option) => {
      let [key, value] = option;

      // Animation Speed
      if (key === "animationSpeed") {
        if ((typeof value === "number" && value > 0) || value === undefined) {
          warningHandler(option, ["continuousLoop"], []);
          validOpts[key] = value;
        } else {
          errorHandler(option, "number", 1, "infinity");
        }
      }

      // Auto Slide
      if (key === "autoSlide") {
        if (typeof value === "boolean" || value === undefined) {
          warningHandler(option, ["continuousLoop"], []);
          validOpts[key] = value;
        } else {
          errorHandler(option, "boolean");
        }
      }

      // Auto Slide Delay
      if (key === "autoSlideDelay") {
        if ((typeof value === "number" && value > 0) || value === undefined) {
          warningHandler(option, ["continuousLoop"], []);
          validOpts[key] = value;
        } else {
          errorHandler(option, "number", 1, "infinity");
        }
      }

      // Continuous Loop
      if (key === "continuousLoop") {
        if (typeof value === "boolean" || value === undefined) {
          warningHandler(option, [], []);
          validOpts[key] = value;
        } else {
          errorHandler(option, "boolean");
        }
      }

      // Continuous Speed -- FIX
      if (key === "continuousSpeed") {
        if ((typeof value === "number" && value > 0) || value === undefined) {
          warningHandler(option, ["continuousLoop"], []);
          validOpts[key] = value;
        } else {
          errorHandler(option, "number", 1, 10);
        }
      }

      // Infinite Loop
      if (key === "infiniteLoop") {
        if (typeof value === "boolean" || value === undefined) {
          warningHandler(option, [], ["autoSlide", "continuousLoop"]);
          validOpts[key] = value;
        } else {
          errorHandler(option, "boolean");
        }
      }

      // maxSlidesShown
      if (key === "maxSlidesShown") {
        if ((typeof value === "number" && value > 0) || value === undefined) {
          warningHandler(option, [], []);
          validOpts[key] = value;
        } else {
          errorHandler(option, "number", 1, "infinity");
        }
      }

      // Navigation Direction -- FIX
      if (key === "navigationDirection") {
        if (
          options.navigationDirection === undefined ||
          (typeof options.navigationDirection === "string" &&
            (options.navigationDirection === "two-way" ||
              options.navigationDirection === "one-way" ||
              options.navigationDirection === "none"))
        ) {
          if (options.navigationDirection !== undefined) {
            if (options.infiniteLoop) {
              console.warn(
                `Redundant Declaration '${value}': navigationDirection 'two-way' is required because infiniteLoop is set to FALSE.`
              );
              return "two-way";
            }
            if (options.continuousLoop) {
              console.warn(
                `Redundant Declaration '${value}': navigationDirection 'none' is required because continuousLoop is set to TRUE.`
              );
              return "none";
            }
          }

          return options.navigationDirection || "two-way";
        } else {
          // Errors
          if (typeof value !== "string") {
            let err = new Error(
              `navigationDirection value must be of type 'string'.`
            );
            err.name = `Invalid Type '${typeof value}'`;
            throw err;
          } else {
            let err = new Error(
              `navigationDirection must be 'two-way', 'one-way', or 'none'.`
            );
            err.name = `Invalid Value '${value}'`;
            throw err;
          }
        }
      }

      // Show Indicator Dots -- FIX
      if (key === "showIndicatorDots") {
        if (typeof value === "boolean" || value === undefined) {
          warningHandler(option, [], ["continuousLoop"]);
          validOpts[key] = value;
        } else {
          errorHandler(option, "boolean");
        }
      }

      // Stop On Hover
      if (key === "stopOnHover") {
        if (typeof value === "boolean" || value === undefined) {
          warningHandler(option, [], []);
          validOpts[key] = value;
        } else {
          errorHandler(option, "boolean");
        }
      }
    });

    return validOpts;
  }

  options = {
    ..._.defaults,
    ..._.options,
  };

  function restructureHTML() {
    console.log(options);

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
    if (options.infiniteLoop) {
      slider.firstSlides = slider.el.find(
        ".uc--slide:nth-child(-n+" + options.maxSlidesShown + ")"
      );
      slider.lastSlides = slider.el.find(
        ".uc--slide:nth-last-child(-n+" + options.maxSlidesShown + ")"
      );

      if (!options.continuousLoop) {
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

    if (options.maxSlidesShown) {
      slider.el
        .find(".uc--slide")
        .css("flex-basis", `${100 / options.maxSlidesShown}%`);
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
      8 * options.maxSlidesShown + 8 * (options.maxSlidesShown - 1);

    // DEPENDANT variables
    slider.max = options.infiniteLoop
      ? slider.numRealChildren
      : slider.numRealChildren - options.maxSlidesShown;
    slider.indicEndpoint = 8 * slider.max + 8 * 3;
    slider.speed = options.animationSpeed;
    slider.halfspeed = slider.speed / 2;

    return slider;
  }

  function scrollActions(slider, direction) {
    if (
      options.infiniteLoop ||
      (!options.infiniteLoop &&
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

              if (slider.counter === edge && options.infiniteLoop) {
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
        (slider.slideWidth * options.maxSlidesShown)) *
      1000 *
      (11 - options.continuousSpeed);

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
    if (!options.continuousLoop) {
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
        if (options.autoSlide) {
          clearInterval(scrollInterval);
          scrollInterval = setInterval(function () {
            scrollActions(slider, true);
          }, options.autoSlideDelay);
        }
      });

      // Auto slide
      let scrollInterval;
      if (options.autoSlide) {
        scrollInterval = setInterval(function () {
          scrollActions(slider, true);
        }, options.autoSlideDelay);
      }

      // Stop auto slide on hover
      if (options.autoSlide && options.stopOnHover) {
        slider.el.mouseover(function () {
          clearInterval(scrollInterval);
        });

        slider.el.mouseleave(function () {
          scrollInterval = setInterval(function () {
            scrollActions(slider, true);
          }, options.autoSlideDelay);
        });
      }
    } else {
      infiniteScroll(slider);

      if (options.stopOnHover) {
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

const firstUC = UC("#slider-1", {
  maxSlidesShown: 4,
  showIndicatorDots: false,
});
firstUC.init();

const secondUC = UC("#slider-2", { maxSlidesShown: 3, infiniteLoop: false });
secondUC.init();
