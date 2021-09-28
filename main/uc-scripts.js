const UC = function (element, options) {
  const slider = {};

  function restructureHTML(slider) {
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
    let before = slider.el.find(".uc--slide:last-child").html();
    let after = slider.el.find(".uc--slide:first-child").html();

    slider.el
      .find(".uc--scroll-area")
      .prepend("<div class='uc--slide copy before'>" + before + "</div>");

    slider.el
      .find(".uc--scroll-area")
      .append("<div class='uc--slide copy after'>" + after + "</div>");

    // Add arrows and dots
    let indicators = `
    <div class="uc--indicators">
      <button class="uc--scroll-right uc--arrow">
        <img
          src="https://www.enrollify.org/hubfs/Empower/images/icons/grey-arrow-right.svg"
          alt="Scroll Right"
        />
      </button>
      <button class="uc--scroll-left uc--arrow">
        <img
          src="https://www.enrollify.org/hubfs/Empower/images/icons/grey-arrow-left.svg"
          alt="Scroll Left"
        />
      </button>
      <div class="uc--slider-indics">
        <span class="uc--dot active trailing"></span>
        <span class="uc--dot active leading"></span>
      </div>
    </div>
    `;

    slider.el.append(indicators);

    for (let i = 0; i < slider.el.find(".uc--slide.real").length; i++) {
      slider.el
        .find(".uc--slider-indics")
        .append("<span class='uc--dot'></span>");
    }
  }

  function initVars(slider) {
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
    slider.numRealChildren = slider.el.find(".uc--slide.real").length;
    slider.numVisBeforeChildren = slider.el.find(
      ".uc--slide.before:visible"
    ).length;

    slider.counter = 0;

    // RESPONSIVE variables
    slider.scrollDist = slider.scrollWidth - slider.clientWidth;
    slider.startingPos = slider.slideWidth * slider.numVisBeforeChildren;
    slider.endingPos = slider.scrollDist - slider.slideWidth;
    slider.dotActiveWidth = 8;

    // DEPENDANT variables
    slider.max = slider.numRealChildren;
    slider.indicEndpoint = 8 * slider.max + 8 * 3;
    slider.speed = 500;
    slider.halfspeed = slider.speed / 2;
  }

  function scrollActions(slider, direction) {
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
                trailLeftPos = parseInt($(slider.trailingDot).css("left"), 10);
              slider.leadingDot.css("left", leadLeftPos - 16 + "px");
              slider.trailingDot.css("left", trailLeftPos - 16 + "px");
            }

            if (slider.counter === edge) {
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

  function initIndics(slider) {
    slider.scrollArea.scrollLeft(slider.startingPos);
    slider.activeDots.width(slider.dotActiveWidth);
    slider.leadingDot.css("left", slider.sliderIndicsWidth + "px");

    slider.arrows.click(function () {
      if ($(this).hasClass("uc--scroll-right")) {
        scrollActions(slider, true);
      } else {
        scrollActions(slider, false);
      }
    });
  }

  function init() {
    restructureHTML(slider);
    initVars(slider);
    initIndics(slider);
  }

  return {
    init: init,
  };
};

const firstUC = new UC("#slider-1");
firstUC.init();

const secondUC = new UC("#slider-2");
secondUC.init();
