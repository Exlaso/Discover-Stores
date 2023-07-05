import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Card = ({href,name,ImgUrl}) => { 
  const [Loading, setLoading] = useState(ImgUrl);
  return (
    <Link
      href={href}
      onClick={()=> {
        setLoading('/static/LoadingHD.gif');
      }}
      className=" flex flex-col items-center justify-center gap-4  rounded-lg bg-black bg-opacity-40 p-8  text-center"
    >
      <h2 className="text-2xl font-bold text-white">{name}</h2>
      <Image
        className="h-52 w-64 rounded-3xl object-cover"
        src={Loading}
        alt={`Store ${name}`}
        width={260}
        height={160}
       
      />
    </Link>
  );
};

export default Card;
