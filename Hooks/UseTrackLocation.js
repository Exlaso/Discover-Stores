import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "@/pages/_app";

const useTrackLocation = () => {
  const { dispatch } = useContext(StoreContext);
  const [locationErrorMsg, setLocationErrorMsg] = useState(null);
  const [Isloading, setIsloading] = useState(false);
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });
    setLocationErrorMsg("");
    setIsloading(false);
  };

  const error = () => {
    setLocationErrorMsg("Unable to retrieve your location");
    setIsloading(false);
  };

  const handleTrackLocation = () => {
    setIsloading(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsloading(false);
    } else {
      // status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    handleTrackLocation,
    locationErrorMsg,
    Isloading,
  };
};

export default useTrackLocation;
