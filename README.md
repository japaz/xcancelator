# X Cancelator - Cross-Browser Extension

A modern cross-browser extensio```shell
xcancelator/
├── content-script.js                 # Extension logic (dev/testing + linked to Xcode)
├── manifest.json                     # Extension manifest (dev/testing)
├── popup.html                       # Extension popup (dev/testing + linked to Xcode)
├── test.js                         # Test script
├── INSTALL.md                      # Installation & distribution guide
├── README.md                       # This file
├── ICONS.md                        # Icon guidelines
├── package.json                    # Project metadata
└── Xcancelator/                    # Xcode project (Safari App Store)
    ├── Xcancelator.xcodeproj/      # Xcode project file
    ├── Xcancelator/                # Main macOS app
    ├── Xcancelator Extension/      # Safari Extension
    │   └── Resources/
    │       ├── content.js          # → relative symlink to ../../../content-script.js
    │       ├── manifest.json       # Safari-specific manifest
    │       └── popup.html          # → relative symlink to ../../../popup.html
    ├── XcancelatorTests/           # Unit tests
    └── XcancelatorUITests/         # UI tests
```lly redirects X.com and Twitter.com URLs to xcancel.com, with intelligent filtering to avoid unnecessary redirects.

## Features

- 🔄 **Smart Redirects**: Automatically redirects X.com and Twitter.com URLs to xcancel.com
- 🏠 **Root Domain Protection**: Skips redirects for root domains (x.com, twitter.com)
- 🔗 **Same-Domain Navigation**: Prevents redirects when navigating within X.com/Twitter.com
- 📍 **URL Preservation**: Maintains paths, query parameters, and hash fragments
- 🚀 **Lightweight**: Minimal performance impact

## How It Works

The extension monitors web navigation and applies these rules:

1. **Target URLs**: Only processes URLs from x.com, www.x.com, twitter.com, www.twitter.com
2. **Root Domain Filter**: Skips redirect if URL is exactly the root domain (e.g., `https://x.com/` or `https://twitter.com/`)
3. **Same-Domain Filter**: Skips redirect if the user is navigating from another X.com/Twitter.com page
4. **URL Mapping**: Redirects to xcancel.com while preserving the original path and parameters

### Examples

✅ **Will Redirect:**

- `https://x.com/elonmusk` → `https://xcancel.com/elonmusk`
- `https://twitter.com/user/status/123` → `https://xcancel.com/user/status/123`
- `https://x.com/search?q=test` → `https://xcancel.com/search?q=test`

❌ **Will NOT Redirect:**

- `https://x.com/` (root domain)
- `https://twitter.com/` (root domain)
- Navigation from one X.com page to another X.com page

## Quick Start

### Installation

1. **Safari 15.4+**: Enable Developer Mode → Allow Unsigned Extensions → Load extension folder
2. **Chrome/Edge**: Enable Developer Mode → Load unpacked extension
3. **Firefox**: Load Temporary Add-on from `about:debugging`

For detailed instructions, see `INSTALL.md`.

### Test the Extension

- ✅ Navigate to `https://x.com/test` → Should redirect to `https://xcancel.com/test`
- ❌ Navigate to `https://x.com/` → Should NOT redirect (root domain)

## Detailed Installation

### Quick Setup

1. Clone this repository
2. Follow the browser-specific installation steps in `INSTALL.md`
   - **Safari**: Enable developer mode and load unpacked extension
   - **Chrome/Edge**: Enable developer mode and load unpacked extension  
   - **Firefox**: Load temporary add-on

### For Distribution

The project is ready for distribution:

- **Safari**: Xcode project created - ready for App Store submission
  - **macOS Safari**: Ready for Mac App Store
  - **iOS Safari**: Add iOS targets to existing Xcode project (see INSTALL.md)
- **Chrome**: Use root-level extension files for Chrome Web Store
- **Firefox**: Use root-level extension files for Firefox Add-ons
- **Edge**: Use root-level extension files for Microsoft Edge Add-ons

For detailed submission instructions, see `INSTALL.md`.

## Files Structure

```shell
xcancelator/
├── manifest.json                     # Extension manifest (for dev/testing)
├── content-script.js                 # Extension logic (for dev/testing)
├── popup.html                       # Extension popup (for dev/testing)
├── test.js                         # Test script
├── INSTALL.md                      # Installation & distribution guide
├── README.md                       # This file
├── ICONS.md                        # Icon guidelines
├── package.json                    # Project metadata
└── Xcancelator/                    # Xcode project (Safari App Store)
    ├── Xcancelator.xcodeproj/      # Xcode project file
    ├── Xcancelator/                # Main macOS app
    ├── Xcancelator Extension/      # Safari Extension
    ├── XcancelatorTests/           # Unit tests
    └── XcancelatorUITests/         # UI tests
```

## Browser Compatibility

**Supported Browsers (Latest Versions)**

- **Safari 15.4+**: Full Manifest V3 support ✅
  - **macOS**: Available through Mac App Store
  - **iOS**: Requires iOS app with Safari Extension (see INSTALL.md)
- **Chrome 88+**: Full Manifest V3 support ✅  
- **Firefox 109+**: Full Manifest V3 support ✅
- **Edge 88+**: Full Manifest V3 support ✅

**Requirements**: This extension requires the latest versions of supported browsers for optimal compatibility and security.

## Technical Details

The extension uses a modern content script approach:

- **Content Script**: Runs on X.com/Twitter.com pages and performs redirects
- **Manifest V3**: Uses the latest extension APIs for all supported browsers
- **Smart Logic**: Avoids root domains and same-domain navigation
- **Cross-Browser**: Universal compatibility across Safari, Chrome, Firefox, and Edge

## Privacy

This extension:

- ✅ Only monitors X.com and Twitter.com domains
- ✅ Does not collect or store any user data
- ✅ Processes URLs locally on your device
- ✅ Does not send data to external servers

## License

MIT License - Feel free to use, modify, and distribute.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## Support

If you encounter any issues or have suggestions, please open an issue on the project repository.
