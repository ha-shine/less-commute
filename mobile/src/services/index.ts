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
import DirectionsStep = google.maps.DirectionsStep;
import UnitSystem = google.maps.UnitSystem;

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
        provideRouteAlternatives: true,
        unitSystem: UnitSystem.METRIC
    };
    service.route(request, (result, status) => {
        if (status === DirectionsStatus.OK) {
            callback(result);
        }
    });
}

export function calculateFare(step: DirectionsStep): number {
    const busNo = step.transit.line.short_name;
    const distance = step.distance.value;
    if (step.transit.line.vehicle.type.toString() === 'BUS') {
        if (isExpressBus(busNo)) {
            return calculateExpreeBusFareInCents(distance) / 100;
        } else if (isChinatownDirectBus(busNo)) {
            return 2;
        } else if (isNightRider(busNo)) {
            return 3.5;
        } else {
            return calculateTrunkBusFareInCents(distance) / 100;
        }
    } else {
        return calculateMRTorLRTFareInCents(distance) / 100;
    }
}

function calculateExpreeBusFareInCents(distance: number): number {
    if (distance <= 6.2) {
        return 137 + Math.ceil(distance - 3.2) * 10;
    }
    if (distance <= 7.2) {
        return 176;
    }
    if (distance <= 8.2) {
        return 183;
    }
    if (distance <= 9.2) {
        return 189;
    }
    if (distance <= 19.2) {
        return calculateExpreeBusFareInCents(9.2) + Math.ceil(distance - 9.2) * 4;
    }
    if (distance <= 23.2) {
        return calculateExpreeBusFareInCents(19.2) + Math.ceil(distance - 19.2 ) * 3;
    }
    if (distance <= 26.2) {
        return calculateExpreeBusFareInCents(23.2) + Math.ceil(distance - 23.2) * 2;
    }
    if (distance <= 40.2) {
        return calculateExpreeBusFareInCents(26.2) + Math.ceil(distance - 26.2);
    }
    return 262;
}

function calculateMRTorLRTFareInCents(distance: number): number {
    if (distance <= 6.2) {
        return 77 + Math.ceil(distance - 3.2) * 10;
    }
    if (distance <= 7.2) {
        return 116;
    }
    if (distance <= 8.2) {
        return 123;
    }
    if (distance <= 9.2) {
        return 129;
    }
    if (distance <= 19.2) {
        return calculateMRTorLRTFareInCents(9.2) + Math.ceil(distance - 9.2) * 4;
    }
    if (distance <= 23.2) {
        return calculateMRTorLRTFareInCents(19.2) + Math.ceil(distance - 19.2 ) * 3;
    }
    if (distance <= 26.2) {
        return calculateMRTorLRTFareInCents(23.2) + Math.ceil(distance - 23.2) * 2;
    }
    if (distance <= 40.2) {
        return calculateMRTorLRTFareInCents(26.2) + Math.ceil(distance - 26.2);
    }
    return 202;
}

function calculateTrunkBusFareInCents(distance: number): number {
    return calculateMRTorLRTFareInCents(distance);
}

function isChinatownDirectBus(busNo: string): boolean {
    return ['CT8', 'CT18'].indexOf(busNo) !== -1;
}

function isNightRider(busNo: string): boolean {
    return busNo.startsWith('NR') || busNo.endsWith('N');
}

function isExpressBus(busNo: string): boolean {
    const EXPRESS_BUSES = ['188R', '963R', '670', '671', '672'];
    return busNo.startsWith('50') || busNo.startsWith('51') ||
        busNo.startsWith('65') || busNo.startsWith('66') ||
            busNo.endsWith('E') || EXPRESS_BUSES.indexOf(busNo) !== -1;
}