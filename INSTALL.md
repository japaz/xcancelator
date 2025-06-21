# X Cancelator Extension Installation Guide

This extension redirects X.com and Twitter.com URLs to xcancel.com using modern Manifest V3 APIs.

**Requirements**: Latest versions of Safari (15.4+), Chrome, Firefox, or Edge

## Development Installation

For development and testing, use the root-level extension files (`manifest.json`, `content-script.js`, `popup.html`):

### Safari Development Installation

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
   - Navigate to and select the `xcancelator` folder (root directory)

4. **Enable the Extension**:
   - Check the box next to "X Cancelator" in the Extensions list
   - The extension should now be active

### iOS Safari Development Installation

**Note**: iOS Safari extensions cannot be installed directly. They must be delivered through an iOS app:

1. **Add iOS targets** to the Xcode project (see Safari App Store Submission section)
2. **Build and install** the iOS app on your device through Xcode
3. **Enable the extension** in iOS Settings → Safari → Extensions
4. **The extension will work** in Safari on iOS using the same code via symbolic links

### Chrome Development Installation

1. **Enable Developer Mode**:
   - Open Chrome and go to `chrome://extensions/`
   - Toggle "Developer mode" in the top right

2. **Load the Extension**:
   - Click "Load unpacked"
   - Navigate to and select the `xcancelator` folder (root directory)
   - The extension should appear in your extensions list

### Firefox Development Installation

1. **Load Temporary Extension**:
   - Open Firefox and go to `about:debugging`
   - Click "This Firefox" in the sidebar
   - Click "Load Temporary Add-on"
   - Navigate to the `xcancelator` folder and select `manifest.json`

### Edge Development Installation

1. **Enable Developer Mode**:
   - Open Edge and go to `edge://extensions/`
   - Toggle "Developer mode" in the left sidebar

2. **Load the Extension**:
   - Click "Load unpacked"
   - Navigate to and select the `xcancelator` folder (root directory)
   - The extension should appear in your extensions list
   - Click "Load unpacked"
   - Navigate to and select the `xcancelator` folder
   - The extension should appear in your extensions list

## App Store Distribution

### Safari App Store Submission

The Xcode project is now created and ready for App Store submission:

**Note**: The Xcode project uses relative symbolic links to share extension files with the root directory. This ensures the same code is used for development and production builds.

#### macOS Safari Extension

1. **Configure Bundle Identifiers**:
   - Open `Xcancelator.xcodeproj` in Xcode
   - Set unique bundle identifiers:
     - Main App: `com.yourname.xcancelator`
     - Extension: `com.yourname.xcancelator.Extension`

#### iOS Safari Extension Support

**Answer: Add "iOS Safari Extension" target (NOT "iOS Safari Extension App")**

To support Safari on iOS, add iOS targets to your existing Xcode project:

1. **Add iOS App Target**:
   - In Xcode, go to File → New → Target
   - Select "iOS" → "App" 
   - Choose "Storyboard" interface
   - Use bundle ID: `com.yourname.xcancelator.ios`

2. **Add iOS Safari Extension Target**:
   - File → New → Target
   - Select "iOS" → "Safari Extension" (NOT "Safari Extension App")
   - Link to same Resources folder via symbolic links
   - Use bundle ID: `com.yourname.xcancelator.ios.Extension`

3. **Result**: Universal app (macOS + iOS) sharing the same extension code

#### Build and Submit

2. **Add App Icons**:
   - See `ICONS.md` for required icon sizes
   - Add icons to the app target in Xcode

3. **Configure App Store Metadata**:
   - Set app category: Productivity
   - Add app description and keywords
   - Prepare screenshots

4. **Build and Submit**:
   ```bash
   # In Xcode:
   # 1. Product → Archive
   # 2. Window → Organizer
   # 3. Distribute App → App Store Connect
   # 4. Upload to App Store Connect
   ```

5. **App Store Connect**:
   - Complete app metadata
   - Add screenshots and descriptions
   - Submit for review

### Other Browser Stores

For other browsers, use the root-level extension files:

2. **Chrome Web Store**: 
   - Package: `manifest.json`, `content-script.js`, `popup.html`
   - Submit at: https://chrome.google.com/webstore/devconsole/

3. **Firefox Add-ons**: 
   - Package: `manifest.json`, `content-script.js`, `popup.html`
   - Submit at: https://addons.mozilla.org/developers/

4. **Edge Add-ons**: 
   - Package: `manifest.json`, `content-script.js`, `popup.html`
   - Submit at: https://partner.microsoft.com/dashboard/microsoftedge/

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
