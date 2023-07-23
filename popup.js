document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.runtime.sendMessage({
            cmd: 'FETCH_JSON', 
            url: new URL(tabs[0].url).origin + '/'
        }, response => {
            if (response.error !== undefined) {
                document.getElementById('error').innerText = "This website doesn't run on Shopify";
            } else {
                for (let [key, value] of Object.entries(response)) {
                    let p = document.createElement('p');
                    p.innerText = `${key}: ${value}`;
                    document.body.appendChild(p);
                }
            }
        });
    });
});
