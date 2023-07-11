import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";
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
      InitialCoffeeStore: findcoffeestorebyid ? findcoffeestorebyid : {},
    },
  };
}
const ID = ({ InitialCoffeeStore = {} }) => {
  const router = useRouter();

  const id = router.query.id;
  const [coffeeStore, setCoffeeStore] = useState(InitialCoffeeStore);
  const [Votes, setVotes] = useState(0);

  const ACTION_TYPES = {
    Upvote: "Upvote",
    Downvote: "Downvote",
  };
  const BtnInitialValue = {
    UpvoteLoading: false,
    Upvotevalue: "Upvote",
    DownvoteLoading: false,
    Downvotevalue: "Downvote",
  };
  const LoadBtn = (state, action) => {
    switch (action.type) {
      case ACTION_TYPES.Upvote:
        return {
          ...state,
          UpvoteLoading: action.payload.UpvoteLoading,
          Upvotevalue: action.payload.Upvotevalue,
        };

      case ACTION_TYPES.Downvote:
        return {
          ...state,
          DownvoteLoading: action.payload.DownvoteLoading,
          Downvotevalue: action.payload.Downvotevalue,
        };

      default:
        throw new Error(`Unhandled Action type ${action.type}`);
    }
  };
  const [state, dispatch] = useReducer(LoadBtn, BtnInitialValue);
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
    if (isEmpty(InitialCoffeeStore)) {
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
      HandleCreateStore(InitialCoffeeStore);
    }
  }, [id, InitialCoffeeStore, coffeeStores]);

  const { data, error, isLoading } = useSWR(
    `/api/GetStoresById?id=${id}`,
    fetcher
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setCoffeeStore(data[0]);
      setVotes(data[0].voting);
    }
  }, [data]);

  if (router.isFallback) {
    return (
      <div className="absolute inset-0 flex items-center justify-center w-screen h-screen ">
        Loading...
      </div>
    );
  }

  const HandleUpvoteButton = async () => {
    
    dispatch({
      type: ACTION_TYPES.Upvote,
      payload: {
        Upvotevalue: "Upvoting...",
        UpvoteLoading: true,
      },
    });
    try {
      const Response = await fetch("/api/UpvoteStores", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id ,inc: 1}),
      });
      const Store = await Response.json();
      if (Store && Store.length > 0) {
        dispatch({
          type: ACTION_TYPES.Upvote,
          payload: {
            Upvotevalue: "Upvote",
            UpvoteLoading: false,
          },
        });
        setVotes(Votes + 1);
      }
    } catch (error) {
      console.error("HandleCreateStore", error);
    }
  };
  const HandleDownvoteButton = async () => {
    dispatch({
      type: ACTION_TYPES.Downvote,
      payload: {
        Downvotevalue: "Downvoting...",
        DownvoteLoading: true,
      },
    });
    try {
      const Response = await fetch("/api/UpvoteStores", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id,inc: 0 }),
      });
      const Store = await Response.json();
      if (Store && Store.length > 0) {
        dispatch({
          type: ACTION_TYPES.Downvote,
          payload: {
            Downvotevalue: "Downvote",
            DownvoteLoading: false,
          },
        });
        setVotes(Votes - 1);
      }
    } catch (error) {
      console.error("HandleCreateStore", error);
    }
  };

  const { name, ImgUrl, address } = coffeeStore;
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center w-screen h-screen ">
        Loading...
      </div>
    );
  return (
    <div>
      <Head>
        <title>{name}</title>
        <meta name="description" content="Store Near You" />

      </Head>
      <Link
        className="block p-3 pl-10 pr-10 text-white border-2 border-white rounded-md w-max bg-slate-600"
        href={"/"}
      >
        &lt;-- Back
      </Link>
      <hr className="my-5 border-2 border-black" />
      <h2 className="py-3 text-3xl font-semibold ">{name}</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <Image
          src={ImgUrl || "/static/LoadingHD.gif"}
          className="shadow-sm shadow-black"
          alt={`Store${id}`}
          width={800}
          height={500}
        ></Image>

        {name != "Not Found" ? (
          <div>
            <span className="block my-2">
              Address:
              <p className="inline-block text-xl">{address}</p>
            </span>
            <span className="block ">
              <h2 className="my-6 text-xl">{Votes} &#9733;</h2>
              <button
                disabled={state.UpvoteLoading}
                onClick={HandleUpvoteButton}
                className="p-3 pl-10 pr-10 m-2 text-white duration-300 border-2 border-white rounded-md w-max bg-slate-600 disabled:bg-slate-800 disabled:text-gray-500"
              >
                {state.Upvotevalue}
              </button>
              <button
                disabled={state.DownvoteLoading}
                onClick={HandleDownvoteButton}
                className="p-3 pl-10 pr-10 m-2 text-white duration-300 border-2 border-white rounded-md w-max bg-slate-600 disabled:bg-slate-800 disabled:text-gray-500" 
              >
                {state.Downvotevalue}
              </button>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ID;
