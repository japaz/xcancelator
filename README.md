# X Cancelator - Cross-Browser Extension

A modern cross-browser extension that automatically redirects X.com and Twitter.com URLs to xcancel.com, with intelligent filtering to avoid unnecessary redirects.

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

Submit the extension folder to the respective browser stores:

- **Safari**: Mac App Store (requires Xcode project wrapper)
- **Chrome**: Chrome Web Store
- **Firefox**: Firefox Add-ons
- **Edge**: Microsoft Edge Add-ons

## Files Structure

```shell
xcancelator/
├── manifest.json         # Manifest V3 for all modern browsers
├── content-script.js     # Universal extension logic
├── popup.html           # Extension popup interface
├── test.js              # Test script (all tests passing ✅)
├── INSTALL.md           # Installation instructions
├── README.md            # This file
├── ICONS.md             # Icon guidelines
└── package.json         # Project metadata
```

## Browser Compatibility

**Supported Browsers (Latest Versions)**

- **Safari 15.4+**: Full Manifest V3 support ✅
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
