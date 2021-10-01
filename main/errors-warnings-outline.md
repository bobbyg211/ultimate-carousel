# animationSpeed

## Errors

### Invalid Type: animationSpeed must be of type number.

### Invalid Value: animationSpeed must be greater than 0.

## Warnings

### Redundant Declaration: animationSpeed will have no effect because continuousLoop is set to TRUE.

<br />

# autoSlide

## Errors

### Invalid Type: autoSlide must be of type boolean.

### Invalid Value: autoSlide must be TRUE or FALSE.

## Warnings

### Redundant Declaration: autoSlide will have no effect because continuousLoop is set to TRUE.

### Redundant Declaration: autoSlide TRUE is required because navigationDirection is set to 'none'.

<br />

# autoSlideDelay

## Errors

### Invalid Type: autoSlideDelay must be of type number.

### Invalid Value: autoSlideDelay must be greater than 0.

## Warnings

### Redundant Declaration: autoSlide will have no effect because continuousLoop is set to TRUE.

<br />

# continuousLoop

## Errors

### Invalid Type: continuousLoop must be of type boolean.

### Invalid Value: continuousLoop must be TRUE or FALSE.

## Warnings

### NONE

<br />

# continuousSpeed

## Errors

### Invalid Type: continuousSpeed must be of type number.

### Invalid Value: continuousSpeed must be greater than 0.

## Warnings

### Redundant Declaration: continuousSpeed will have no effect because continuousSpeed is set to FALSE.

<br />

# infiniteLoop

## Errors

### Invalid Type: infiniteLoop must be of type boolean.

### Invalid Value: infiniteLoop must be TRUE or FALSE.

## Warnings

### Redundant Declaration: infiniteLoop TRUE is required because autoSlide is set to TRUE.

### Redundant Declaration: infiniteLoop TRUE is required because continuousLoop is set to TRUE.

<br />

#### **NOTE: infiniteLoop value will take precedence over navigationDirection values and so warning related to their relationship will nto be shown here.**

<br />

# maxSlidesShown,

## Errors

### Invalid Type: maxSlidesShown must be of type number.

### Invalid Value: maxSlidesShown must be greater than 0.

## Warnings

### NONE

<br />

# navigationDirection

## Errors

### Invalid Type: maxSlidesShown must be of type string.

### Invalid Value: maxSlidesShown must be 'two-way', 'one-way', or 'none'.

## Warnings

### Redundant Declaration: navigationDirection 'none' is required because continuousLoop is set to TRUE.

### Redundant Declaration: navigationDirection 'two-way' is required because infiniteLoop is set to FALSE.

<br />

#### **NOTE: navigationDirection will take effect, even if infiniteLoop is set to FALSE, if autoSlide is set to TRUE.**

<br />

# showIndicatorDots

## Errors

### Invalid Type: showIndicatorDots must be of type boolean.

### Invalid Value: showIndicatorDots must be TRUE or FALSE.

## Warnings

### Redundant Declaration: showIndicatorDots FALSE is required because continuousLoop is set to TRUE.

<br />

# stopOnHover

## Errors

### Invalid Type: stopOnHover must be of type boolean.

### Invalid Value: stopOnHover must be TRUE or FALSE.

## Warnings

### NONE

<br />

#### **NOTE: stopOnHover will take effect, regardless of the value for continuousLoop. Default value will be TRUE for continuousLoop and autoSlide. Otherwise, FALSE**

<br />
