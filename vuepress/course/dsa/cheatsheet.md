# Cheatsheet

## Standard Format

```cpp
#include <vector>
#include <iostream>
#include <algorithm>

#define debug(...) logger(#__VA_ARGS__, __VA_ARGS__)
template<typename ...Args>
void logger(std::string vars, Args&&... values)
{
  std::cout << vars << " = ";
  std::string delim = "";
  (..., (std::cout << delim << values, delim = ", "));
  std::cout << std::endl;
}

int main()
{

}
```

- Debug template is by [rachitiitr](https://codeforces.com/blog/entry/91347). Slightly modified output.

## Vector

```cpp
std::vector<T> v

// Size
int size = v.size() == std::size(v)

// Grab element at index
int element = v.at(index) == v[index]

// Grab first and last element
int first = v.front() == v[0]
int last = v.back() == v[v.size() - 1]

// Remove element at index
v.erase(v.begin() + index);

// Append element
v.push_back(element)

// Remove last element
v.pop_back()

// Reset
v.clear()

// Iterator
for(const auto& element : v) { // Do something over entire collection }
```

:::tip
Prefer using `std::deque` if the application requires frequent operations at the front. However, deque has poor reading performance.

```cpp
// Pop first element
d.pop_front()
```

:::
