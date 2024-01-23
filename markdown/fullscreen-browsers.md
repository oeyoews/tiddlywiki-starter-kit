---
title: 'fullscreen-browsers'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Apr 24 2023 16:18:44 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# fullscreen-browsers

```
```javascript
// ==UserScript==
// @name         Disable F Key in Input Fields and Toggle Full Screen
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Disables the F key in all input fields on all websites and toggles full screen mode when pressing the F key outside of input fields.
// @author       oeyoews
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        if (e.key === 'F') {
            e.preventDefault();
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
        }
    });
})();
```

<button>javascript</button>
```

```
```javascript
(function() {
    'use strict';

    let altKeyPressed = false;

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Alt') {
            altKeyPressed = true;
        }
        if (e.keyCode === 70 && altKeyPressed) {
            e.preventDefault();
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
        }
    });

    document.addEventListener('keyup', function(e) {
        if (e.key === 'Alt') {
            altKeyPressed = false;
        }
    });
})();
```

<button>javascript</button>
```
