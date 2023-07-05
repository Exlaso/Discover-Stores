import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({href,name,ImgUrl}) => { 

  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center gap-4  rounded-lg bg-black bg-opacity-40 p-8  text-center"
    >
      <h2 className="text-2xl font-bold text-white">{name}</h2>
      <Image
        className="h-52 w-64 rounded-3xl object-cover"
        src={ImgUrl}
        alt={name}
        width={260}
        height={160}
       
      />
    </Link>
  );
};

export default Card;
