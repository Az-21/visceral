# AutoHotkey Setup

```clojure
#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir% ; Ensures a consistent starting directory.

; Left click and middle click
XButton1::MButton
XButton2::LButton

; Volume
XButton1 & WheelUp::Send {Volume_Up}
XButton1 & WheelDown::Send {Volume_Down}

; Switch app
XButton1 & XButton2::AltTab

; Google selected text
XButton1 & G::
    clipboard=
    Send, ^c
    Sleep 0025
    Run, http://www.google.com/search?q=%clipboard%
Return
```
