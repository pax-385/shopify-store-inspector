// Wait until the HTML document is fully loaded and parsed
document.addEventListener('DOMContentLoaded', function () {

    // Define a mapping from JSON field names to user-friendly names
    let fieldNameMapping = {
        'id': 'Store ID',
        'name': 'Store Name',
        'city': 'City',
        'province': 'Province',
        'country': 'Country',
        'currency': 'Currency',
        'domain': 'Domain',
        'url': 'URL',
        'myshopify_domain': 'MyShopify Domain',
        'description': 'Description',
        'ships_to_countries': 'Ships To Countries',
        'money_format': 'Money Format',
        'published_collections_count': 'Published Collections Count',
        'published_products_count': 'Published Products Count',
        'shopify_pay_enabled_card_brands': 'Shopify Pay Enabled Card Brands',
        'offers_shop_pay_installments': 'Offers Shop Pay Installments'
    };

    // Query the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Send a message to the background script to fetch the JSON data from the meta.json file at the root of the active tab's domain
        chrome.runtime.sendMessage({
            cmd: 'FETCH_JSON',
            url: new URL(tabs[0].url).origin + '/'
        }, response => {
            // Wait 1s to artificially extend the loading time
            setTimeout(function () {
                // Hide the loading spinner
                document.getElementById('loader').style.display = 'none';

                // If there was an error fetching the JSON data (i.e., the website doesn't run on Shopify)
                if (response.error !== undefined) {
                    // Display an error message
                    document.getElementById('error').innerText = "This website doesn't run on Shopify";
                    // Make the error message visible
                    document.getElementById('error').style.display = 'block';
                } else {
                    // If there was no error (i.e., the website does run on Shopify and a valid JSON was fetched)

                    // Iterate over each key-value pair in the response
                    for (let [key, value] of Object.entries(response)) {
                        // Create a new paragraph element
                        let p = document.createElement('p');
                        // Use the user-friendly name from the mapping if it exists, otherwise use the original key
                        let displayName = fieldNameMapping[key] ? fieldNameMapping[key] : key;
                        // If the value is an array, join all its elements into a string, otherwise just use the original value
                        let displayValue = Array.isArray(value) ? value.join(', ') : value;
                        // Set the HTML content of the paragraph to the display name and value
                        p.innerHTML = '<strong>' + displayName + '</strong>' + ': ' + displayValue;
                        // Append the paragraph to the 'data' element
                        document.getElementById('data').appendChild(p);
                    }
                }
            }, 1000);
        });
    });
});
