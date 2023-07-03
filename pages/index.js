import Head from "next/head";
import Banner from "@/Components/Banner";
import CardContainer from "@/Components/CardContainer";
import FetchCoffeeStores from "@/Library/Coffee-stores";

import UseTrackLocation from "../Hooks/UseTrackLocation";
import { useContext, useEffect, useState } from "react";
import { ACTION_TYPES, StoreContext } from "./_app";

export const getStaticProps = async () => {
  const CofeeStore = await FetchCoffeeStores();
  return { props: { CofeeStore } };
};
export default function Home(props) {


  const {  handleTrackLocation, locationErrorMsg, Isloading } =
    UseTrackLocation();
    const { dispatch,state } = useContext(StoreContext);
  const handleonclickbutton = (e) => {
    handleTrackLocation();
  };
  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (state.latLong) {
        try {
          console.log(state.latLong);
          const FetchedCoffeeStores = await FetchCoffeeStores(state.latLong, 40);
          console.log(FetchedCoffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores :FetchedCoffeeStores}
          })
        } catch (err) {
          console.log(err);
        }
      }
    }

    setCoffeeStoresByLocation();
  }, [state.latLong]);

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
        data={state.coffeeStores}
      ></CardContainer>
      <CardContainer
        heading="Ahmedabad"
        data={props.CofeeStore}
      ></CardContainer>
    </main>
  );
}
