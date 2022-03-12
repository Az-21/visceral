# Unit II

## Spatial Domain

Spatial domain processes involve direct pixel manipulation of an image; it can be denoted by

```:no-line-numbers
g(x, y) = T[ f(x, y) ]
```

where `T` is the spatial transform, `f` is the input image, and `g` is the output image.

## Gary Level Transforms

In the following formulae

- `r` ⟶ input pixel value
- `s` ⟶ output pixel value
- `c` ⟶ contrast

### Image Negative <Badge type="danger" text="Basic Transform" vertical="middle" />

Inverts the gray levels.

```cs:no-line-numbers
// Inversion
s = maxPixel - r

// For uint8 image
s = 255 - r
```

### Log Transform <Badge type="danger" text="Basic Transform" vertical="middle" />

Spread/compresses the gray levels.

```cs:no-line-numbers
// Log transform
s = c · log(1 + r)
```

### Power Law Transform <Badge type="danger" text="Basic Transform" vertical="middle" />

Selectively increases/decreases the intensity of either dark/light pixels with minimum effect on the counterpart light/dark pixels.

```cs:no-line-numbers
// Power law transform
s = c · r ^ gamma
```

- `gamma > 1` ⟶ brightens image
- `gamma = 1` ⟶ no change if `c == 1`
- `gamma < 1` ⟶ darkens image

### Optimal Contrast <Badge type="danger" text="Basic Transform" vertical="middle" />

- The basic idea behind optimal contrast is to **normalize** the log and power law transforms to prevent overflow of values.
- This can be achieved by scaling up/down the entire image based on the fact that a `maxPixel` before transform should be same as `maxPixel` after the transform.
- Consider the following example

```cs:no-line-numbers
// uint8 image
maxPixel = 255

// Log transform
maxPixel = log(1 + 255) = 2.408

// Power transform (low gamma, say 0.1)
maxPixel = 255 ^ 0.1 = 1.740

// Power transform (high gamma, say 2)
maxPixel = 255 ^ 2.0 = 65025
```

In all three cases, the output value becomes useless on the `0-255` scale. To overcome this, we **normalize** the image.

```cs:no-line-numbers
// uint8 image
maxPixel = 255

// Log transform
c = 255 / log(1 + 255) = 105.886
maxPixel = log(1 + 255) = 2.408     // Too low
maxPixel = c * maxPixel = 255       // Normalized

// Power transform (low gamma, say 0.1)
c = 255 / (255 ^ 0.1) = 146.516
maxPixel = 255 ^ 0.1 = 1.740        // Too low
maxPixel = c * maxPixel = 255       // Normalized

// Power transform (high gamma, say 2)
c = 255 / (255 ^ 2.0) = 0.00392
maxPixel = 255 ^ 2.0 = 65025        // Too high
maxPixel = c * maxPixel = 255       // Normalized
```

### Contrast Stretching <Badge type="danger" text="Piecewise Transform" vertical="middle" />

This technique makes dark regions darker, and light regions lighter.

