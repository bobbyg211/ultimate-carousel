const UC = function (element, options) {
  const validOpts = {
    ...options,

    animationSpeed: errorHandling("animationSpeed", options.animationSpeed), // milliseconds
    autoSlide: errorHandling("autoSlide", options.autoSlide),
    autoSlideDelay: errorHandling("autoSlideDelay", options.autoSlideDelay),
    continuousLoop: errorHandling("continuousLoop", options.continuousLoop),
    continuousSpeed: errorHandling("continuousSpeed", options.continuousSpeed), // scale 1-10
    infiniteLoop: errorHandling("infiniteLoop", options.infiniteLoop),
    maxSlidesShown: errorHandling("maxSlidesShown", options.maxSlidesShown),
    navigationDirection: errorHandling(
      "navigationDirection",
      options.navigationDirection
    ), // "two-way", "one-way", "none"
    showIndicatorDots: errorHandling(
      "showIndicatorDots",
      options.showIndicatorDots
    ),
    stopOnHover: errorHandling("stopOnHover", options.stopOnHover),
  };

  function errorHandling(option, value) {
    // Animation Speed
    if (option === "animationSpeed") {
      if ((typeof value === "number" && value > 0) || value === undefined) {
        // Warnings
        if (options.animationSpeed !== undefined) {
          if (options.continuousLoop) {
            console.warn(
              `Redundant Declaration '${value}': animationSpeed will have no effect because continuousLoop is set to TRUE.`
            );
          }
        }

        // Return value
        return options.animationSpeed || 500;
      } else {
        // Errors
        if (typeof value !== "number") {
          let err = new Error(`animationSpeed value must be of type 'number'.`);
          err.name = `Invalid Type '${typeof value}'`;
          throw err;
        } else {
          let err = new Error(`animationSpeed must be greater than 0.`);
          err.name = `Invalid Value '${value}'`;
          throw err;
        }
      }
    }

    // Auto Slide
    if (option === "autoSlide") {
      if (typeof value === "boolean" || value === undefined) {
        // Warnings
        if (options.autoSlide !== undefined) {
          if (options.continuousLoop) {
            console.warn(
              `Redundant Declaration '${value}': autoSlide will have no effect because continuousLoop is set to TRUE.`
            );
          }
          if (options.navigationDirection) {
            console.warn(
              `Redundant Declaration '${value}': autoSlide TRUE is required because navigationDirection is set to 'none'.`
            );
            return true;
          }
        }

        // Return value
        return options.autoSlide || false;
      } else {
        // Errors
        if (typeof value !== "boolean") {
          let err = new Error(`autoSlide value must be of type 'boolean'.`);
          err.name = `Invalid Type '${typeof value}'`;
          throw err;
        }
      }
    }

    // Auto Slide Delay
    if (option === "autoSlideDelay") {
      if ((typeof value === "number" && value > 0) || value === undefined) {
        // Warnings
        if (options.autoSlideDelay !== undefined) {
          if (options.continuousLoop) {
            console.warn(
              `Redundant Declaration '${value}': autoSlideDelay will have no effect because continuousLoop is set to TRUE.`
            );
          }
        }

        // Return value
        return options.autoSlideDelay || 5000;
      } else {
        // Errors
        if (typeof value !== "number") {
          let err = new Error(`autoSlideDelay value must be of type 'number'.`);
          err.name = `Invalid Type '${typeof value}'`;
          throw err;
        } else {
          let err = new Error(`autoSlideDelay must be greater than 0.`);
          err.name = `Invalid Value '${value}'`;
          throw err;
        }
      }
    }

    // Continuous Loop
    if (option === "continuousLoop") {
      if (typeof value === "boolean" || value === undefined) {
        // NO Warnings

        // Return value
        return options.continuousLoop || false;
      } else {
        // Errors
        if (typeof value !== "boolean") {
          let err = new Error(
            `continuousLoop value must be of type 'boolean'.`
          );
          err.name = `Invalid Type '${typeof value}'`;
          throw err;
        }
      }
    }

    // Continuous Speed
    if (option === "continuousSpeed") {
      if (
        (typeof value === "number" && value >= 1 && value <= 10) ||
        value === undefined
      ) {
        // Warnings
        if (options.continuousSpeed !== undefined) {
          if (!options.continuousLoop) {
            console.warn(
              `Redundant Declaration '${value}': continuousSpeed will have no effect because continuousLoop is set to FALSE.`
            );
          }
        }

        //Return value
        return value || 5;
      } else {
        // Errors
        if (typeof value !== "number") {
          let err = new Error(
            `continuousSpeed value must be of type 'number'.`
          );
          err.name = `Invalid Type '${typeof value}'`;
          throw err;
        } else {
          let err = new Error(`continuousSpeed must be between 1-10.`);
          err.name = `Invalid Value '${value}'`;
          throw err;
        }
      }
    }

    // Infinite Loop
    if (option === "infiniteLoop") {
      if (typeof value === "boolean" || options.infiniteLoop === undefined) {
        if (options.infiniteLoop !== undefined) {
          if (options.autoSlide) {
            console.warn(
              `Redundant Declaration '${value}': infiniteLoop TRUE is required because autoSlide is set to TRUE.`
            );
            return true;
          }
          if (options.continuousLoop) {
            console.warn(
              `Redundant Declaration '${value}': infiniteLoop TRUE is required because continuousLoop is set to TRUE.`
            );
            return true;
          }
        }

        // Return Value
        if (options.infiniteLoop || options.infiniteLoop === undefined) {
          return true;
        } else {
          return false;
        }
      } else {
        if (typeof value !== "number") {
          let err = new Error(
            `continuousSpeed value must be of type 'number'.`
          );
          err.name = `Invalid Type '${typeof value}'`;
          throw err;
        }
      }
    }

    // maxSlidesShown
    if (option === "maxSlidesShown") {
      if ((typeof value === "number" && value > 0) || value === undefined) {
        // Warnings
        // NONE

        //Return value
        return value || 1;
      } else {
        // Errors
        if (typeof value !== "number") {
          let err = new Error(`maxSlidesShown value must be of type 'number'.`);
          err.name = `Invalid Type '${typeof value}'`;
          throw err;
        } else {
          let err = new Error(`maxSlidesShown must be greater than 0.`);
          err.name = `Invalid Value '${value}'`;
          throw err;
        }
      }
    }

    // Navigation Direction
    if (option === "navigationDirection") {
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

    // Show Indicator Dots
    if (option === "showIndicatorDots") {
      if (
        typeof value === "boolean" ||
        options.showIndicatorDots === undefined
      ) {
        if (options.showIndicatorDots !== undefined) {
          if (options.continuousLoop) {
            console.warn(
              `Redundant Declaration '${value}': showIndicatorDots FALSE is required because continuousLoop is set to TRUE.`
            );
            return false;
          }
        }

        // Return Value
        if (
          options.showIndicatorDots ||
          options.showIndicatorDots === undefined
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (typeof value !== "boolean") {
          let err = new Error(
            `showIndicatorDots value must be of type 'boolean'.`
          );
          err.name = `Invalid Type '${typeof value}'`;
          throw err;
        }
      }
    }

    // Stop On Hover
    if (option === "stopOnHover") {
      if (typeof value === "boolean" || options.stopOnHover === undefined) {
        // Return Value
        if (options.stopOnHover || options.stopOnHover === undefined) {
          return true;
        } else {
          return false;
        }
      } else {
        if (typeof value !== "boolean") {
          let err = new Error(`stopOnHover value must be of type 'boolean'.`);
          err.name = `Invalid Type '${typeof value}'`;
          throw err;
        }
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
  maxSlidesShown: 2,
  continuousLoop: true,
});
firstUC.init();

const secondUC = new UC("#slider-2", {
  maxSlidesShown: 3,
  autoSlide: true,
  autoSlideDelay: 2000,
});
secondUC.init();
