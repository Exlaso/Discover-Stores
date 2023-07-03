import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import FetchCoffeeStores from "@/Library/Coffee-stores";

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
  const findcoffeestorebyid =  CofeeStore.find((cs) => {
    return cs.id === params.id;
  })
  return {
    props: {
      CofeeStore: findcoffeestorebyid ? findcoffeestorebyid: {

      },
    },
  };
}
const ID   = (props) => { 
  const router = useRouter();
  if(router.isFallback){
    return <div>Loading...</div>
  }
  return (
    <div>
      <Head>
        <title>{props.CofeeStore.name}</title>
      </Head>
      <Link
        className="block w-max rounded-md border-2 border-white bg-slate-600 p-3 pl-10 pr-10 text-white"
        href={"/"}
      >
        	&lt;-- Back
      </Link>
      <hr className="my-5 border-2 border-black" />
      <h2 className="py-3 text-3xl font-semibold ">{props.CofeeStore.name}</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <Image
          className="shadow-sm shadow-black"
          src={props.CofeeStore.ImgUrl}
          alt={props.CofeeStore.name}
          width={800}
          height={500}
        ></Image>
        <div>
          <span className="my-2 block">
            Address:
            <p className="inline-block text-xl">
              {props.CofeeStore.address}
            </p>
          </span>

        </div>
      </div>
    </div>
  );
};

export default ID ;