![Graph](https://www.researchgate.net/profile/Ahmed-Mueen/publication/44650125/figure/fig9/AS:670559390162965@1536885225711/Explanatory-illustration-of-contrast-stretching-transformation.png)

`r1` `r2` `s1` `s2` are selected as per preference. This results in three distinct regions where different transform slopes apply.

### Thresholding <Badge type="danger" text="Piecewise Transform" vertical="middle" />

- In contrast stretching, if we make `r1 = r2`, `s1 = 0`, and `s2 = maxPixel`, we can create a threshold image based on the `threshold = r1 = r2`.

![Threshold](https://www.dynamsoft.com/blog/assets/images/uploads/2019/06/graph2.png)

- Optimal threshold can be calculated by averaging the lightest and darkest pixel.

```cs:no-line-numbers
// Optimal image threshold
threshold = (darkestPixel + lightestPixel) / 2
```

- Furthermore, dividing the threshold image by `maxPixel` results in a binary/black-and-white image.

```cs:no-line-numbers
// Grayscale to binary conversion
image = image / maxPixel

// For uint8 image
image = image / 255
```

### Gray Level Slicing <Badge type="danger" text="Piecewise Transform" vertical="middle" />

Highlight specific range `[A, B]` of the graylevels.

![](https://image.slidesharecdn.com/chapter-3imageenhancementspatialdomain-160204073932/95/chapter-3-image-enhancement-spatial-domain-23-638.jpg?cb=1454571619)

- It has two approaches
  1. Reduce graylevels outside of the range `[A, B]`.
  2. Preserve graylevels outside specified range `[A, B]` i.e. do not change them.

### Bit Plane Slicing <Badge type="danger" text="Piecewise Transform" vertical="middle" />

Highlight the contribution of specific or a range of bit planes.

![Bit planes](https://bitplaneslicing.files.wordpress.com/2012/02/bit-plane.png)

- The most significant planes are the top 50% layers which contain visually significant data.
- It is useful in image compression and filtering out most significant layers from an image.

![Bit plane slicing](https://i2.wp.com/theailearner.com/wp-content/uploads/2019/01/bit-plane-slicing.png?w=662&ssl=1)

- The number of bit planes depends on the bit-depth of the image.
- The leftmost bit is MSB, and therefore corresponds to the most significant plane.

#### Bit Plane Slicing <Badge text="CODE" vertical="middle" />

```matlab
% Convert uint# image to double
image = double(image);

% Extract bits from image
layer1 = mod(floor(image / 2^0), 2);    % least significant
layer2 = mod(floor(image / 2^1), 2);
layer3 = mod(floor(image / 2^2), 2);    % most significant

% Recombine layers
recombinedImage = (2* (2 * (2 * layer3) + layer2) + layer1);
```

### Histogram Sliding <Badge type="danger" text="Histogram Transform" vertical="middle" />

Complete histogram is shifted right or left. This operation affects brightness.

```cs:no-line-numbers
// Right shift -> brighten image
image = image + shift

// Left shift -> darken image
image = image - shit
```

::: tip NOTE
If the value of a pixel overflows or underflows after slide, it attains maximum or minimum value permissible in the datatype of image.

For example, in a `uint8` image, data is bound by `[0, 255]`

- `200 + 100 = 300` ⟶ overflow ⟶ reset to `max(uint8) = 255`
- `100 - 150 = -50` ⟶ underflow ⟶ reset to `min(uint8) = 0`
  :::

### Histogram Equalization <Badge type="danger" text="Histogram Transform" vertical="middle" />

Stretch the histogram to increase the contrast of the image.

- Map minimum value in histogram to `0` i.e. `minPixel`
- Map maximum value in histogram to `255` i.e. `maxPixel`

```cs:no-line-numbers
// Histogram equalization
s = ((r - minR) / (maxR - minR)) * maxPixel

// For uint8 image
// Stretch histogram in [10, 60] to occupy entire region [0, 255]
s = ((r - 10) / (60 - 10)) * 255
```

#### Histogram Equalization <Badge text="CODE" vertical="middle" />

```matlab
[eq, T] = histeq(gray);
imshow(eq); % Equalized image
imhist(eq); % Equalized histogram
```

### Arithmetic Operations <Badge text="CODE" vertical="middle" />

::: tip NOTE
Arithmetic operations can only be done on same size image/matrix.

```matlab
% Crop image from top-left pixel
image = imresize(image, [100, 100]);
```

:::

Arithmetic operations are simple element-to-element operation (hence same size matrices are required).

```matlab
% Addition
result = imageA + imageB;

% Subtraction
result = imageA - imageB;

% Multiplication
result = immultiply(imageA, imageB);

% Division
result = imdivide(imageA, imageB);

% Invert
result = imcomplement(imageA);
```

### Logical Operations <Badge text="CODE" vertical="middle" />

::: tip NOTE
Logical operations can only be done on same size image/matrix.

Use the concept of [optimal thresholding](#thresholding) to convert an image from grayscale to binary.

```matlab
% Crop image from top-left pixel
image = imresize(image, [100, 100]);

% Convert to logical image
optimalThreshold = (max(image) + min(image)) / 2
image = im2bw(image, optimalThreshold)
```

:::

Logical operations are simple element-to-element operation (hence same size matrices are required).

```matlab
% AND operation
result = imageA & imageB;

% OR operation
result = imageA | imageB;

% XOR operation
result = xor(imageA, imageB);

% NOT operation
result = ~image;                % !image in other languages
result = imcomplement(image);   % also works
```

### Pseudo Color

- Technique used to display images in color which were originally recorded in the visible or non-visible parts of the electromagnetic spectrum.
- Uses of pseudo color in visible spectrum
  - Change color temperature of an image
  - Map one spectrum of colors to another (eg: convert greens of an image to red)
  - Highlight key features of image

![Visible Pseudo Color](https://i.ytimg.com/vi/YEY4RID2dlc/maxresdefault.jpg)

- Uses of pseudo color in non-visible spectrum
  - Map quantities such as radiation, heat, elevation, concentration (which don't have a color) to a spectrum in the visible region. This converts raw data to visual data which is easier to digest by humans.
  - Example: map the high infrared signals to red, and low infrared signals to blue. Image generated by such mapping will show hot areas in red, and cold areas in blue.

![Non-visible Pseudo Color](https://upload.wikimedia.org/wikipedia/commons/2/25/ParowozIR.jpg)

### Color Image Enhancement <Badge text="CODE" vertical="middle" />

#### RGB Colorspace
```matlab
% Extract RGB components
rChannel = image(:, :, 1);  % red
gChannel = image(:, :, 2);  % green
bChannel = image(:, :, 3);  % blue

% Recombine
recombinedImage = cat(3, rChannel, gChannel, bChannel);
```

#### HSV Colorspace
```matlab
% Convert to HSV colorspace
hsvImage = rgb2hsv(image);

% Extract HSV components
hChannel = hsvImage(:, :, 1);   % hue
sChannel = hsvImage(:, :, 2);   % saturation
vChannel = hsvImage(:, :, 3);   % vibrance

% Recombine
recombinedImage = cat(3, hChannel, sChannel, vChannel);
```

Using the same modification techniques used for grayscale, we can enhance the colored images by splitting them into different channels and applying enhancement techniques on them, and then recombining the channels.