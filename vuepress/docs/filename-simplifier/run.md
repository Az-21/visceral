# Run

## Prepare for Launch

- If you have added the program to PATH, open your terminal.

- If you have not added the program to PATH, `Shift` + `Right Click` in the `simplify` folder and select 'Open Powershell Window Here'.

::: tip INFO
Further documentation assumes you have added the program to PATH. Replace `simplify` with `.\simplify.exe` to achieve the same effect.
:::

## Simplify Library

```sh
# Perform a preview run (no changes will be made)
simplify 'C:/PathOfLibrary'

# Perform a permanent run
simplify 'C:/PathOfLibrary' --rename
```

## Include Folders

Unlike files, folders do not have extensions. This makes them difficult to scope. By default, folders are not renamed. This is to prevent undesired changes.

To include folders, pass `--includefolders` flag.

```sh
# Perform a preview run (no changes will be made)
simplify 'C:/PathOfLibrary' --includefolders

# Perform a permanent run
simplify 'C:/PathOfLibrary' --includefolders --rename
```