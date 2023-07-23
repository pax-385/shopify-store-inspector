document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.runtime.sendMessage({
            cmd: 'FETCH_JSON', 
            url: new URL(tabs[0].url).origin + '/'
        }, response => {
            // Extend the loading time by 1s
            setTimeout(function() {
                document.getElementById('loader').style.display = 'none'; // Hide the loader

                if (response.error !== undefined) {
                    document.getElementById('error').innerText = "This website doesn't run on Shopify";
                    document.getElementById('error').style.display = 'block';
                } else {
                    for (let [key, value] of Object.entries(response)) {
                        let p = document.createElement('p');
                        p.innerText = `${key}: ${value}`;
                        document.getElementById('data').appendChild(p);
                    }
                }
            }, 1000);
        });
    });
});
