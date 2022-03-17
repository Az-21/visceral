# Unit I

## Definition

Image processing is a method to perform some operations on an image to get an enhanced image, or to extract some useful information from it.

Digital image processing is manipulation of the digital images by using computers.

## Fundamental Steps Involved

![Block Diagram](https://i.imgur.com/0b8xSvm.jpeg)

1. **Image acquisition** ⟶ acquire image in the digital form from the camera, or storage.

2. **Image enhancement** ⟶ subjective enhancement of the image to improve the aesthetics of the image. Brightness, contrast, color adjustment, and saturation are some examples.

3. **Image restoration** ⟶ objective restoration of image using well defined mathematical and/or probabilistic models of image degradation.

4. **Color image processing** ⟶ color modeling and processing in a digital domain.

5. **Wavelets and multi-resolution processing** ⟶ foundation for representing images in various degrees of resolution. Images subdivision successively into smaller regions for data compression and for pyramidal representation.

6. **Compression** ⟶ reducing the storage required to save an image or the bandwidth to transmit it.

7. **Morphological processing** ⟶ tools for extracting image components that are useful in the representation and description of shape.

8. **Segmentation** ⟶ partition an image into its constituent parts or objects. One of the most difficult tasks in DIP.

9. **Representation and description** ⟶ transforming raw data into a form suitable for subsequent computer processing. Description deals with extracting attributes that result in some quantitative information of interest or are basic for differentiating one class of objects from another.

10. **Object recognition** ⟶ process that assigns a label. Example: assigning `vehicle` label to an object based on its descriptors.

11. **Knowledge base** ⟶ inference from the processed image. It can involve anything from simple process of detailing regions of an image where the information of interest is known to be located, to complex process of generation interrelated list of all major possible defects in a materials inspection problem.

## Components of an Image Processing System

![Block Diagram](https://media.geeksforgeeks.org/wp-content/uploads/20191204123048/Capture666.png)

- **Image sensors** ⟶ senses the intensity, amplitude, co-ordinates, and other features of the images and passes the result to the image processing hardware. It includes the problem domain.

- **Image processing hardware** ⟶ dedicated hardware that is used to process the instructions obtained from the image sensors.

- **Computer** ⟶ image processing hardware which runs the image processing software.

- **Image processing software** ⟶ software that includes all the mechanisms and algorithms that are used in an image processing system.

- **Mass storage** ⟶ stores the pixels of the images during the processing.

- **Hard copy device** ⟶ permanent storage of processed output. It can be an SSD, pen drive, or any external ROM device.

- **Image display** ⟶ the monitor or display screen that displays the processed images.

- **Network** ⟶ connection of all the above elements of the image processing system.

## Elements of Visual Perception

In human visual perception, the eyes act as the sensor or camera, neurons act as the connecting cable and the brain acts as the processor.

#### Structure of Eye

![Eye Anatomy](https://images.ctfassets.net/u4vv676b8z52/3EEHqBUTHts5Cx52uy2UP7/ab761a14fd65b921062b8691b54f3f80/eye-anatomy-700x635.jpg)

- The human eye is a slightly asymmetrical sphere with an average diameter of the length of $20 \ mm$ to $25 \ mm$. It has a volume of about $6.5 \ cm^3$.

- Light enters the eye through a small hole called the pupil, a black looking aperture having the quality of contraction of eye when exposed to bright light and is focused on the retina which is like a camera film.

- The lens, iris, and cornea are nourished by clear fluid, know as anterior chamber. Balance of aqueous production and absorption controls pressure within the eye.

- Cones in eye number between $6$ to $7$ million which are highly sensitive to colors. Cones helps us visualize color.

- Rods in eye number between $75$ to $150$ million which sensitive to low levels of illumination. Rods helps us visualize light intensity i.e. grayscale.

#### Image Formation

![Ray Diagram](https://cdn1.byjus.com/wp-content/uploads/2018/11/Functioning-of-the-Human-eye.png)

- The lens of the eye focuses light on the photoreceptive cells of the retina which detects the photons of light and responds by producing neural impulses.

- The distance between the lens and the retina is about $17 \ mm$ and the focal length is approximately $14 \ mm$ to $17 \ mm$.

## Image Sensing and Acquisition

![Components](https://blog.kakaocdn.net/dn/wg5fW/btq2D4AwyOQ/VB1KeUC63tmJigJ0zOpnkK/img.png)

- Incoming energy is transformed into a voltage by the combination of input electrical power and sensor material that is responsive to the particular type of energy being detected. Example, camera detects wavelength intensity in the visible spectrum.

- An array of these sensors measures energy across length $l$ and width $dw$.

![Motion](https://t1.daumcdn.net/cfile/tistory/25457F35586103D233)

- The sensing array then moves a certain distance, giving the array new set of inputs. Doing this sweep along the entire area gives us an image matrix $l \times w$.

::: tip NOTE
This process produces an analog voltage signal, which must then be sampled and quantized to produce a digital image.
:::

## Image Sampling and Quantization

![](https://slideplayer.com/slide/15463344/93/images/4/Changing+analog+signal+to+digital+signal%3A+Sampling+%EF%83%A0+Quantizing+%EF%83%A0+Coding.jpg)

#### Sampling

- Continuous-time analog signal is sampled by measuring its amplitude at a discrete instants spaced uniformly in time $T$.

- As long as the sampling of the analog signal is taken with a sufficiently high frequency (higher than the minimum Nyquist rate of twice the signal largest frequency), there is no loss in information as a result of taking discrete samples.

#### Quantization

- The sample values have to be quantized to a finite number of levels, and each value can then be represented by a string of bits.

- For example, color channels in `JPEG` images are usually quantized in $256$ levels of intensity.

#### Encoding

- The quantized signal is then encoded into a standardized image format: `PNG`, `JPEG`, `RAW`, `TIFF`.

## Relation Between Pixels

#### Neighbors

- $N_4 \longrightarrow$ horizontal + vertical neighbors.
- $N_D \longrightarrow$ diagonal neighbors.
- $N_8 \longrightarrow$ $N_4 \cup N_D$.

#### Path

- $N_4$ Path $\longrightarrow$ minimum distance path using $N_4$ movement.
- $N_8$ Path $\longrightarrow$ minimum distance path using $N_8$ movement.
- $M$ Path $\longrightarrow$ ⟶ N<sub>4</sub> movement on priority; $N_8$ movement only if $N_4$ movement is not possible.
  - If $N_4$ path exists, $M$ path equals $N_4$ path by definition.

#### Distance

- **Euclidean distance**

  - Straight line distance between two points.
  - $d_{eu} = \sqrt{\Delta x^2 + \Delta y^2}$

- **Cityblock distance**

  - $N_4$ path distance
  - $d_{ci} = \Sigma \lparen \vert \Delta x \vert + \vert \Delta y \vert \rparen$

- **Chessboard distance**
  - Longest distance along **one** axis
  - $d_{ch} = \max \lparen \vert \Delta x \vert, \vert \Delta y \vert \rparen$

#### Distance <Badge text="CODE" vertical="middle"/>

```matlab
% Artificial image
img = zeros(4, 4);
img(3, 3) = 1;
disp(img);

% Distance
distEu = bwdist(img, "euclidean")
distCb = bwdist(img, "cityblock")
distCh = bwdist(img, "chessboard")
```

## Linear and Non-Linear Operations

```:no-line-numbers
H(af + bg) = aH(f) + bH(g)
```

- `H` ⟶ operation
- `a` and `b` ⟶ scalers
- `f` and `g` ⟶ images

- **Linear operation** ⟶ satisfies this condition and therefore can be expressed using **convolution** and **frequency shaping**
- **Non-linear operation** ⟶ does not satisfy this condition

## Numericals on Scanning

#### Important info

- n-bit depth of an image corresponds to $2^k$ colors/levels.
- Packet with `[start | data | end]` increase the n-bit depth by `start + end`, usually $2$.
- Baud rate is basically the speed of scan.
- For good quality scans, a minimum of $2 \ \frac{\text{pixels}}{\text{cycles}}$ sampling resolution is required.
- $1 \ in$ = $2.54 \ cm$

#### 1. Memory

$\text{bits} = \text{Height} \times \text{Width} \times \text{Channels} \times \text{Bit-depth}$

#### 2. Scan time

$\text{Time} = \dfrac{\text{bits}}{\text{Baud Rate}}$

#### 3. Sampling resolution

$\text{Resolution} = \dfrac{\text{Cycle}}{mm} \times \dfrac{\text{Pixels}}{\text{Cycle}}$

## Numerical on Image Formation

$\dfrac{\text{Height of Object}}{\text{Lens to Object Distance}} = \dfrac{\text{Height of Image}}{\text{Lens to Retina Distance}}$
