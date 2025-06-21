#!/usr/bin/env node

// Test script for X Cancelator extension logic
// This script tests the redirect logic without browser APIs

// Mock the shouldRedirect function from background.js
function shouldRedirect(url, referrer) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    // Check if this is an x.com or twitter.com URL
    const isXDomain = hostname === 'x.com' || hostname === 'www.x.com';
    const isTwitterDomain = hostname === 'twitter.com' || hostname === 'www.twitter.com';
    
    if (!isXDomain && !isTwitterDomain) {
      return null;
    }
    
    // Don't redirect if URL is exactly the root domain
    const isRootUrl = (urlObj.pathname === '/' || urlObj.pathname === '') && 
                     !urlObj.search && 
                     !urlObj.hash;
    
    if (isRootUrl) {
      console.log('❌ Skipping redirect for root domain:', url);
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
          console.log('❌ Skipping redirect - referrer from same domain:', referrer);
          return null;
        }
      } catch (e) {
        // Invalid referrer URL, continue with redirect
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
    console.error('Error processing URL:', e);
    return null;
  }
}

// Test cases
const testCases = [
  // Should redirect
  {
    url: 'https://x.com/elonmusk',
    referrer: null,
    expected: 'https://xcancel.com/elonmusk',
    description: 'X.com user profile'
  },
  {
    url: 'https://twitter.com/user/status/123456',
    referrer: null,
    expected: 'https://xcancel.com/user/status/123456',
    description: 'Twitter status URL'
  },
  {
    url: 'https://x.com/search?q=test&src=typed_query',
    referrer: null,
    expected: 'https://xcancel.com/search?q=test&src=typed_query',
    description: 'X.com search with query params'
  },
  {
    url: 'https://twitter.com/hashtag/javascript',
    referrer: 'https://google.com',
    expected: 'https://xcancel.com/hashtag/javascript',
    description: 'Twitter hashtag from external referrer'
  },
  
  // Should NOT redirect
  {
    url: 'https://x.com/',
    referrer: null,
    expected: null,
    description: 'X.com root domain'
  },
  {
    url: 'https://twitter.com/',
    referrer: null,
    expected: null,
    description: 'Twitter root domain'
  },
  {
    url: 'https://x.com/elonmusk',
    referrer: 'https://x.com/home',
    expected: null,
    description: 'X.com navigation from same domain'
  },
  {
    url: 'https://twitter.com/user/status/123',
    referrer: 'https://twitter.com/notifications',
    expected: null,
    description: 'Twitter navigation from same domain'
  },
  {
    url: 'https://example.com/test',
    referrer: null,
    expected: null,
    description: 'Non-target domain'
  }
];

console.log('🧪 Testing X Cancelator redirect logic...\n');

let passed = 0;
let failed = 0;

testCases.forEach((testCase, index) => {
  const result = shouldRedirect(testCase.url, testCase.referrer);
  const success = result === testCase.expected;
  
  console.log(`Test ${index + 1}: ${testCase.description}`);
  console.log(`  URL: ${testCase.url}`);
  console.log(`  Referrer: ${testCase.referrer || 'none'}`);
  console.log(`  Expected: ${testCase.expected || 'no redirect'}`);
  console.log(`  Result: ${result || 'no redirect'}`);
  console.log(`  Status: ${success ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');
  
  if (success) {
    passed++;
  } else {
    failed++;
  }
});

console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('🎉 All tests passed! The extension logic is working correctly.');
} else {
  console.log('⚠️  Some tests failed. Please check the logic.');
  process.exit(1);
}
