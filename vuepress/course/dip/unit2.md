# Unit II

## Spatial Domain

Spatial domain processes involve direct pixel manipulation (point processing) of an image; it can be denoted by

$$g(x, y) = T\lbrack f(x, y) \rbrack$$

where $T$ is the spatial transform, $f$ is the input image, and $g$ is the output image.

## Gary Level Transforms

In the following formulae

- $r \longrightarrow$ input pixel value
- $s \longrightarrow$ output pixel value
- $c \longrightarrow$ contrast
- $\lambda_{max} \longrightarrow$ maximum pixel value permissible by the image's datatype

### Image Negative

Inverts the gray levels.

$s = \lambda_{max} - r$

```cs
// For uint8 image
s = 255 - r
```

### Log Transform

Spread/compresses the gray levels.

$s = c \cdot \log_{10}(1 + r)$

```cs
s = c * Math.Log(1 + r);
```

### Power Law Transform

Selectively increases/decreases the intensity of either dark/light pixels with minimum effect on the counterpart light/dark pixels.

$s = c \cdot r^\gamma$

```cs
s = c * Math.Pow(r, gamma);
```

- $\gamma > 1 \longrightarrow$ brightens image
- $\gamma = 1 \longrightarrow$ no change if $c = 1$
- $\gamma < 1 \longrightarrow$ darkens image

### Optimal Contrast

- The basic idea behind optimal contrast is to **normalize** the log and power law transforms to prevent overflow of values.
- This can be achieved by scaling up/down the entire image based on the fact that a $\lambda_{max}$ before transform should be same as $\lambda_{max}$ after the transform.
- Consider the following example

```cs
// Log transform
r = Math.Log(1 + 255);     // 2.408

// Power transform (low gamma, say 0.1)
r = Math.Pow(255, 0.1);    // 1.740

// Power transform (high gamma, say 2)
r = Math.Pow(255, 2.0));   // 65025
```

In all three cases, the output value becomes useless on the $[0, 255]$ scale. To overcome this, we **normalize** the image.

```cs
// Log transform
c = 255 / Log(1 + 255);    // 105.886
s *= c;                    // 255 | Normalized

// Power transform (low gamma, say 0.1)
c = 255 / Pow(255, 0.1);   // 146.516
s *= c;                    // 255 | Normalized

// Power transform (high gamma, say 2)
c = 255 / Pow(255, 2.0);   // 0.00392
s *= c;                    // 255 | Normalized
```

## Piecewise Transform

### Contrast Stretching

This technique makes dark regions darker, and light regions lighter.

