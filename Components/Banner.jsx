import Image from "next/image";

import React from "react";

const Banner = ({onclick,Isloading,error}) => {

  return (
    <div className="flex flex-col items-start justify-start gap-11">
      <h1 className="text-5xl font-bold">
        Store <span className="text-blue-900">Connoisseur</span>
      </h1>
      <div className="grid gap-4">
        <p className="text-2xl text-white ">We&apos;ll find Nearby Store for free.</p>
        <button
          onClick={onclick}
          className="z-10 p-3 pl-10 pr-10 text-white border-2 border-white rounded-md w-max bg-slate-600 "
        >
          {Isloading?"Locating...":"Search Store"}
        </button>
        <p>{error}</p>
      </div>
      <div className="absolute inset-0 w-full -z-10 ">
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
