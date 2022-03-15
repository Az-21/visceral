# Unit III

## Spatial Filtering

- Image processing technique to reject certain frequency components.
- Involves usage of `n x n` filter mask which traverses through the image pixels.
- Advantage over frequency filters ⟶ can also be used in non-linear domain.
- Types
  - Smoothening spatial filter (low pass filter)
  - Sharpening spatial filter

### Response of Linear Filter

![Response](https://www.dynamsoft.com/blog/assets/images/uploads/2019/07/figure-231.png)

```cs:no-line-numbers
// Response is output of mask at selected region
Response = Σ w(i, j) * f(x + i, y + j)
```

- `w(i, j)` ⟶ weight of mask/filter
- `f(x + i, y + j)` ⟶ corresponding image pixel
- After operation, `f(x, y)` (center of mask) is replaced with with response.

::: tip NOTE
On the edges of an image, the row and/or column is mirrored appropriately to ensure proper filter operation. Defaulting it to `0` negatively affects the response on the edges.
:::

## Smoothening Spatial Filter

- Used in blurring and noise reduction. This process removes small, insignificant details from the image.

### Average Filter

Takes the average of image matrix under the mask.

```cs:no-line-numbers
// Base is the building block of the mask
Base = (1/3) | 1  1  1 |
Mask = Base * Transpose(Base)

Mask = (1/9) | 1  1  1 |
             | 1  1  1 |
             | 1  1  1 |
```

### Weighted Average Filter

Takes the weighted average of the image matrix under the mask. This gives us flexibility to give maximum weightage to the pixel being replaced i.e. center of the mask, and reduce weightage as we move away from the center.

Weighted average produces smoother output on detailed images with a lot of variation in vibrance region-to-region.

```cs:no-line-numbers
// Base is the building block of the mask
Base = (1/4) | 1  2  1 |
Mask = Base * Transpose(Base)

Mask = (1/16) | 1  2  1 |
              | 2  4  2 |
              | 1  2  1 |
```

### Median Filter

```cs:no-line-numbers
// Median of matrix under the mask
Response = Median(f(x + i, y + j))

// Example
f(x + i, y + j) = | 10  20  30 |
                  | 10  50  90 |
                  | 50  50  70 |

Median.Sort(10, 20, 30, 10, 50, 90, 50, 50, 70)
Median(10, 10, 20, 30, 50, 50, 50, 70, 90) = 50
```

### Maximum Filter

```cs:no-line-numbers
// Maximum of matrix under the mask
Response = Maximum(f(x + i, y + j))

// Example
f(x + i, y + j) = | 10  20  30 |
                  | 10  50  90 |
                  | 50  50  70 |

Maximum(10, 20, 30, 10, 50, 90, 50, 50, 70) = 90
```

### Minimum Filter

```cs:no-line-numbers
// Minimum of matrix under the mask
Response = Minimum(f(x + i, y + j))

// Example
f(x + i, y + j) = | 10  20  30 |
                  | 10  50  90 |
                  | 50  50  70 |

Minimum(10, 20, 30, 10, 50, 90, 50, 50, 70) = 10
```

### Geometric Mean Filter

Takes the geometric mean of values under the mask.

```cs:no-line-numbers
// Geometric mean formula ⟶ nᵗʰ root of product of values
(x₁ * x₂ * ... * xₙ) ^ (1 / n)

// Geometric mean of matrix under the mask
Response = GeometricMean(f(x + i, y + j))

// Example
f(x + i, y + j) = | 10  20  30 |
                  | 10  50  90 |
                  | 50  50  70 |

GeometricMean(10, 20, 30, 10, 50, 90, 50, 50, 70)
(10 * 20 * 30 * 10 * 50 * 90 * 50 * 50 * 70) ^ (1 / 9)
```

### Harmonic Mean Filter

Takes the harmonic mean of values under the mask.

```cs:no-line-numbers
// Harmonic mean formula
n / (1/x₁ + 1/x₂ + ... + 1/xₙ)

// Harmonic mean of matrix under the mask
Response = HarmonicMean(f(x + i, y + j))

// Example
f(x + i, y + j) = | 10  20  30 |
                  | 10  50  90 |
                  | 50  50  70 |

HarmonicMean(10, 20, 30, 10, 50, 90, 50, 50, 70)
9 / (1/10 + 1/20 + 1/30 + 1/10 + 1/50 + 1/90 + 1/50 + 1/50 + 1/70)
```

## Sharpening Spatial Filter

- Used in sharpening, highlighting, and edge detection. This process highlights the sudden changes in `H/S/V` which usually happens at the edges of an object.
- Since we are dealing with sudden change in `H/S/V`, concept of **derivative** (rate of change) is very useful in sharpening filters.
- Since the values in an image are finite, the maximum change possible is `max(uint8)` to `min(uint8)` (or any datatype used by image) along adjacent pixels.
- In context of an image matrix
  - `f(x)` ⟶ current pixel
  - `f(x + 1)` ⟶ next pixel
  - `f(x - 1)` ⟶ previous pixel

### First Order Derivative Filter

Characteristics of first order derivatives

- Must be zero in flat segments
- Must be non-zero at onset of gray level ramp/change
- Must be non-zero along ramp

```cs:no-line-numbers
// Mathematical definition
f′ = f(x + 1) - f(x)
```

### Second Order Derivate Filter

Characteristics of second order derivatives

- Must be zero in flat area
- Must be non-zero at onset of gray level ramp/change
- Must be zero along ramp

```cs:no-line-numbers
// Mathematical definition
f′′ = f(x + 1) + f(x - 1) - 2 * f(x)
```

### Image Profile

![Profile](https://i.imgur.com/Xu7jNF8.png)

- Edges are excluded because `f′′` becomes undefined because there is no 'previous pixel'.
- The calculated derivatives follow the characteristics.

#### Conclusions from Image Profile

- `f′` ⟶ highlights thicker edges as it has non-zero response to ramps
- `f′′` ⟶ highlights finer details as it has strong response to isolated points

### Laplacian Filter

- Works on principle of second order derivative filter.
- Since we'll use it on a mask, and not on a linear image profile, we have to modify the definition to include both `x-axis` and `y-axis`.

```cs:no-line-numbers
// Partial derivative
f′′ = f′′(∂x) + f′′(∂y)
f′′(∂x) = f(x + 1, y) + f(x - 1, y) - 2 * f(x, y)
f′′(∂y) = f(x, y + 1) + f(x, y - 1) - 2 * f(x, y)

f′′ = f(x + 1, y) + f(x - 1, y) + f(x, y + 1) + f(x, y - 1) - 4 * f(x, y)
//    |<---------------------along axis------------------>|  |<-center->|
```

```cs:no-line-numbers
// Mathematical Laplacian filter
Mask = |  0   1   0  |
       |  1  -4   1  |
       |  0   1   0  |

// Modified Laplacian filter
Mask = |  0  -1   0  |
       | -1   4  -1  |
       |  0  -1   0  |

// Continuous Laplacian filter
Mask = | -1  -1  -1  |
       | -1   8  -1  |
       | -1  -1  -1  |
```

::: tip NOTE
In context of image processing, we want to give more weightage to the center pixel of the mask.

The mathematically derived Laplacian filter gives negative weightage to the center pixel, which is undesired. Therefore we multiply the mask by `-1` to make it more suitable for digital image processing.
:::

### Highboost Filtering

- Sharpening by subtracting blurred image from original image.

```cs:no-line-numbers
// Highboost filter
sharpImage(x, y) = originalImage(x, y) - blurredImage(x, y)
```

#### Solved Example <Badge text="Sample Problem" verticle="middle" />

<iframe width="560" height="315" src="https://www.youtube.com/embed/Hutnurzr59o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Image Enhancement in Frequency Domain

- Spatial domain (input) ⟶ frequency domain (processing) ⟶ spatial domain (output).
- Removes high or low frequencies.
- Change (function) is applied to entire image at once. There are no masks involved.

### Fourier Transform

- Spatial domain ⟶ frequency domain | DFT
- Frequency domain ⟶ spatial domain | IDFT
- In context of DIP, we have to take two-dimensional Fourier transform

```cs:no-line-numbers
f(x, y)  ⇌  F(u, v)
```

![Equation](https://media.cheggcdn.com/media/6ca/6ca51759-9bc1-4f6d-8658-4aa1ceb1c1f2/php8JDYp6)

### Steps for Filtering in Frequency Domain

1. **Preprocessing**

```cs:no-line-numbers
// Input
f(x, y)

// Preprocessed input
f(x, y) * (-1)^(x + y)
```

2. **Fourier transform**

```cs:no-line-numbers
// Fourier transform using 2D DFT
F(u, v) = FourierTransform(f(x, y))
```

3. **Filter in frequency domain**

```cs:no-line-numbers
// Filter function
H(u, v)

// Apply filter function on image
G(u, v) = H(u, v) * F(u, v)
```

4. **Inverse Fourier transform**

```cs:no-line-numbers
// Inverse Fourier transform using 2D IDFT
g(x, y) = InverseFourierTransform(G(u, v))
```

5. **Postprocessing**

```cs:no-line-numbers
// Output
g(x, y)

// Postprocessed output
g(x, y) * (-1)^(x + y)
```

### Filter Parameters

- `D₀` ⟶ non-negative constant to adjust the filter level
- `D(u, v)` ⟶ distance from point `(u, v)`
- `n` is the sharpness of the filter. If `n ⟶ ∞`, the filter becomes ideal.

```cs:no-line-numbers
// Distance function for an MxN image
D(u, v) = sqrt[ (u - M / 2)^2 + (v - N / 2)^2 ]
```

### Notes on Usage of Frequency Filters

1. Ideal filters blur the edges of image.
2. Butterworth filters provide a smooth gradient at low sharpness `n` resulting in well defined edges.
3. Gaussian filters remove high/low frequency noise.

## Smoothening Frequency Filter

- Utilizes **lowpass filter** to smoothen the image by removing the high frequency signals from the image.
- High frequency is basically noise and sudden changes in the image.

### Ideal Lowpass Filter

```cs:no-line-numbers
// Filter function
H(u, v) = | 1   ⟶   D(u, v) ≤ D₀
          | 0   ⟶   D(u, v) > D₀
```

### Butterworth Lowpass Filter

```cs:no-line-numbers
// Filter function
H(u, v) = { 1 + [D(u, v) / D₀]^2n }^(-1)
```

### Gaussian Lowpass Filter

```cs:no-line-numbers
// Filter function
H(u, v) = e ^ { -D²(u, v) / (2 * D₀²) }
```

### Summary

## Sharpening Frequency Filter

- Utilizes **highpass filter** to sharpen the image by removing the low frequency signals from the image.
- Low frequency is basically continuity in the image. Continuity breaks at edges of an object.

### Ideal Highpass Filter

```cs:no-line-numbers
// Filter function
H(u, v) = | 0   ⟶   D(u, v) ≤ D₀
          | 1   ⟶   D(u, v) > D₀
```

### Butterworth Highpass Filter

```cs:no-line-numbers
// Filter function
H(u, v) = { 1 + [D₀ / D(u, v)]^2n }^(-1)
```

### Gaussian Highpass Filter

```cs:no-line-numbers
// Filter function
H(u, v) = 1 - e ^ { -D²(u, v) / (2 * D₀²) }
```

## Summary of Frequency Filters

![HPF](https://player.slideplayer.com/90/14547361/slides/slide_18.jpg)

<Giscus :theme="theme" :lang="lang" :reactionsEnabled="reactionsEnabled" />
