import { FindRecordByFilter } from "@/Library/Airtable";

const getCoffeeStoreById = async (req, res) => {
    const { id } = req.query;
    
    try {
        if (id) {
            const Records = await FindRecordByFilter(id)
            
              if (Records.length != 0) {
                res.json(Records);
                res.end();
          
        }else{
          res.json({'Id Could Not by found':id});
          res.end();

      }
     
    } else {
        res.status(400);
        res.json({ message: "Id is missing" });
        res.end();
       
    }
} catch (error) {
    res.status(500);
    res.json({ message: "error in Get Stores By ID", error });
    res.end();
   
  }
};
export default getCoffeeStoreById;