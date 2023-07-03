import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = (props) => { 

  return (
    <Link
      href={props.href}
      className="flex flex-col items-center justify-center gap-4  rounded-lg bg-black bg-opacity-40 p-8  text-center"
    >
      <h2 className="text-2xl font-bold text-white">{props.name}</h2>
      <Image
        className="h-52 w-64 rounded-3xl object-cover"
        src={props.ImgUrl}
        alt={props.name}
        width={260}
        height={160}
       
      />
    </Link>
  );
};

export default Card;
