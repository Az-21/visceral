# Configuration

## Config File

- Configuration file can be found in `simplify\config\config.json`
- Open this file with Notepad (or your IDE).
- Edit the parameters to modify the behavior of app.

## Default Library Path

This is the default location of your library.

```json:no-line-numbers
// Configuration file
"LibraryPath": "C:\\User\\<user>\\Videos"
```

```sh:no-line-numbers
# Terminal
simplify    # No directory argument is provided
```

If no directory argument is provided, the `LibraryPath` will be considered automatically.

## Include Sub-folders

```json:no-line-numbers
// Configuration file
"GetAllDirectories": true
```

- `true` ⟶ Include **all** sub-folders.
- `false` ⟶ Rename only the top level contents.

## Extensions

This is a **comma-separated** list of extension which will be renamed.

```json:no-line-numbers
// Configuration file
"Extensions": "mkv, mp4"
```

#### Sample I/O

```md:no-line-numbers
# Input
movie a.mp4             // `mp4` is present in `"Extensions"`
movie b.mov             // `mov` is not present in `"Extensions"`

# Output
Movie A.mp4             // Renamed
movie b.mov             // Untouched
```

## Blacklist

This is a **comma-separated** list of words and characters which will be replaced by empty space.

```json:no-line-numbers
// Configuration file
"Blacklist": "., -, _, webrip, x256, HEVC, camrip, nogrp, ddp5, x264"

// NOTE: blacklisted words are case sensitive
```

::: warning
Do not add standard English **letters** and **short words** in the blacklist. The program is not context aware, and it will remove every occurrence of blacklisted word/character.
:::

#### Sample I/O

```md:no-line-numbers
# Input
movie-a_webrip.x264.mp4

# Output
Movie A.mp4
```

## Remove Parentheses

```json:no-line-numbers
// Configuration file
"RemoveCurvedBracket": true
```

- `true` ⟶ remove parentheses and the text within it.
- `false` ⟶ keep parentheses and the text within it `(text)`.

#### Sample I/O

```md:no-line-numbers
# Input
movie a (OPUS GroupX UploaderY).mp4

# Output
Movie A.mp4
```

## Remove Square Brackets

```json:no-line-numbers
// Configuration file
"RemoveSquareBracket": true
```

- `true` ⟶ remove square bracket and the text within it.
- `false` ⟶ keep square bracket and the text within it `[text]`.

#### Sample I/O

```md:no-line-numbers
# Input
[GroupX UploaderY] movie a [HEVC x256 OPUS].mp4

# Output
Movie A.mp4
```

## Replace Space

Replace the spaces in the file/folder name to make them CLI friendly.

```json:no-line-numbers
// Configuration file
"IsCliFriendly": true,      // default: false
"CliSeparator": "-"
```

- `true` ⟶ replace spaces in filename with `CliSeparator`.
- `false` ⟶ retain spaces in filename.

#### Sample I/O

```md:no-line-numbers
# Input
movie a.mp4

# Output
Movie-A.mp4
```
