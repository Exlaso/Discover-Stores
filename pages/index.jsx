import Head from "next/head";
import Banner from "@/Components/Banner";
import CardContainer from "@/Components/CardContainer";
import FetchCoffeeStores from "@/Library/Coffee-stores";

import UseTrackLocation from "../Hooks/UseTrackLocation";
import { useContext, useEffect, useState } from "react";
import { ACTION_TYPES, StoreContext } from "@/store/store-context";

export const getStaticProps = async () => {
  const CofeeStore = await FetchCoffeeStores();
  return { props: { CofeeStore } };
};
export default function Home(props) {
  const [err, setErr] = useState("");
  const { handleTrackLocation, locationErrorMsg, Isloading,setIsloading } =
    UseTrackLocation();
  const { dispatch, state } = useContext(StoreContext);
  const handleonclickbutton = (e) => {
    handleTrackLocation();
  };
  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (state.latLong) {
        setIsloading(true);
        try {
          const Response = await fetch(
            `/api/GetStoresByLocation?latLong=${state.latLong}&limit=30`
          );

          const coffeeStores = await Response.json();
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores },
          });
          setErr("");
          setIsloading(false);

          
        } catch (err) {
          console.log(err);
          setErr(err.message);
        }
      }
    }

    setCoffeeStoresByLocation();
  }, [state.latLong, dispatch,setIsloading]);

  return (
    <main>
      <Head>
        <title>Galao</title>
      </Head>

      <Banner
        onclick={handleonclickbutton}
        Isloading={Isloading}
        error={err}
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
