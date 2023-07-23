chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.cmd === 'FETCH_JSON') {
        fetch(request.url + 'meta.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Not a Shopify website"); // If response is not okay, throw an error
                }
                return response.json(); // If response is okay, return the JSON
            })
            .then(data => sendResponse(data)) // Send data to popup
            .catch(error => sendResponse({ error: error.toString() })); // Catch any error and send to popup
        return true; // Enables async response
    }
});
