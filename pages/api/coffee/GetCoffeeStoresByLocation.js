import FetchCoffeeStores from "@/Library/Coffee-stores";

const GetCoffeeStoresByLocation = async (req, res) => {
  //Configure LatLong and limit

  try {
    const { latLong, limit } = req.query;
    const Response = await FetchCoffeeStores(latLong, limit);
    res.status(200)
    res.json(Response)
  } catch (error) {
    console.log(error);
    res.status(500)
    res.json({message: "Oh No Something went wrong",error})
  }

  // return
};

export default GetCoffeeStoresByLocation;
