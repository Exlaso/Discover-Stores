import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import FetchCoffeeStores from "@/Library/Coffee-stores";
import { fetcher, isEmpty } from "@/utils";
import { StoreContext } from "@/store/store-context";
import useSWR from "swr";

export async function getStaticPaths() {
  const CofeeStore = await FetchCoffeeStores();
  const paths = CofeeStore.map((cs) => {
    return {
      params: {
        id: cs.id.toString(),
      }, 
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(staticprops) {
  const CofeeStore = await FetchCoffeeStores();
  const params = staticprops.params;
  const findcoffeestorebyid = CofeeStore.find((cs) => {
    return cs.id === params.id;
  });
  return {
    props: {
      CofeeStore: findcoffeestorebyid ? findcoffeestorebyid : {},
    },
  };
}
const ID = (InitialProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="w-screen absolute inset-0 h-screen flex justify-center items-center ">Loading...</div>;
  }

  const id = router.query.id;
  const [coffeeStore, setCoffeeStore] = useState(InitialProps.CofeeStore);
  const [Votes, setVotes] = useState(0);
  const [IsBtnDisabled, setIsBtnDisabled] = useState(false);
  const [BtnValue, setBtnValue] = useState("Upvote");

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const HandleCreateStore = async (store) => {
    try {
      const { id, name, address, ImgUrl } = store;
      const Response = await fetch("/api/CreateStores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, address, ImgUrl, voting: 0 }),
      });
      const Store = await Response.json();
    } catch (error) {
      console.error("HandleCreateStore", error);
    }
  };
  useEffect(() => {
    if (isEmpty(InitialProps.CofeeStore)) {
      if (coffeeStores.length > 0) {
        const CoffeeStoresFromContext = coffeeStores.find((cs) => {
          return cs.id.toString() === id;
        });
        if (CoffeeStoresFromContext) {
          HandleCreateStore(CoffeeStoresFromContext);
          setCoffeeStore(CoffeeStoresFromContext);
        }
      }
    } else {
      HandleCreateStore(InitialProps.CofeeStore);
    }
  }, [id, InitialProps.coffeeStore]);
  const { name, ImgUrl, address } = coffeeStore;

  const { data, error, isLoading } = useSWR(
    `/api/GetStoresById?id=${id}`,
    fetcher
  );

  const HandleUpvoteButton = async () => {
    setIsBtnDisabled(true);
    setBtnValue("Upvoting...");
    try {
      const Response = await fetch("/api/UpvoteStores", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const Store = await Response.json();
      if (Store && Store.length > 0) {
        setBtnValue("Upvote");
    setIsBtnDisabled(false);
    setVotes(Votes + 1);
      }
    } catch (error) {            
      console.error("HandleCreateStore", error);
    }


  };

  useEffect(() => {
    if (data && data.length > 0) {

      setCoffeeStore(data[0]);
      setVotes(data[0].voting);
    }
  }, [data]);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div className="w-screen absolute inset-0 h-screen flex justify-center items-center ">Loading...</div>;
;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link
        className="block w-max rounded-md border-2 border-white bg-slate-600 p-3 pl-10 pr-10 text-white"
        href={"/"}
      >
        &lt;-- Back
      </Link>
      <hr className="my-5 border-2 border-black" />
      <h2 className="py-3 text-3xl font-semibold ">{name}</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <Image
          src={ImgUrl || '/static/LoadingHD.gif'}
          className="shadow-sm shadow-black"
          alt={`Store${id}`}
          width={800}
          height={500}
        ></Image>

        {name != "Not Found" ? (
          <div>
            <span className="my-2 block">
              Address:
              <p className="inline-block text-xl">{address}</p>
            </span>
            <span className="block ">
              <h2 className="my-6 text-xl">{Votes} &#9733;</h2>
              <button
                disabled={IsBtnDisabled}
                onClick={HandleUpvoteButton}
                className="block w-max rounded-md border-2 border-white bg-slate-600 p-3 pl-10 pr-10 text-white duration-300 disabled:bg-slate-800 disabled:text-gray-500"
                href={"/"}
              >
                {BtnValue}
              </button>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ID;
