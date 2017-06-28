import AutocompleteService = google.maps.places.AutocompleteService;
import PlacesServiceStatus = google.maps.places.PlacesServiceStatus;
import AutocompletePrediction = google.maps.places.AutocompletePrediction;

export function fetchGooglePredictions(text: string, callback: (result: AutocompletePrediction[]) => void) {
    let service = new AutocompleteService();
    let options = {
        input: text,
        componentRestrictions: {country: 'sg'}
    };
    service.getPlacePredictions(options, (result, status) => {
        if (status !== PlacesServiceStatus.OK) {
            callback([]);
        } else {
            callback(result);
        }
    });
}