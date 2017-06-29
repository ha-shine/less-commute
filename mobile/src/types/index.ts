import AutocompletePrediction = google.maps.places.AutocompletePrediction;
/**
 * Created by Shine on 6/29/2017.
 */
export interface StoreState {
    selectedHomeAddress: AutocompletePrediction | null;
    selectedWorkAddress: AutocompletePrediction | null;
}