![Graph](https://www.researchgate.net/profile/Ahmed-Mueen/publication/44650125/figure/fig9/AS:670559390162965@1536885225711/Explanatory-illustration-of-contrast-stretching-transformation.png)

$r_1, r_2, s_1, s_2$ are selected as per preference. This results in three distinct regions where different transform slopes apply.

$$
s=\left\{
  \begin{array}{ll}
  m_1 \times r                  & r \leq r_1 \\
  m_2 \times (r - r_1) + s_1    & r_1 < r \leq r_2 \\
  m_3 \times (r - r_2) + s_2    & r > r_2 \\
  \end{array}
\right.
$$

#### Solved Example <Badge text="Sample Problem" verticle="middle" />

<iframe width="560" height="315" src="https://www.youtube.com/embed/YJIgFMoC_yg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Thresholding

- In contrast stretching, if we make $r_1 = r_2$, $s_1 = 0$, and $s_2 = \lambda_{max}$, we can create a threshold image based on the $\text{Threshold} = r_1 = r_2$.

![Threshold](https://www.dynamsoft.com/blog/assets/images/uploads/2019/06/graph2.png)

- Optimal threshold can be calculated by averaging the lightest and darkest pixel.

$\text{Threshold} = \dfrac{\text{Darkest Pixel + Lightest Pixel}}{2}$

- Furthermore, dividing the threshold image by $\lambda_{max}$ results in a binary/black-and-white image.

```cs
// Grayscale to logical conversion
image /= lambdaMax;

// For uint8 image
image /= 255;
```

### Adaptive Thresholding

- Instead of globally applying the thresholding to the entire image at once, we can split the image into local sub-images/sub-matrices.
- Applying separate thresholding to separate regions will produce a better overall output in case of images with uneven illumination levels (one region is blown out, other is dim).

### Gray Level Slicing

Highlight specific range $[A, B]$ of the graylevels.

![](https://image.slidesharecdn.com/chapter-3imageenhancementspatialdomain-160204073932/95/chapter-3-image-enhancement-spatial-domain-23-638.jpg?cb=1454571619)

- It has two approaches
  1. Reduce graylevels outside of the range $[A, B]$.
  2. Preserve graylevels outside specified range $[A, B]$ i.e. do not change them.

### Bit Plane Slicing

Highlight the contribution of specific or a range of bit planes.

![Bit planes](https://bitplaneslicing.files.wordpress.com/2012/02/bit-plane.png)

- The most significant planes are the top 50% layers which contain visually significant data.
- It is useful in image compression (**reducing number of gray levels**) and filtering out most significant layers from an image.

![Bit plane slicing](https://i2.wp.com/theailearner.com/wp-content/uploads/2019/01/bit-plane-slicing.png?w=662&ssl=1)

- The number of bit planes depends on the bit-depth of the image.
- The leftmost bit is MSB, and therefore corresponds to the most significant plane.

#### Bit Plane Slicing <Badge text="CODE" vertical="middle" />

```cs
image = Convert.ToDouble(uint3Image);

// Extract bits from image
layer1 = Floor(image / Pow(2, 0)) % 2; // least significant
layer1 = Floor(image / Pow(2, 1)) % 2;
layer1 = Floor(image / Pow(2, 2)) % 2; // most significant

// Recombine layers
recombinedImage = (2* (2 * (2 * layer3) + layer2) + layer1);
```

### Histogram Sliding

Complete histogram is shifted right or left. This operation affects brightness.

```cs
// Right shift -> brighten image
image += shift

// Left shift -> darken image
image -= shift
```

::: tip NOTE
If the value of a pixel overflows or underflows after slide, it attains maximum or minimum value permissible in the datatype of image.

For example, in a `uint8` image, data is bound by $[0, 255]$

- $200 + 100 = 300$ $\longrightarrow$ overflow $\longrightarrow$ reset to $\lambda_{max}$
- $100 - 105 = -5$ $\longrightarrow$ underflow $\longrightarrow$ reset to $\lambda_{min}$
  :::

### Histogram Stretching

Stretch/compress the histogram to increase/decrease the contrast of the image.

- Map minimum value in histogram to $\lambda_{min}$
- Map maximum value in histogram to $\lambda_{max}$

$s = \dfrac{s_{max} - s_{min}}{r_{max} - r_{min}} \times (r - r_{min}) + s_{min}$

```cs
// Stretch histogram in [10, 60] to occupy entire region [0, 255]
s = ((255 - 0) / (60 - 10)) * (r - 10) + 0
```

#### Solved Example <Badge text="Sample Problem" verticle="middle" />

<iframe width="560" height="315" src="https://www.youtube.com/embed/5z6cd-yah6s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Histogram Equalization

- Although histogram stretching improves contrast, simply shuffling about the order of levels does not help much.
- To counter this, the histogram is then equalized/normalized/leveled using concept of cumulative sum.

#### Solved Example <Badge text="Sample Problem" verticle="middle" />

<iframe width="560" height="315" src="https://www.youtube.com/embed/Grjn7zwzUjI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Histogram Specification

- Although histogram equalization balances out the gray level, it has only one standardized out; no flexibility.
- Histogram specification adapts the balance one histogram based on an external **histogram reference**.

#### Solved Example <Badge text="Sample Problem" verticle="middle" />

<iframe width="560" height="315" src="https://www.youtube.com/embed/_0lnvU6lquQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Mathematical Operations

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

## Pseudo Color

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

## Color Image Enhancement <Badge text="CODE" vertical="middle" />

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
