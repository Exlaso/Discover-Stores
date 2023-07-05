import { MinifyRecords, table } from "@/Library/Airtable";



const CreateStores = async (req, res) => {
  if (req.method === "POST") {
    try {   
        const { id,name,address,voting,ImgUrl}= req.body
        if(id){
      const FindStoreRecords = await table
        .select({
          filterByFormula: `id='${id}'`,
        })
        .firstPage();

      if (FindStoreRecords.length !== 0) {
        const record = MinifyRecords(FindStoreRecords)
        res.json(record);
      } else { 

if (name) {
    
  const CreateRecord = await table.create([
  {
            fields:{
                
                id,
                name,
                address,
                voting,
                ImgUrl
            }
        }
    ])
    const record = MinifyRecords(CreateRecord)
    
    res.json(record)
}else{
    res.status(400)
            res.json({"ERROR":"Require NAME"})
}
}
        }else{
            res.status(400)
            res.json({"ERROR":"Require ID"})
            
        }
        
      res.json({ message: "Post Method says Hello" });

      
    } catch (error) {
      res.status(500);
      res.json({ message: "Error finding store", error });
    }
  }
};
export default CreateStores;
