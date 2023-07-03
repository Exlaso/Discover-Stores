import React from "react";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});
const GetCoffeeStoreImages = async (limit,query) => {
  const photos = await unsplash.search.getPhotos({
    query: query,
    page: 1,
    perPage: limit,
  });
  const UnsplashResults = photos.response.results;
  return UnsplashResults.map((res) => res.urls["regular"]);
};
const FetchCoffeeStores = async (ll = "23.039907727550556%2C72.53117613134259",limit = 5) => {
  const res = await fetch(
    `https://api.foursquare.com/v3/places/nearby?ll=${ll}&query=&limit=${limit}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.NEXT_PUBLIC_FOURQUARE_API_KEY,
      },
    }
    );
    const Data = await res.json();
    const photos = await GetCoffeeStoreImages(limit,"mall"); 
    const StoreData =  Data.results.map((res, i) => {
      return {
      name: res.name,
      id: res.fsq_id,
      address: res.location.formatted_address,
      ImgUrl:  photos.length > 0 ?  photos[i]: null,
    };
  });

   return  StoreData
};

export default FetchCoffeeStores;
