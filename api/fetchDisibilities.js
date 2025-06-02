const LOCATION_ENDPOINT = "https://api.va.gov/v0/rated_disabilities";

export default function fetchDisabilities() {
    // Fetch disabilities from the VA API
    // and filter the data to include only the necessary fields
    fetch(LOCATION_ENDPOINT)
        .then(response => response.json())
        .then(disability => {
            var disabilitiesList = new DisabilityModel({
                combinedRating: disability.data.attributes.combined_disability_rating,
                combinedEffectiveDate: disability.data.attributes.combined_effective_date,
                legalEffectiveDate: disability.data.attributes.legal_effective_date,
                individualRatings: []
            });
            disabilitiesList.individualRatings = disability.data.attributes.individual_ratings;

            chrome.storage.local.set({ disabilities: disabilitiesList });
            console.log(disabilitiesList);
        })
        .catch(error => {
            console.log(error);
        })
}

// Model for an individual rating
export class IndividualRatingModel {
    constructor({
        decision,
        diagnostic_text,
        diagnostic_type_code,
        diagnostic_type_name,
        disability_rating_id,
        effective_date,
        rating_end_date,
        rating_percentage,
        static_ind
    }) {
        this.decision = decision;
        this.diagnosticText = diagnostic_text;
        this.diagnosticCode = diagnostic_type_code;
        this.diagnosticName = diagnostic_type_name;
        this.ratingId = disability_rating_id;
        this.effectiveDate = effective_date;
        this.ratingEndDate = rating_end_date;
        this.rating = rating_percentage;
        this.isStatic = static_ind;
    }
}

// Model for the top-level disability data
export class DisabilityModel {
    constructor({
        combined_disability_rating = 0,
        combined_effective_date = null,
        legal_effective_date = null,
        individual_ratings = []
    }) {
        this.combinedRating = combined_disability_rating;
        this.combinedEffectiveDate = combined_effective_date;
        this.legalEffectiveDate = legal_effective_date;
        this.individualRatings = [];
    }
}