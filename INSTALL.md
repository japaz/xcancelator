# X Cancelator Extension Installation Guide

This extension redirects X.com and Twitter.com URLs to xcancel.com using modern Manifest V3 APIs.

**Requirements**: Latest versions of Safari (15.4+), Chrome, Firefox, or Edge

## Safari Installation

1. **Enable Developer Mode**:
   - Open Safari
   - Go to Safari → Settings → Advanced
   - Check "Show Develop menu in menu bar"

2. **Allow Unsigned Extensions**:
   - Go to Develop → Allow Unsigned Extensions
   - This allows loading the extension for development/testing

3. **Load the Extension**:
   - Go to Safari → Settings → Extensions
   - Click the "+" button in the bottom left
   - Navigate to and select the `xcancelator` folder

4. **Enable the Extension**:
   - Check the box next to "X Cancelator" in the Extensions list
   - The extension should now be active

## Chrome Installation

1. **Enable Developer Mode**:
   - Open Chrome and go to `chrome://extensions/`
   - Toggle "Developer mode" in the top right

2. **Load the Extension**:
   - Click "Load unpacked"
   - Navigate to and select the `xcancelator` folder
   - The extension should appear in your extensions list

## Firefox Installation

1. **Load Temporary Extension**:
   - Open Firefox and go to `about:debugging`
   - Click "This Firefox" in the sidebar
   - Click "Load Temporary Add-on"
   - Navigate to the `xcancelator` folder and select `manifest.json`

## Edge Installation

1. **Enable Developer Mode**:
   - Open Edge and go to `edge://extensions/`
   - Toggle "Developer mode" in the left sidebar

2. **Load the Extension**:
   - Click "Load unpacked"
   - Navigate to and select the `xcancelator` folder
   - The extension should appear in your extensions list

## App Store Distribution (For public release)

To distribute this extension publicly, you'll need to:

1. **Safari App Store**:

   ```bash
   # Open Xcode and create a new project
   # Choose "macOS" → "Safari Extension App"
   ```

   - Copy `manifest.json`, `content-script.js`, and `popup.html` to the Safari Extension folder
   - Set a unique bundle identifier (e.g., `com.yourname.xcancelator`)
   - Build and submit to the Mac App Store

2. **Chrome Web Store**: Submit the extension folder directly

3. **Firefox Add-ons**: Submit the extension folder directly

4. **Edge Add-ons**: Submit the extension folder directly

## Testing the Extension

After installation, test with these URLs:

### Should Redirect

- `https://x.com/elonmusk` → `https://xcancel.com/elonmusk`
- `https://twitter.com/user/status/123456` → `https://xcancel.com/user/status/123456`
- `https://x.com/search?q=test` → `https://xcancel.com/search?q=test`

### Should NOT Redirect

- `https://x.com/` (root domain)
- `https://twitter.com/` (root domain)
- Clicking links within X.com/Twitter.com (same-domain navigation)

## Troubleshooting

### Extension Not Working - Step by Step Debug

1. **First, verify the extension is loaded**:
   - **Safari**: Go to Safari → Settings → Extensions, make sure "X Cancelator" is checked
   - **Chrome**: Go to `chrome://extensions/`, ensure the extension is enabled
   - **Firefox**: Go to `about:addons`, check that the extension is enabled
   - **Edge**: Go to `edge://extensions/`, ensure the extension is enabled

2. **Check Browser Console**:
   - Open Developer Tools (F12 or right-click → Inspect)
   - Open the Console tab
   - Navigate to `https://x.com/elonmusk`
   - Look for "X Cancelator" messages in the console
   - If you see no messages, the content script isn't loading

3. **Verify Extension Permissions**:
   - The extension should request access to x.com and twitter.com
   - Make sure you granted these permissions

4. **Test with Simple URL**:
   - Try `https://x.com/test` (should redirect to `https://xcancel.com/test`)
   - Try `https://x.com/` (should NOT redirect - root domain)

5. **Reload Extension**:
   - Disable and re-enable the extension in your browser settings
   - For Chrome/Edge: Use the reload button on the extensions page
   - For Firefox: Reload the temporary add-on

### "Non-persistent background content cannot listen to webRequest events"

This error has been fixed in the latest version:

- The extension now uses content scripts instead of background scripts
- No webRequest API usage (Safari incompatible)
- Simplified approach that works with all browser restrictions

### Still Not Working?

Try this manual test:

1. Open Browser Developer Console (F12 or right-click → Inspect)
2. Go to `https://x.com/elonmusk`
3. In the console, paste and run:

   ```javascript
   window.location.href = 'https://xcancel.com/elonmusk'
   ```

4. If this works, the issue is with the extension loading

### Extension Not Loading

1. Check that the extension is enabled in your browser's extension settings
2. For Safari: Verify that "Allow Unsigned Extensions" is enabled (for developer installation)
3. Try restarting your browser
4. Check the browser console for any error messages

### Debugging

1. Open Developer Tools (F12 or right-click → Inspect)
2. Go to the Console tab to see any error messages
3. Look for "X Cancelator" log messages

### Permissions

- The extension only requests permissions for x.com and twitter.com domains
- No personal data is collected or transmitted
- All processing happens locally on your device

## Uninstalling

To remove the extension:

### Safari
1. Go to Safari → Settings → Extensions
2. Uncheck "X Cancelator" to disable
3. Click the "Uninstall" button to completely remove

### Chrome/Edge
1. Go to `chrome://extensions/` or `edge://extensions/`
2. Click "Remove" on the X Cancelator extension

### Firefox
1. Go to `about:addons`
2. Click the three dots next to X Cancelator
3. Select "Remove"

## Security Notes

- This extension only monitors and redirects X.com/Twitter.com URLs
- No user data is collected, stored, or transmitted
- All redirect logic runs locally on your device
- The extension cannot access other websites or your browsing history beyond the specified domains
