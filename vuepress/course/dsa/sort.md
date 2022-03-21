# Sort

## Bubble Sort

```cpp
std::vector<int> BubbleSort(std::vector<int> list)
{
  int bubbleRange = list.size() - 1;
  for(size_t i = 0; i < bubbleRange; i++)
  {
    bool flag = false;
    for(size_t j = 0; j < bubbleRange - i; j++)
    {
      if(list.at(j) > list.at(j + 1))
      {
        std::swap(list.at(j), list.at(j + 1));
        flag = true;
      }
    }

    if(!flag) { break; } // Vector sorted
  }

  return list;
}
```

## Insertion Sort

```cpp
std::vector<int> InsertionSort(std::vector<int> list)
{
  for(size_t i = list.size() - 1; i > 0; i--)
  {
    int previous = i - 1;

    while(previous >= 0 and list.at(previous) > list.at(i))
    {
      std::swap(list.at(previous), list.at(i));
      previous--;
    }
  }

  return list;
}
```
