// Elements
const disabilityRowsElement = document.getElementById('disabilityRows');
const claimsRowsElement = document.getElementById('claimsRows');
const viewerTypeElement = document.getElementById('viewerType');

// Button Elements
const goButtonElement = document.getElementById('goButton');
const refreshButtonElement = document.getElementById('refreshButton');
const clearDataButtonElement = document.getElementById('clearDataButton');

refreshButtonElement.onclick = () => {
    const perfs = {
        typeToView: viewerTypeElement.value
    }

    chrome.runtime.sendMessage({ event: 'refresh', perfs })

    if (viewerTypeElement.value === 'disabilitiesList') {
        chrome.storage.local.get(["disabilities"], (result) => {
            const { disabilities } = result;
            if (disabilities) {
                populateDisabilitiesTable(disabilities);
            } else {
                populateDisabilitiesTable([]);
            }
        });
    }

    if (viewerTypeElement.value === 'claimsList') {
        chrome.storage.local.get(["claims"], (result) => {
            const { claims } = result;
            if (claims) {
                populateClaimsTable(claims);
            } else {
                populateClaimsTable([]);
            }
        });
    }
}

goButtonElement.onclick = () => {
    const perfs = {
        typeToView: viewerTypeElement.value
    }
    chrome.runtime.sendMessage({ event: 'buttonClicked', perfs });
    //console.log("Viewer Selected: ", viewerTypeElement.value);
}

clearDataButtonElement.onclick = () => {
    chrome.storage.local.clear(() => {
        disabilityRowsElement.innerHTML = '';
        claimsRowsElement.innerHTML = '';
    });
}

chrome.storage.local.get(["typeToView"], (result) => {
    const { typeToView } = result;

    if (typeToView) {
        viewerTypeElement.value = typeToView;
    }
})

chrome.storage.local.get(["disabilities"], (result) => {
    const { disabilities } = result;

    setDisabilities(result.disabilities.individualRatings || []);

    if (disabilities) {
        populateDisabilitiesTable(disabilities);
    } else {
        populateDisabilitiesTable([]);
    }
})

chrome.storage.local.get(["claims"], (result) => {
    const { claims } = result;

    setClaims(result.claims.attributes || []);

    if (claims) {
        populateClaimsTable(claims);
    } else {
        populateClaimsTable([]);
    }
})

const setDisabilities = (disabilities) => {
    disabilities?.forEach(disability => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${disability.diagnostic_type_code || ''}
                ${disability.hyph_diagnostic_type_code ? ` [${disability.hyph_diagnostic_type_code}]` : ''}
            </td>
            <td>${disability.decision || ''}</td>
            <td>${disability.diagnostic_type_name || ''}</td>
            <td>${disability.rating_percentage || ''}</td>
        `;
        disabilityRowsElement.appendChild(row);
    });
}

const setClaims = (claims) => {
    claims?.forEach(claim => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${claim.id || ''}</td>
            <td>${claim.type || ''}</td>
        `;
        claimsRowsElement.appendChild(row);
    });
}
