import {
  getSenderData,
  getRequestData,
  countMostCommonIps,
  countMostCommonUrls,
  processDataFile,
} from "../parser.js";
import { Sender, Request } from "../types.js";
describe("Process and IP count function", function () {
  
  it("should get the three most frequent IPs", function () {
    const data = processDataFile("spec/testSamples/count_ips.log");
    const frequentIps = countMostCommonIps(data.senders, 3);
    const expectedIps = ["177.71.128.21", "168.41.191.40", "168.41.191.41"];
    expect(frequentIps.join(" ")).toEqual(expectedIps.join(" "));
  });
  
  it("should get the number of unique URLs", function () {
    const data = processDataFile();
    const frequentIps = countMostCommonIps(data.senders);
    const numUniqueIps = frequentIps.length
    expect(numUniqueIps).toEqual(11)
  })
});

describe("Process and URL count function", function () {
  it("should get the three most frequent URLs", function () {
    const data = processDataFile("spec/testSamples/count_ips.log");
    const frequentUrls = countMostCommonUrls(data.requests, 3);
    const expectedUrls = ["a/", "b/", "c/"];
    expect(frequentUrls.join(" ")).toEqual(expectedUrls.join(" "));
  });
});
