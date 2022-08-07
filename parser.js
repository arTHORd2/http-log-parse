import { Sender, Request } from "./types.js";
import * as fs from "fs";

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

export function getRequestData(requestData) {
  const requestDataList = requestData.split(" ");
  return new Request(...requestDataList);
}

/**
 * Counts the 3 most common IPs in a list of senders
 * @param {[Sender]} senders List of all Sender objects
 * @returns [string] ]List of 3 most frequent IPs
 */
export function countMostCommonIps(senders, numCount=0) {
  const ipCounts = [];
  senders.forEach((sender) => {
    const ipIndex = ipCounts.findIndex((ipCount) => ipCount.ip == sender.ip);
    if (ipIndex != -1) {
      ipCounts[ipIndex].count += 1;
    } else {
      ipCounts.push({ ip: sender.ip, count: 1 });
    }
  });

  ipCounts.sort((a, b) => a.count < b.count);
  if (numCount) {
    return ipCounts.slice(0, numCount).map((ipCount) => ipCount.ip);
  }else {
    return ipCounts.map((ipCount) => ipCount.ip);
  }
  
}

/**
 * Counts the 3 most common urls in a list of requests
 * @param {[Request]} requests List of all Request objects
 * @returns [string] 3 most common URLs
 */
export function countMostCommonUrls(requests, numCount=0) {
  // From the list of request objects, create an array of objects, representing
  // each url and the number of occurences. This array is sorted, and the first
  // elements are returned. The approach used here uses an O(nlogn) sort to get 
  // any k most frequent URLs.

  // An alternative implementation is to find the max element using linear scan,
  // remove it, and then run another linear scan. However, this approach would be
  // O(nk), which would approach O(n^2) as k increases. 
  const urlCounts = [];
  requests.forEach((request) => {
    const urlIndex = urlCounts.findIndex(
      (urlCount) => urlCount.url == request.url
    );
    if (urlIndex != -1) {
      urlCounts[urlIndex].count += 1;
    } else {
      urlCounts.push({ url: request.url, count: 1 });
    }
  });

  urlCounts.sort((a, b) => a.count < b.count);
  if (numCount) {
    return urlCounts.slice(0, numCount).map((urlCount) => urlCount.url);
  }  else {
    return urlCounts.map((urlCount) => urlCount.url);
  }
  
}

export function printResults(
  ipCounts,
  urlCounts,
  mostCommonIps,
  mostCommonUrls
) {}

/**
 * Takes in a data file and returns two lists, one containing all the Senders and
 the other containing all the Requests.
 * @param {string} fileName Name of log file to process
 * @returns {senders: [Senders], requests: [Requests]}
 */
export function processDataFile(fileName = "./test.log") {
  const senders = [];
  const requests = [];
  try {
    // This function will synchronously read in the entire log file. This will take
    // up a lot of memory for extremely large files. A better option is to read in
    // the file line by line - this won't speed up the program, but will prevent it
    // from crashing
    const data = fs.readFileSync(fileName, "utf8");
    const lines = data.split("\n");
    lines.forEach((line) => {
      const tokens = line.split('"');
      if (tokens.length > 2) {
        senders.push(getSenderData(tokens[0]));
        requests.push(getRequestData(tokens[1]));
      }
      
    });

    return { senders, requests };
  } catch (error) {
    console.log(error);
  }
}
