import { Sender, Request } from "./types.js";
import * as fs from "fs";

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
    return error
  }
}

/**
 * Takes in the string from the log entry containing the sender data and returns
 * an object containing the details of the sender
 * @param {string} senderData String from log containing sender data
 * @returns Sender
 */
export function getSenderData(senderData) {
  const senderDataList = senderData.split(" ");
  return new Sender(
    senderDataList[0],
    senderDataList[3].slice(1, 12),
    senderDataList[3].slice(13, 21)
  );
}

/**
 * Takes in string from log entry containing request data and returns Request object
 * @param {string} requestData String from log containing request data
 * @returns Request
 */
export function getRequestData(requestData) {
  const requestDataList = requestData.split(" ");
  return new Request(...requestDataList);
}

/**
 * Finds the most frequent IP in an array of senders
 * @param {[Sender]} senders Array of senders
 * @param {number} numCount Number of senders to return
 * @returns [string]
 */
export function countMostCommonIps(senders, numCount = 0) {
  if (numCount < 0) {
    return [];
  }
  const ipCounts = [];
  senders.forEach((sender) => {
    const ipIndex = ipCounts.findIndex((ipCount) => ipCount.ip == sender.ip);
    if (ipIndex != -1) {
      ipCounts[ipIndex].count += 1;
    } else {
      ipCounts.push({ ip: sender.ip, count: 1 });
    }
  });
  ipCounts.sort((a, b) => b.count - a.count);
  if (numCount) {
    return ipCounts.slice(0, numCount).map((ipCount) => ipCount.ip);
  } else {
    return ipCounts.map((ipCount) => ipCount.ip);
  }
}

/**
 * Finds the most frequent URL in an array of requests
 * @param {Request} requests Array of requests
 * @param {number} numCount Number of URLs to return
 * @returns [string]
 */
export function countMostCommonUrls(requests, numCount = 0) {
  if (numCount < 0) {
    return [];
  }
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

  urlCounts.sort((a, b) => b.count - a.count);
  if (numCount) {
    return urlCounts.slice(0, numCount).map((urlCount) => urlCount.url);
  } else {
    return urlCounts.map((urlCount) => urlCount.url);
  }
}

export function printResults(
  ipCounts,
  urlCounts,
  mostCommonIps,
  mostCommonUrls
) {}
