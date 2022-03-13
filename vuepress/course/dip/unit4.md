# Unit IV

## Image Segmentation

- Process of partitioning digital image into multiple region of interests (ROIs).
- Image segmentation approaches
  1. Similarity principle (region approach) ⟶ group similar pixels to extract a coherent region
  2. Discontinuity principle (boundary approach) ⟶ extract regions that differ in `H/S/V`

### Characteristics of Segmentation

![ROIs](https://miro.medium.com/max/1400/1*AyLH5OG_MXum4CsO9Angag.jpeg)

- Similar pixels from an image region `R` are grouped into separate regions/subgroups `Rᵢ`

```cs:no-line-numbers
// Mathematical relation of ROIs
Σ Rᵢ = R
```

- `Rᵢ` must be a connected region i.e. `i = 1, 2, 3, ..., n`

- `Rᵢ`s must be mutually exclusive region

```cs:no-line-numbers
// Mutually exclusive relation between Rᵢ and Rⱼ where i ≠ j
Rᵢ ∩ Rⱼ = ɸ
```

- **Predicate** `P(Rᵢ)` indicates some property over the region `Rᵢ`. Ideally, two different regions should have different predicates.

- Changing the tolerance of an ROI changes the shape of ROIs.
  - Low tolerance will give accurate results, but may result in too many ROIs.
  - High tolerance may give inaccurate results, but results in manageable number of ROIs.

## Detection of Discontinuities

- Types of gray level discontinuities
  1. Point ⟶ isolated point
  2. Line ⟶ straight line
  3. Edge ⟶ irregular outline of an object

### Point Detection

- Isolated point whose gray level is significantly different from its background.
- If the response of a region is greater than or equal to the threshold, we can say an isolated point exists.
- This threshold is subjective non-negative integer, and its value depends on the application.

```cs:no-line-numbers
// Point detection mask
Mask = | -1  -1  -1  |
       | -1   8  -1  |
       | -1  -1  -1  |

// Isolated point condition
| R | ≥ T
```

### Line of Detection

- There are four types of lines: horizontal, vertical, +45° diagonal, -45° diagonal.
- This means four types of masks are used for line detection.

```cs:no-line-numbers
// Horizontal line mask
Mask = | -1  -1  -1  |
       |  2   2   2  |
       | -1  -1  -1  |

// Vertical line mask
Mask = | -1   2  -1  |
       | -1   2  -1  |
       | -1   2  -1  |

// +45° Diagonal line mask
Mask = | -1  -1   2  |
       | -1   2  -1  |
       |  2  -1  -1  |

// -45° Diagonal line mask
Mask = |  2  -1  -1  |
       | -1   2  -1  |
       | -1  -1   2  |
```

- Response from all four line masks is calculated.
- The mask giving the highest response is associated with corresponding line.

### Edge Detection

- An edge is a set of **connected pixels** which lie on the boundary of an object (boundary of two different).
- Edge corresponds to the sharp discontinuities/change in `H/S/V` and therefore can be used in segmentation.
- Edge can extracted by computing the derivative of an image
  - Magnitude of derivative ⟶ contrast of edge
  - Direction of derivative ⟶ edge orientation (angle)

#### Types of Edges

- Step edge ⟶ abrupt change in `H/S/V`
- Ramp edge ⟶ gradual change in `H/S/V`
- Spike edge ⟶ abrupt change in `H/S/V` and then back to original `H/S/V`
- Roof edge ⟶ gradual change in `H/S/V` and then gradually back to original `H/S/V`

#### Stages in Edge Detection

1. Start
2. Input image
3. Filtering ⟶ some preprocessing to aid in edge detection (smoothening, reduce noise)
4. Differentiation ⟶ first or second order derivative and direction if `atan(y / x)`
5. Localization ⟶ identify the edge location. Also involves edge thinning and edge linking.
6. Display
7. End

#### Edge Detection Approaches

- Derivative ⟶ spatial filters
- Template matching ⟶ matches region which resemble template
- Gaussian derivatives ⟶ best for real time processing
- Pattern fit ⟶ topographical surface generation

## Edge Detection Techniques

### First Order Edge Detection

```cs:no-line-numbers
// Edge magnitude
M = | Gx | + | Gy |

// Edge gradient (angle)
ϕ = tan⁻(Gy / Gx)

// Edge localization
| 1   ⟶   M ≥ Threshold
| 0   ⟶   M < Threshold
```

#### Robert Operator

- Mask is the derivative w.r.t. diagonal elements.
- Also known as cross diagonal difference.

```cs:no-line-numbers
// Robert Masks
GxMask = |  1   0 |
         |  0  -1 |

GyMask = |  0   1 |
         | -1   0 |
```

#### Prewitt Operator

- Central difference of neighboring pixels.

```cs:no-line-numbers
// Prewitt Masks
GxMask = | -1  -1  -1 |
         |  0   0   0 |
         |  1   1   1 |

GyMask = | -1   0   1 |
         | -1   0   1 |
         | -1   0   1 |

// Diagonal Prewitt Masks
GxMask = |  0   1   1 |
         | -1   0   1 |
         | -1  -1   0 |

GyMask = | -1  -1   0 |
         | -1   0   1 |
         |  0   1   1 |
```

::: tip NOTE
Which row/col is `-ve` doesn't really matter. What matters is row/col should have opposite signs to get the difference of neighboring pixels.

Conventionally, left/top side is taken as `-ve` and right/bottom side is taken as `+ve`.

For diagonal masks `Gx` is -45° and `Gy` is +45°.
:::

#### Sobel Operator

- Central difference of neighboring pixels
- Also provides a smoothening effect
- First approximation of first Gaussian derivative

```cs:no-line-numbers
// Sobel Masks
GxMask = | -1  -2  -1 |
         |  0   0   0 |
         |  1   2   1 |

GyMask = | -1   0   1 |
         | -2   0   2 |
         | -1   0   1 |

// Diagonal Sobel Masks
GxMask = |  0   1   2 |
         | -1   0   1 |
         | -2  -1   0 |

GyMask = | -2  -1   0 |
         | -1   0   1 |
         |  0   1   2 |
```

### Template Matching

- Direction sensitive filter.
- The masks can be obtained by rotating the matrix clockwise for a clockwise change in orientation.
- Also known as compass masks.
- The highest response corresponds to the direction of edge.
- Say, `M7 (South East ↙)` gives highest response, then edge has a South East ↙ orientation.

#### Kirsch Mask

```cs:no-line-numbers
// M0 (East ←)
M0 = | -3  -3   5 |
     | -3   0   5 |
     | -3  -3   5 |

// M1 (North East ↖)
M1 = | -3  -3  -3 |
     | -3   0   5 |
     | -3   5   5 |

// ... ↑ ↗ → ↘ ↓

// M7 (South East ↙)
M7 = | -3   5   5 |
     | -3   0   5 |
     | -3  -3  -3 |
```

#### Robinson Mask

```cs:no-line-numbers
// M0 (East ←)
M0 = | -1   0   1 |
     | -2   0   2 |
     | -1   0   1 |

// M1 (North East ↖)
M1 = | -2  -1   0 |
     | -1   0   1 |
     |  0   1   2 |

// ... ↑ ↗ → ↘ ↓

// M7 (South East ↙)
M7 = |  0   1   2 |
     | -1   0   1 |
     | -2  -1   0 |
```

## Second Order Edge Detection

- Zero crossing (crossing of second derivate from `+ve` to `-ve` or vice versa) corresponds to edge.
- So, if the response of filter changes sign, we can conclude an edge is present in the image.
- Unlike first order edge detection, second order is rotationally invariant.

### Simple Laplacian Mask

```cs:no-line-numbers
// Laplacian filter
Mask = |  0  -1   0  |
       | -1   4  -1  |
       |  0  -1   0  |

// Continuous Laplacian filter
Mask = | -1  -1  -1  |
       | -1   8  -1  |
       | -1  -1  -1  |
```

### Laplacian of Gaussian (LoG) Filter

- Also known as Marr-Hildrith filter.
- This filter accounts for variation in scale of image, and is capable of calculating both first and second order derivatives.
- Gaussian function reduces noise.
- To minimize noise susceptibility, LoG is preferred over simple Laplacian.

![LoG](https://i.ytimg.com/vi/ukssj9vCFlQ/maxresdefault.jpg)

- `σ` decides the size of the convolution mask generated.
- Higher `σ` corresponds to higher order `n x n` filter mask.
- Higher `σ` gives better performance of the edge operator at cost of processing.

### Difference of Gaussian (DoG) Filter

- Difference between two Gaussian filters with `σ₁` and `σ₂`
- Ratio of `σ₁` and `σ₂` between 1 and 2 is optimal.

![Equation](https://media.cheggcdn.com/media/772/7725a2fb-8c96-4276-9a75-eb32a0dd7312/phppMbCw0.png)

- Since DoG is an **approximation** of LoG and does not require Laplace transform, DoG is less resource intensive alternative to LoG.

![DoG](https://d3i71xaburhd42.cloudfront.net/2e56b65b9619da5e2320ecda9d9b5d1ac1efd848/2-Figure3-1.png)

## Canny Edge Detection

- Multistage algorithm to detect wide range of edges in an image.
- Multistage approach provides the benefit of
  1. Good edge detection with few false edges
  2. Good edge localization.

#### Canny Edge Algorithm

1. Preprocess smoothening

   - Convolve image with Gaussian filter to produce a smooth image
   - Compute gradient of result and store both magnitude and store `M` `ϕ` in separate arrays (see [first order edge detection](#first-order-edge-detection) for more info).

2. Reduce the number of edges using **non-maxima suppression**

   - Utilizes the concept of 'confidence' from fuzzy logic to eliminate regions with low confidence.
   - This confidence threshold is a subjective choice.

3. Apply hysteresis thresholding

![Thresholding](https://cdn-5f733ed3c1ac190fbc56ef88.closte.com/wp-content/uploads/2019/02/hysteresis-thresholding.jpg)

## Segmentation using Watershed Segmentation

- Grayscale level of an image can be mapped as topology elevation.
- Raining on this topology forms water catchment basins.

![Topography](https://slidetodoc.com/presentation_image/bf70edf1da14a524c54262f0853e074a/image-4.jpg)

- Catchment basin (lake) ⟶ collection of points where water will certainly fall to a **unique** regional minima.
- Watershed lines (boundary of lake) ⟶ collection of points where water is equally likely to fall to **more than one** regional minima.
- If we can find the watershed lines, we can determine the edges. Here's a slice from the 3D plane we generated.

![Slice](https://www.researchgate.net/profile/Kostas-Haris/publication/12685308/figure/fig7/AS:359110026514447@1462629910680/An-example-of-regional-minima-catchment-basins-and-watersheds-produced-by-the-watershed.png)

## Basic Morphological Algorithms

### Boundary Extraction

```cs:no-line-numbers
// Boundary by eroding the topology
B(A) = A - (A ⊖ B)
```

#### Solved Example <Badge text="Sample Problem" verticle="middle" />

<iframe width="560" height="315" src="https://www.youtube.com/embed/dD9zwP6-37c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Region Filling

```cs:no-line-numbers
// Fill region by dilation the topology
Xₖ = (Xₖ₋₁ ⊕ B) ∩ Aʹ

// Structuring element B (constant)
B = | 0  1  0 |
    | 1  1  1 |
    | 0  1  0 |
```

- This process is repeated until `Xₖ == Xₖ₋₁`

#### Solved Example <Badge text="Sample Problem" verticle="middle" />

<iframe width="560" height="315" src="https://www.youtube.com/embed/aoGi6mieTQk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Extraction of Connected Component

```cs:no-line-numbers
// Fill region by dilation the topology
Xₖ = (Xₖ₋₁ ⊕ B) ∩ A

// Structuring element B (constant)
B = | 1  1  1 |
    | 1  1  1 |
    | 1  1  1 |
```

- This process is repeated until `Xₖ == Xₖ₋₁`

#### Solved Example <Badge text="Sample Problem" verticle="middle" />

<iframe width="560" height="315" src="https://www.youtube.com/embed/hMIrQdX4BkE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Convex Hull

- Smallest possible polygonal hull (shape) to encapsulate the object.

```cs:no-line-numbers
// Convex hull formation by hit-or-miss of the topology
Xₖⁱ = (Xₖ₋₁ ⊗ Bᵢ) ∪ A

// Structuring element B (constant)
B1 = | 1  x  x |
     | 1  0  x |
     | 1  x  x |

// Rotate B1 clockwise **twice** to get B2, B3, and B4
```

- This process is repeated until `Xₖ == Xₖ₋₁`

#### Solved Example <Badge text="Sample Problem" verticle="middle" />

<iframe width="560" height="315" src="https://www.youtube.com/embed/tEHNkKs9iZE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Thinning and Thickening

```cs:no-line-numbers
// Thinning
Thin(A, B) = A - (A ⊗ B)

// Thickening
Thick(A, B) = A ∪ (A ⊗ B)

// Structuring element B (constant)
B1 = | 1  x  0 |
     | 1  1  0 |
     | 1  x  0 |

// Rotate B1 clockwise **once** to get B2, B3, B4, B5, B6, B7, and B8
```

- If B mask matches the image
  - If thinning, replace center by `0`
  - If thickening, replace center by `1`
- This process is exhaustive. Only one iteration is performed.

#### Solved Example <Badge text="Sample Problem" verticle="middle" />

<iframe width="560" height="315" src="https://www.youtube.com/embed/gGCWu6qR350" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Image Restoration

- Process of removal of degradation in an image.
- Degradation is incurred during acquisition, transmission, or storage.
- Restoration is an **objective** process based on concrete, non-subjective mathematical models.
- Uses prior knowledge to achieve this.
- Causes
  1. Out of focus lens
  2. Atmospheric turbulence, mirage
  3. Improper ISO

#### Degradation Model

![Model](https://images.slideplayer.com/26/8267441/slides/slide_5.jpg)

Original Image ⟶ Degrade Function ⟶ Degraded Image ⟶ Add Noise ⟶ Degrade Function ⟶ Original Image Estimate

#### Restoration Techniques

1. Inverse filtering
2. Minimum mean squares filtering
3. Constrained mean square filtering
4. Non-linear filtering

#### Areas of Restoration

1. Quantum limiting imaging in x-ray
2. CT (computed tomography) scan in healthcare
3. Image postprocessing in phone camera
