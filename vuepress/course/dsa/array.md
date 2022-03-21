# Array

## Definition

- Collection of elements of the **same type** placed in contiguous memory locations.
- Array lies linearly. Say `uint32` (4 byte) array is used, the memory addresses will be `[100 | 104 | 108]`.
- Arrays have an ending bit to signify the array has ended. So, technically arrays are `N+1` in length.

## Generate

```cpp
// Allocate memory and type
listA[100] { }; // Undefined elements attain garbage values

// Allocate memory, type, and some elements
int listB[100] { 1, 2, 3, 4, 5 }; // Undefined elements attain 0

// Allocate type and elements
int listC[] { 1, 2, 3 }; // Compiler sets the length
```

## I/O

```cpp
int list[9] { 0 }; // Initialize to prevent garbage values

// Input
for(size_t i = 0; i < 2; i++) { std::cin >> list[i]; }

// Output
for(size_t i = 0; i < 9; i++) { std::cout << list[i] << " "; }
```

```
10 20
10 20 0 0 0 0 0 0 0
```

## Number of Elements in an Array

```cpp
int n = std::size(list);
```

::: tip

- Arrays are passed by reference.
- This leads to unexpected behavior in calculating size of array when called inside a function.
- A simple fix is to pass the length of array as an argument.
  :::

## Linear Search

- $O(n)$ time complexity

```cpp
int LinearSearch(int key, int list[], int length)
{
  for(size_t i = 0; i < length; i++)
  {
    if(list[i] == key) { return i; }
  }

  return -1; // Key not found
}
```

## Binary Search

- $O(\log_2{n})$ time complexity
- Divide search area by half in each step.
- Only works for sorted array i.e. monotonic arrays.

```cpp
int BinarySearch(int key, int list[], int length)
{
  int left = 0;           // Start index
  int right = length - 1; // End index

  while(left <= right)
  {
    int center = (left + right) / 2;

    if(list[center] == key) { return center; }
    else if(key > list[center]) { left = center + 1; } // Discard left region
    else { right = center - 1; }                       // Discard right region
  }

  // Reaching here implies left > right, which means key was not found
  return -1;
}
```

## Reverse Array

- $O(\frac{n}{2})$ time complexity
- $1$ space complexity
- Swap opposite pairs

```cpp
void ReverseArray(int key, int list[], int length)
{
  int left = 0;           // Start index
  int right = length - 1; // End index

  while(left < right)
  {
    std::swap(list[left], list[right]);
    left++;
    right--;
  }
}
```

::: tip TIPS

1. Return type is `void` because the array is passed by reference.
2. Directly printing the array from `n` to `0` (without actually reversing) may not work on websites which specifically look for address manipulation instead of console output when testing cases.
   :::

## Pairs

- $O(n^2)$ time complexity
- Take one element, pair it with all elements to the right. Loop.
- `(a, b)` pair is the same as `(b, a)` pair, so we don't consider elements to the left.
- `(a, a)` is not a pair.

```cpp
void PrintPairs(int list[], int length)
{
  for(size_t i = 0; i < length; i++) {
    for(size_t j = i + 1; j < length; j++) {
      std::cout << std::format("({}, {}) ", list[i], list[j]);
    }
    std::cout << std::endl;
  }
}
```

## Subarrays

- $O(n^3)$ time complexity
- $n^2$ space complexity
- Take one element, pair it with all possible elements to right. Loop. Loop again.

```cpp
void PrintSubarrays(int list[], int length)
{
  for(size_t i = 0; i < length; i++) {
    for(size_t j = i; j < length; j++) {
      for(size_t k = i; k < j; k++) {
        std::cout << std::format("{}, ", list[k]);
      }
      std::cout << std::endl;
    }
    std::cout << std::endl;
  }
}
```

## Sum of Subarray <Badge title="Algorithm" vertical="middle" />

- $O(n)$ time complexity
- Prefix sum approach (cumulative sum) $\longrightarrow$ [Kadane's Algorithm](https://medium.com/@rsinghal757/kadanes-algorithm-dynamic-programming-how-and-why-does-it-work-3fd8849ed73d).
- Basically, if the number becomes `-ve` at any point in time, just reset the cumulative sum to $0$.

```cpp
void KadaneAlgorithm(int list[], int length)
{
  int maxSum = 0;
  int currentSum = 0;

  for(size_t i = 0; i < length; i++)
  {
    currentSum += list[i];
    if(currentSum < 0) { currentSum = 0; } // Reset if cumulative sum becomes negative
    if(currentSum > maxSum) { maxSum = currentSum; } // New maximum
  }

  std::cout << std::format("Maximum subarray sum is {}", maxSum);
}
```

## Vector

- Standard C/C++ array is static i.e. they cannot change in size or use runtime `n` length.
- Vector `std::vector<T>` was introduced as a dynamic array.
- Vector is **pass by value**. This also eliminates the requirement of sending `std::size(list)` as a function argument.

```cpp
// Initialize
std::vector<int> list; // Empty vector

// Fill constructor
std::vector<int> list(10, 0); // (Size, fill with)

// Remove last element
list.pop_back();

// Append to vector
list.puch_back(value);

// Pass by reference instead
vector<T>&
```

## Problems

[Array Problems Repo](https://github.com/Az-21/dsa/tree/main/array)
