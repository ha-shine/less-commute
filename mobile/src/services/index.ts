import AutocompleteService = google.maps.places.AutocompleteService;
import PlacesServiceStatus = google.maps.places.PlacesServiceStatus;
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import DirectionsService = google.maps.DirectionsService;
import DirectionsRequest = google.maps.DirectionsRequest;
import TransitRoutePreference = google.maps.TransitRoutePreference;
import TravelMode = google.maps.TravelMode;
import DirectionsStatus = google.maps.DirectionsStatus;
import DirectionsResult = google.maps.DirectionsResult;
import TransitOptions = google.maps.TransitOptions;
import TransitMode = google.maps.TransitMode;

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

export function getGoogleDirection(from: AutocompletePrediction, to: AutocompletePrediction, time: Date,
                                   callback: (result: DirectionsResult) => void) {
    const service = new DirectionsService();
    const transitOptions: TransitOptions = {
        departureTime: time,
        modes: [TransitMode.BUS, TransitMode.RAIL, TransitMode.SUBWAY, TransitMode.TRAIN, TransitMode.TRAM],
        routingPreference: TransitRoutePreference.FEWER_TRANSFERS
    };
    const request: DirectionsRequest = {
        origin: {'placeId': from.place_id},
        destination: {'placeId': to.place_id},
        travelMode: TravelMode.TRANSIT,
        transitOptions: transitOptions,
        provideRouteAlternatives: true
    };
    service.route(request, (result, status) => {
        if (status === DirectionsStatus.OK) {
            callback(result);
        }
    });
}