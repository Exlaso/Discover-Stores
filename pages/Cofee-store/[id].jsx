import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import FetchCoffeeStores from "@/Library/Coffee-stores";
import { isEmpty } from "@/utils";
import { StoreContext } from "@/store/store-context";

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
    return <div>Loading...</div>
  }
  
  const id = router.query.id;
  const [coffeeStore, setCoffeeStore] = useState(InitialProps.CofeeStore);
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);
  console.log("context stores", coffeeStores);

  const HandleCreateStore = async (store) => {
    try {
      const { id, name, address, ImgUrl } = store;
      const Response = await fetch("/api/CreateStores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, address, ImgUrl, voting: 0 }),
      });
      const Store = await Response.json();
      setCoffeeStore(...Store)
    } catch (error) {
      console.error("HandleCreateStore", error);
    }
  };
  useEffect(() => {
    console.log("effect running");
    if (isEmpty(InitialProps.CofeeStore)) {
      if (coffeeStores.length > 0) {
        const CoffeeStoresFromContext = coffeeStores.find((cs) => {
          return cs.id.toString() === id;
        });
        if (CoffeeStoresFromContext) {
        HandleCreateStore(CoffeeStoresFromContext);
        setCoffeeStore(CoffeeStoresFromContext);
        }
      } else {
        
        HandleCreateStore({ id });
        
      }
    } else {
      HandleCreateStore(InitialProps.CofeeStore);
    }
  }, [id]);
  const { name, ImgUrl, address } = coffeeStore;
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
        src={ImgUrl}
          className="shadow-sm shadow-black" 
          alt={name}
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
              <h2 className="my-6 text-xl">{0} &#9733;</h2>
              <button 
                className="block w-max rounded-md border-2 border-white bg-slate-600 p-3 pl-10 pr-10 text-white"
                href={"/"}
              >
                Upvote
              </button>
            </span>
          </div>
        ) : null}
      </div>
      
    </div> 
  );
};

export default ID;
