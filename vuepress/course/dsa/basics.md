# Basics of C++

## Types

```cpp
  // Types
  int integer = 21;
  char character = 'A';
  float singleDecimal = 21.001;     // 7 decimals
  double doubleDecimal = 21.001001; // 14 decimals

  // Size in bytes
  std::cout << sizeof(integer) << std::endl;        // 4
  std::cout << sizeof(character) << std::endl;      // 1
  std::cout << sizeof(singleDecimal) << std::endl;  // 4
  std::cout << sizeof(doubleDecimal) << std::endl;  // 8
```

## Type Casting

```cpp
  int charAsInt = (int)'a';
  std::cout << charAsInt << std::endl;

  char intAsChar = (char)97;
  std::cout << intAsChar << std::endl;
```

## Patterns

#### Rectangle

```cpp
void MakeRectanglePattern(int width, int height) {
  for (size_t row = 0; row < width; row++) {
    for (size_t col = 0; col < height; col++) { std::cout << "* "; }
    std::cout << std::endl;
  }
}
```

#### Right angled triangle

```cpp
void MakeTriangle(int base) {
  for (size_t row = 0; row < base; row++) {
    for (size_t col = 0; col <= i; col++) { std::cout << "* "; }
    std::cout << std::endl;
  }
}
```

#### Right angled triangle with alphabets

```cpp
void MakeAlphabetTriangle(int height) {
  char firstCharacter = 'A';

  for (size_t row = 0; row < height; row++) {
    for (size_t col = 0; col <= row; col++) {
      std::cout << (char)(firstCharacter + row + col);
    }

    std::cout << std::endl;
  }
}
```

```
// Output at height = 7

A
BC
CDE
DEFG
EFGHI
FGHIJK
GHIJKLM
```

#### Right angled triangle with reversed alphabets

```cpp
void MakeAlphabetTriangle(int height) {
  char firstCharacter = 'A' + height - 1; // Offset

  for (size_t row = 0; row < height; row++) {
    for (size_t col = 0; col <= row; col++) {
      std::cout << (char)(firstCharacter - row + col);
    }

    std::cout << std::endl;
  }
}
```

```
// Output at height = 4

D
CD
BCD
ABCD
```

#### Horizontally flipped triangle with reversed alphabets

```cpp
void MakeAlphabetTriangle(int height) {
  char firstCharacter = 'A' + height - 1; // Offset

  for (size_t row = 0; row < height; row++) {
    int numberOfSpaces = height - row - 1;
    while (numberOfSpaces != 0) {
      std::cout << " ";
      numberOfSpaces--;
    }

    for (size_t col = 0; col <= row; col++) {
      std::cout << (char)(firstCharacter - row + col);
    }

    std::cout << std::endl;
  }
}
```

```
Output at height = 4

D
CD
BCD
ABCD
```

## Bitwise Operators

```cpp
int a = 8; // 1 0 0 0
int b = 9; // 1 0 0 1
int bitwiseOperation;

// AND
bitwiseOperation = a & b;      // 1 0 0 0
std::cout << bitwiseOperation; // 1 0 0 1
std::cout << std::endl;        // 1 0 0 0 = 8

// OR
bitwiseOperation = a | b;      // 1 0 0 0
std::cout << bitwiseOperation; // 1 0 0 1
std::cout << std::endl;        // 1 0 0 1 = 9

// NOT
bitwiseOperation = ~a;         // 0 0 ... 0 1 0 0 0
std::cout << bitwiseOperation; // 1 1 ... 1 0 1 1 1 -> take 2's complement
std::cout << std::endl;        // 1 0 ... 0 1 0 0 1 = -9

// XOR
bitwiseOperation = a ^ b;      // 1 0 0 0
std::cout << bitwiseOperation; // 1 0 0 1
std::cout << std::endl;        // 0 0 0 1 = 1

// Left Shift -> Move bits towards left
bitwiseOperation = a << 2;                    // 0 0 1 0 0 0
std::cout << bitwiseOperation << std::endl;   // 1 0 0 0 0 0

// Right Shift -> Move bits towards right
bitwiseOperation = a >> 2;                    // 0 0 1 0 0 0
std::cout << bitwiseOperation << std::endl;   // 0 0 0 0 1 0
```

:::tip NOTE

- Right shift's padding is compiler dependant for `-ve` numbers.
- Left shift and right shift **usually** have the effect of multiplying or dividing by `2`.
- During left/right shift, if a MSB bit changes, sign will also change.
  :::

## Increment Operator

```cpp
int i;

// Post increment -> increment after current block;
i = 20;
std::cout << i++ << std::endl;
std::cout << i << std::endl;        // 21

// Pre increment -> increment before current block;
i = 20;
std::cout << ++i << std::endl;      // 21
std::cout << i << std::endl;
```
