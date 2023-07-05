import { FindRecordByFilter, MinifyRecords, table } from "@/Library/Airtable";
import React from "react";

const UpvoteStores = async (req, res) => {
  try {
    const { id } = req.query;
    if (req.method === "PUT") {
      if (id) {
        const records = await FindRecordByFilter(id);

        if (records.length !== 0) {
          const record = records[0];

          const vote = (parseInt(record.voting) + parseInt(1));
          const updaterecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: vote,
              },
            },
          ]);
          if(updaterecord){

            res.json(MinifyRecords(updaterecord))
          }
        } else {
          res.json({ "Id Could Not by found": id });
        }
      } else {
        res.status(400);
        res.json({ ERROR: "Require ID" });
      }
    } else {
      res.json({ error: "Method Must Be PUT Request" });
    }
  } catch (error) {
    res.status(500);
    res.json(error)
    console.error(error);
  }
};

export default UpvoteStores;
