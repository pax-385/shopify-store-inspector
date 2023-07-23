// Content script
let url = window.location.origin + '/meta.json';

// Sending a message to the background script to fetch the JSON data
chrome.runtime.sendMessage({cmd: 'FETCH_JSON', url: url}, function(response) {
    // Checking for any error in the response
    if (response.error) {
        console.error('Fetch error: ', response.error);
        return;
    }
    // If no error, store the JSON data in local storage
    chrome.storage.local.set({'metaJSON': response}, function() {
        console.log('Meta data saved');
    });
});
