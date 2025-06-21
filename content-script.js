// X Cancelator - Modern Content Script (Manifest V3 compatible)
// Works with Chrome, Firefox, and Safari

(function() {
    'use strict';
    
    console.log('X Cancelator: Script starting on', window.location.href);
    
    // Prevent multiple runs
    if (window.xcancelatorExecuted) {
        console.log('X Cancelator: Already executed');
        return;
    }
    window.xcancelatorExecuted = true;
    
    // Helper function to check if URL should be redirected
    function shouldRedirect(url, referrer) {
        try {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname.toLowerCase();
            
            console.log('X Cancelator: Checking hostname:', hostname);
            
            // Check if this is an x.com or twitter.com URL
            const isXDomain = hostname === 'x.com' || hostname === 'www.x.com';
            const isTwitterDomain = hostname === 'twitter.com' || hostname === 'www.twitter.com';
            
            if (!isXDomain && !isTwitterDomain) {
                console.log('X Cancelator: Not a target domain');
                return null;
            }
            
            // Don't redirect if URL is exactly the root domain
            const isRootUrl = (urlObj.pathname === '/' || urlObj.pathname === '') && 
                             !urlObj.search && 
                             !urlObj.hash;
            
            if (isRootUrl) {
                console.log('X Cancelator: Root domain, not redirecting');
                return null;
            }
            
            // Check if the referrer is from the same domain
            if (referrer) {
                try {
                    const referrerObj = new URL(referrer);
                    const referrerHostname = referrerObj.hostname.toLowerCase();
                    
                    const isFromX = referrerHostname === 'x.com' || referrerHostname === 'www.x.com';
                    const isFromTwitter = referrerHostname === 'twitter.com' || referrerHostname === 'www.twitter.com';
                    
                    if (isFromX || isFromTwitter) {
                        console.log('X Cancelator: Same domain referrer, not redirecting');
                        return null;
                    }
                } catch (e) {
                    console.log('X Cancelator: Invalid referrer, continuing with redirect');
                }
            }
            
            // Create the xcancel.com URL
            let newUrl = 'https://xcancel.com' + urlObj.pathname;
            if (urlObj.search) {
                newUrl += urlObj.search;
            }
            if (urlObj.hash) {
                newUrl += urlObj.hash;
            }
            
            return newUrl;
        } catch (e) {
            console.error('X Cancelator: Error processing URL:', e);
            return null;
        }
    }
    
    // Main redirect logic
    function performRedirect() {
        const currentUrl = window.location.href;
        const referrer = document.referrer;
        
        console.log('X Cancelator: Current URL:', currentUrl);
        console.log('X Cancelator: Referrer:', referrer);
        
        const redirectUrl = shouldRedirect(currentUrl, referrer);
        
        if (redirectUrl) {
            console.log('X Cancelator: Redirecting to:', redirectUrl);
            
            // Use replace() to avoid adding to browser history
            window.location.replace(redirectUrl);
        } else {
            console.log('X Cancelator: No redirect needed');
        }
    }
    
    // Execute redirect check
    if (document.readyState === 'loading') {
        // If document is still loading, wait for it to be ready
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(performRedirect, 50); // Small delay to ensure page is ready
        });
    } else {
        // Document is already ready
        setTimeout(performRedirect, 50);
    }
    
})();
