import {
  countMostCommonIps,
  countMostCommonUrls,
  processDataFile,
} from "./parser.js";
import express from "express";
const app = express();
const port = process.argv[2] || 3000;
app.get("/num_unique_ips", function (req, res) {
  const data = processDataFile();
  const frequentIps = countMostCommonIps(data.senders);
  res.status(200).send({ numIps: frequentIps.length });
});

app.get("/top_ips", function (req, res) {
  const data = processDataFile();
  res.status(200).send({
    commonIps: countMostCommonIps(data.senders, req.query.count || 3),
  });
});

app.get("/top_urls", function (req, res) {
  const data = processDataFile();
  res.status(200).send({
    commonUrls: countMostCommonUrls(data.requests, req.query.count || 3),
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
