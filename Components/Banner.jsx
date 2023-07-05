import Image from "next/image";

import React from "react";

const Banner = ({onclick,Isloading,error}) => {

  return (
    <div className="flex flex-col items-start justify-start gap-11">
      <h1 className="text-5xl font-bold">
        Store <span className="text-blue-900">Connoisseur</span>
      </h1>
      <div className="grid gap-4">
        <p className="text-2xl text-white ">Mafat ma Gallo Sodhi aapu</p>
        <button
          onClick={onclick}
          className="z-10 w-max rounded-md border-2 border-white bg-slate-600 p-3 pl-10 pr-10 text-white "
        >
          {Isloading?"Locating...":"Search Store"}
        </button>
        <p>{error}</p>
      </div>
      <div className="absolute inset-0 -z-10 w-full ">
        <Image
          height={400}
          width={1200} 
          alt="hero Image"
          src={"/static/hero-image.png"}
          className="ml-auto mr-auto"
        ></Image>
      </div>
    </div>
  );
};

export default Banner;
