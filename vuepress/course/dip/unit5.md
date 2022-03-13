# Unit V

## Image Transforms

### Orthogonal Transform

```cs:no-line-numbers
// Ortho transform
A⁻¹ = Aᵀ
```

### Unitary Transform

```cs:no-line-numbers
// Unitary transform
A⁻¹ = A*ᵀ = Conjugate(Aᵀ)
```

### Properties of Image Transforms

```cs:no-line-numbers
// Symmetric
A == Aᵀ

// Orthogonal
A x A⁻¹ == A x Aᵀ == I

// Unitary
A x A⁻¹ == A x A*ᵀ == I

// Hermitian
A x A⁻¹ == A x A*ᵀ == A

// Interchange: if both A & B are symmetric, real, and orthogonal, then
A = P x B x Q       ===     B = P x A x Q
```

## Hadamard Transform

- It is a **symmetric**, **non-sinusoidal** function

```cs:no-line-numbers
// H (2x2)
H = (1 / sqrt(2)) |  1   1  |
                  |  1  -1  |

// H (4x4)
H = (1 / sqrt(4)) |  H   H  |
                  |  H  -H  |

  = (1 / sqrt(4)) |  1   1   1   1  |
                  |  1  -1   1  -1  |
                  |  1   1  -1  -1  |
                  |  1  -1  -1   1  |

// Similarly, H(8x8)
H = |  H   H  |
    |  H  -H  |
```

```cs:no-line-numbers
// One dimensional Haramard transform
F = H x f(x)

// Two dimensional Haramard transform
F = H x f(x, y) x Hᵀ        // which can be simplified to
F = H x f(x, y) x H
```

- Sequencing is the number of sign changes in each row. `N x 1`

## Haar Transform

- Low computing requirement.
- Great for image processing and pattern recognition.
- Haar transforms are efficient for 2D image processing because of their **wavelet-like** structure.
- Real and orthogonal.
- Separable and symmetric.
- Sequentially ordered.
- Poor image compression.

### Procedure to Generate Kernel of Haar

```cs:no-line-numbers
// Find the order N, and compute
n = log2(N)

// Determine p
p = [0, n - 1]

// Determine q
if(p == 0) { q = [0, 1] }
else{ 1 ≤ q ≤ 2^p }

// Determine k
k = 2^p + q - 1

// Apply the Haar function making necessary changes
```

![Haar Function](https://miro.medium.com/max/924/0*ETm8ZpgZa7_r5FnF.png)

#### Resultant Haar Matrix

![Haar Matrix](https://i.ytimg.com/vi/ywH6fpYsMCE/maxresdefault.jpg)

## KL Transform

- Unlike spatial and frequency based filters, KL transform works on statistical properties.
- Mean, variance, standard deviation.

```cs:no-line-numbers
// Transform equation
Y = A (X - mean)

/* Y > output
 * A > KL transform matrix
 * X > object vector (x, y)
 * mean > Mean(X) */
```

- Object vector `X` is formed by `(x, y)` location of `1s` in the image.
- Origin of axis is oriented at bottom left.

#### Procedure

1. Calculate `Mean(X)`
2. Calculate covariance matrix

```cs:no-line-numbers
Ci = (Xi - Mean(X)) x (xi - Mean(X))ᵀ   // 2x2 matrix
```

3. Calculate `Mean(C)`
4. Find the Eigen vectors and Eigen values

```cs:no-line-numbers
| C | = | C11 - λ       C12 | = 0
        | C21       C22 - λ |
```

5. Form quadratic equation and solve for `λ` to find `λ1` and `λ2`.

:::tip IMPORTANT
Number/assign `λ1`, `λ2`, `λn` such that their magnitudes are in decreasing order

```cs:no-line-numbers
| λ1 | > | λ2 | > ... > | λn |
```

:::

6. Solve for Eigen equation to get Eigen vectors

```cs:no-line-numbers
// Vector corresponding to λ1
| C11 - λ1       C12 | * | x_λ1 | = 0
| C21       C22 - λ1 |   | y_λ1 |

// Vector corresponding to λ2
| C11 - λ2       C12 | * | x_λ2 | = 0
| C21       C22 - λ2 |   | y_λ2 |
```

7. Generate KL transform matrix `A`

```cs:no-line-numbers
A = | x_λ1    x_λ2    ...   x_λn |
    | y_λ1    y_λ2    ...   y_λ1 |
```

8. Plug all the values in the KL transform equation

#### Solved Example <Badge text="Sample Problem" verticle="middle" />

<iframe width="560" height="315" src="https://www.youtube.com/embed/5LTqwmFfnpU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Skipped Topics

- Two dimensional discrete fourier transform
- Discrete cosine transform
- Discrete sine transform
