# Slack Tomorrow Theme

A slack theme using Tomorrow Night colors

# Installation

Add this code in the end of the file `ssb-interop.js`:
- MacOS: `/Applications/Slack.app/Contents/Resources/app.asar.unpacked/src/static/ssb-interop.js`
- Windows: `C:\Users\<user>\AppData\Local\slack\app-<slack-version>\resources\app.asar.unpacked\src\static\ssb-interop.js`
```js
document.addEventListener('DOMContentLoaded', function() {
    $.ajax({
        url: 'https://cdn.rawgit.com/wdiazux/slack-tomorrow-theme/master/custom.css',
        success: function(css) {
            $("<style></style>").appendTo('head').html(css)
        }
    });
});
```
