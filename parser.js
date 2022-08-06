import { Sender } from "./types.js";

/**
 * Takes in the string from the log entry containing the sender data and returns
 * an object containing the details of the sender
 * @param {string} senderData String from log containing sender data
 */
export function getSenderData(senderData) {
  const senderDataList = senderData.split(" ");
  return new Sender(
    senderDataList[0],
    senderDataList[3].slice(1, 12),
    senderDataList[3].slice(13, 21)
  );
}

export function getRequestData(requestData) {}

export function countMostCommonIps(ipCounts) {}

export function printResults(
  ipCounts,
  urlCounts,
  mostCommonIps,
  mostCommonUrls
) {}

export function processDataFile(fileName = "./test.log") {}
