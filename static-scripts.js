const Slider = function (element, options) {
  // GLOBAL variables
  const slider = {};

  slider.el = $(element);

  slider.sliderWrapper = slider.el.find(".slides");

  slider.arrows = slider.el.find(".arrow");
  slider.rightArrow = slider.el.find(".scroll-right");
  slider.leftArrow = slider.el.find(".scroll-left");

  slider.sliderIndicsWidth = slider.el.find(".slider-indics").width();
  slider.activeDots = slider.el.find(".dot.active");
  slider.leadingDot = slider.el.find(".dot.active.leading");
  slider.trailingDot = slider.el.find(".dot.active.trailing");

  slider.scrollWidth = slider.el.find(".slides").scrollWidth;
  slider.clientWidth = slider.el.find(".slides").clientWidth;
  slider.slideWidth = slider.el.find(".slide.real").outerWidth();
  slider.numRealChildren = slider.el.find(".slide.real").length;
  slider.numVisBeforeChildren = slider.el.find(".slide.before:visible").length;

  slider.counter = 0;

  // ====================================================================

  // RESPONSIVE variables

  slider.scrollDist = slider.scrollWidth - slider.clientWidth;
  slider.startingPos = slider.slideWidth * slider.numVisBeforeChildren;
  slider.endingPos = slider.scrollDist - slider.slideWidth;
  slider.dotActiveWidth = 8;

  // ====================================================================

  // DEPENDANT variables

  // Declarations
  slider.max = slider.numRealChildren;
  slider.indicEndpoint = 8 * slider.max + 8 * 3;
  slider.speed = 500;
  slider.halfspeed = slider.speed / 2;

  // ===========================================================

  // DIRECTION -- True = Right, Left = false
  function scrollActions(direction) {
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

    slider.sliderWrapper.animate(
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
                trailLeftPos = parseInt($(slider.trailingDot).css("left"), 10);
              slider.leadingDot.css("left", leadLeftPos - 16 + "px");
              slider.trailingDot.css("left", trailLeftPos - 16 + "px");
            }

            if (slider.counter === edge) {
              slider.sliderWrapper.scrollLeft(pos);
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
                parseInt($(this).css("left"), 10) === -slider.sliderIndicsWidth
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

  function init() {
    slider.sliderWrapper.scrollLeft(slider.startingPos);
    slider.activeDots.width(slider.dotActiveWidth);
    slider.leadingDot.css("left", slider.sliderIndicsWidth + "px");

    slider.arrows.click(function () {
      if ($(this).hasClass("scroll-right")) {
        scrollActions(true);
      } else {
        scrollActions(false);
      }
    });
  }

  return {
    init: init,
  };
};

const firstSlider = new Slider("#slider-1");
firstSlider.init();

const secondSlider = new Slider("#slider-2");
secondSlider.init();
