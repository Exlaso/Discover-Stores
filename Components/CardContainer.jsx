import React from "react";
import Card from "./Card";


const CardContainer = (props) => {
  if (props.data.length == 0) {
    return null;
  }else{

    return (
      <>
      <h2 className="my-9 border-y-4 border-black py-7 text-center text-3xl font-bold tracking-joldalporu">
        {props.heading}
      </h2>
      <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
        {props.data.map((store) => {
          
          return (
            <Card
              name={store.name}
              ImgUrl={store.ImgUrl}
              BigImgUrl={store.BigImgUrl}
              href={`/Cofee-store/${store.id }`}
              key={store.id }
            ></Card>
          );
        })}
      </div>
    
    </>
  );
}
};

export default CardContainer;
