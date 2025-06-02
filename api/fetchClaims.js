const LOCATION_ENDPOINT = "https://api.va.gov/v0/benefits_claims";

export default function fetchClaims() {
    fetch(LOCATION_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            var claimsList = new ClaimModel({
                claimId: data.data.id,
                claimType: data.data.attributes.claim_type,
                attributes: []
            });

            claimsList.attributes = data.data.attributes.claims_attributes;

            chrome.storage.local.set({ claims: claimsList });
            console.log(claimsList);
        })
        .catch(error => {
            console.log(error);
        })
}

// Model for disability claims
export class ClaimModel {
    constructor({
        claimId,
        claimType,
        attributes = []
    }) {
        this.claimId = id;
        this.claimType = claimType;
        this.attributes = [];
    }
}

// Model for individual claim attributes
export class ClaimAttributeModel {
    constructor({
        claimTypeCode = null, 
        claimType = '',
        claimDate = null, 
        status = '',
        closeDate = null
    }) {
        this.claimTypeCode, 
        this.claimType,
        this.claimDate, 
        this.status,
        this.closeDate
    }

    /* 
    attributes: 
        baseEndProductCode: "510"
    x    claimDate: "2025-02-24"
        claimPhaseDates: 
            phaseChangeDate: "2025-03-13"
            phaseType: "COMPLETE"
    x    claimType: "Freedom of Information Act / Privacy Act Request"
    x    claimTypeCode: "510PAR"
        closeDate: "2025-03-13"
        decisionLetterSent: true
        developmentLetterSent: true
        documentsNeeded: false
        endProductCode: "518"
        evidenceWaiverSubmitted5103: false
        lighthouseId: null
        status: "COMPLETE"    
    */
}