import { FindRecordByFilter, MinifyRecords, table } from "@/Library/Airtable";

const CreateStores = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { id, name, address, voting, ImgUrl } = req.body;
      if (id) {
        const Record = await FindRecordByFilter(id)

        if (Record.length !== 0) {
          res.json(MinifyRecords(Record));
          res.end();
        } else {
          if (name) {
            const CreateRecord = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  voting,
                  ImgUrl,
                },
              },
            ]);
            const record = MinifyRecords(CreateRecord);

            res.json(record);
            res.end();
          } else {
            res.status(400);
            res.json({ ERROR: "Require NAME" });
            res.end();
          }
        }
      } else {
        res.status(400);
        res.json({ ERROR: "Require ID" });

        res.end();
      }

      res.json({ message: "Post Method says Hello" });

      res.end();
    } catch (error) {
      res.status(500);
      res.json({ message: "Error Creating Store store", error });

      res.end();
    }
  }
};
export default CreateStores;
