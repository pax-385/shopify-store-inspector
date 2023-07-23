// fetchScript.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.contentScriptQuery === "fetchMetaJSON") {
        const metaUrl = `${message.url}/meta.json`;

        fetch(metaUrl)
            .then(response => response.json())
            .then(data => {
                // Send a message back to the background script
                chrome.runtime.sendMessage({ data });
            })
            .catch(error => {
                // Send a message back to the background script
                chrome.runtime.sendMessage({ error: error.toString() });
            });
    }
});
