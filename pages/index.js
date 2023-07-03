import Head from "next/head";
import Banner from "@/Components/Banner";
import CardContainer from "@/Components/CardContainer";
import FetchCoffeeStores from "@/Library/Coffee-stores";

import UseTrackLocation from "../Hooks/UseTrackLocation";
import { useEffect, useState } from "react";

export const getStaticProps = async () => {
  const CofeeStore = await FetchCoffeeStores();
  return { props: { CofeeStore } };
};
export default function Home(props) {
  const { latLong, handleTrackLocation, locationErrorMsg, Isloading } =
    UseTrackLocation();
    const [NearbyStoresData, setNearbyStoresData] = useState([])

  const handleonclickbutton = (e) => {
    handleTrackLocation();

  };
  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          console.log(latLong);
          const FetchedCoffeeStores = await FetchCoffeeStores(latLong,40);
          console.log(FetchedCoffeeStores);
          setNearbyStoresData(FetchedCoffeeStores)
        } catch (err) {
          console.log(err);
        }
      }
    }

    setCoffeeStoresByLocation();
  }, [latLong]);

  return (
    <main>
      <Head>
        <title>Coffee no Gallo</title>
      </Head>

      <Banner
        onclick={handleonclickbutton}
        Isloading={Isloading}
      />
      <span>{locationErrorMsg}</span>
      <CardContainer
        heading="Nearby Stores"
        data={NearbyStoresData}
      ></CardContainer>
      <CardContainer
        heading="Ahmedabad"
        data={props.CofeeStore}
      ></CardContainer>
    </main>
  );
}
