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

## Sum of Subarray <Badge title="Standard Problem" vertical="middle" />

- $O(n^2)$ time complexity
- Prefix sum approach (cumulative sum)

```cpp
void MaximumSubarraySum(int list[], int length)
{
  int maxSum = INT_MIN;
  std::vector<int> prefixSum = { 0 };

  // Generate cumulative/prefix sum array. 1st element will be zero, modify accordingly.
  for(size_t i = 0; i <= length; i++) {
    prefixSum.push_back(prefixSum[i] + list[i]);
  }

  for(size_t i = 0; i < length; i++) {
    for(size_t j = i; j < length; j++) {
      int subarraySum = prefixSum[j + 1] - prefixSum[i];
      maxSum = std::max(maxSum, subarraySum);
    }
  }

  std::cout << std::format("Maximum subarray sum is {}", maxSum);
}
```
