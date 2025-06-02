import fetchDisabilities from "./api/fetchDisibilities.js";
import fetchClaims from "./api/fetchClaims.js";

chrome.runtime.onInstalled.addListener(details => {
    fetchDisabilities()
})

chrome.runtime.onMessage.addListener(data => {
    const { event, perfs } = data

    if (event === 'refresh') {
        switch (perfs.typeToView) {
            case 'disabilitiesList':
                handleDisabilities()
                break;
            case 'claimsList':
                handleClaims()
                break;
            default:
                break;
        }
        // Save the refreshed data locally
        chrome.storage.local.set(perfs);
    }

})

const handleClaims = () => {
    fetchClaims()
    console.log('Claims ::: passed to background');
}

const handleDisabilities = () => {
    fetchDisabilities()
    console.log('Disabilities ::: passed to background');
}
