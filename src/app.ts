import { GOOGLE_KEY } from "../env";
import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

type GoogleGeocodingResponse = {
  results: {
    geometry: { location: { lat: number; lng: number } };
  }[];
  status: "OK" | "ZERO_RESULTS";
};

const searchAddressHandler = (event: Event) => {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_KEY}`
    )
    .then((response) => {
      if (response.data.status !== 'OK') {
        throw new Error("NÃO CONSEGUIU ACHAR UM LUGAR")
      }
      const coordinates = response.data.results[0].geometry.location;
    })
    .catch((err) => {
      alert(err);
    });
};

form.addEventListener("submit", searchAddressHandler);
