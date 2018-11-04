# Slack Tomorrow Theme

A slack theme using Tomorrow Night colors

## Installation

Add this code in the end of the file `ssb-interop.js`:
- MacOS: `/Applications/Slack.app/Contents/Resources/app.asar.unpacked/src/static/ssb-interop.js`
- Windows: `C:\Users\<user>\AppData\Local\slack\app-<slack-version>\resources\app.asar.unpacked\src\static\ssb-interop.js`
```js
document.addEventListener('DOMContentLoaded', function() {
    $.ajax({
        url: 'https://cdn.rawgit.com/wdiazux/slack-tomorrow-theme/master/dist/custom.css',
        success: function(css) {
            $("<style></style>").appendTo('head').html(css)
        }
    });
});
```

## File Structure + Descriptions

    ├── dist                   # Webpack Production build output 
    ├── src                    # Source files
    ├── cert                   # Certificates
    ├── package.json           # NPM 
    ├── webpack.config.js      # Webpack Config file for dev server/production builds

## Edit theme

The source file is written in Sass, you can found `custom.scss` file inside the `src` folder.

These are the commands to generate the CSS file:

First you need to install depencies for wepack:
```bash
npm install
```

Command to generate CSS (custom.css):
```bash
npm run build
```

Command to modify the style live:
```bash
npm run start
```

**Note:** You also need to add the SSL certificate to the Keychain if you want to run the live edit.
