# C++ Package Manager

## Links

- [vcpkg](https://vcpkg.io/en/index.html)
- [List of packages](https://vcpkg.io/en/packages.html)

## Clone Repo

```sh
# Clone into current folder. "C:\dev\vcpkg" recommended
git clone https://github.com/Microsoft/vcpkg.git .
```

## Bootstrap and Integrate

```sh
# Initialize
.\bootstrap-vcpkg.bat

# Integrate
.\vcpkg integrate install
```

## Add to PATH

:::tip IMPORTANT NOTE
By default, `vcpkg` installs `x32-windows` packages. If you're running Visual Studio 2022, add an environment variable to set the default to `x64-windows`.
:::

```sh
# Add cloned directory to PATH
C:\dev\vcpkg
```

```sh
# Environment Variable

## Name
VCPKG_DEFAULT_TRIPLET

## Value
x64-windows
```

## Install Package

```sh
# Install package

# vcpkg install <name-of-package>
vcpkg install fmt
vcpkg install spdlog
```

## Use Package

```cpp
// Visual Studio .sln Project
#include <fmt/format.h>
```

```sh
# If the Visual Studio intellisense does not recogonize the packages
vcpkg integrate install
```
