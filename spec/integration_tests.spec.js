import {
  getSenderData,
  getRequestData,
  countMostCommonIps,
  countMostCommonUrls,
  processDataFile,
} from "../parser.js";

describe("Process and IP count function", function () {
  it("should get the three most frequent IPs", function () {
    const data = processDataFile("spec/testSamples/count_ips.log");
    const frequentIps = countMostCommonIps(data.senders, 3);
    const expectedIps = ["177.71.128.21", "168.41.191.40", "168.41.191.41"];
    expect(frequentIps.join(" ")).toEqual(expectedIps.join(" "));
  });

  it("should get the three most frequent IPs with unordered input", function () {
    const data = processDataFile("spec/testSamples/count_ips_unordered.log");
    const frequentIps = countMostCommonIps(data.senders, 3);
    const expectedIps = ["177.71.128.21", "168.41.191.40", "168.41.191.41"];
    expect(frequentIps.join(" ")).toEqual(expectedIps.join(" "));
  });

  it("should get the three most frequent IPs in a complex file", function () {
    const data = processDataFile();
    const frequentIps = countMostCommonIps(data.senders, 3);
    const expectedIps = ["168.41.191.40", "177.71.128.21", "50.112.00.11"];
    expect(frequentIps.join(" ")).toEqual(expectedIps.join(" "));
  });

  it("should get the number of unique URLs", function () {
    const data = processDataFile();
    const frequentIps = countMostCommonIps(data.senders);
    const numUniqueIps = frequentIps.length;
    expect(numUniqueIps).toEqual(11);
  });
});

describe("Process and URL count function", function () {
  it("should get the three most frequent URLs", function () {
    const data = processDataFile("spec/testSamples/count_ips.log");
    const frequentUrls = countMostCommonUrls(data.requests, 3);
    const expectedUrls = ["a/", "b/", "c/"];
    expect(frequentUrls.join(" ")).toEqual(expectedUrls.join(" "));
  });

  it("should get the three most frequent URLs  with unordered input", function () {
    const data = processDataFile("spec/testSamples/count_ips_unordered.log");
    const frequentUrls = countMostCommonUrls(data.requests, 3);
    const expectedUrls = ["a/", "b/", "c/"];
    expect(frequentUrls.join(" ")).toEqual(expectedUrls.join(" "));
  });

  it("should get the three most frequent URLs in a complex file", function () {
    const data = processDataFile();
    const frequentUrls = countMostCommonUrls(data.requests, 3);
    const expectedUrls = [
      "/docs/manage-websites/",
      "/intranet-analytics/",
      "http://example.net/faq/",
    ];
    expect(frequentUrls.join(" ")).toEqual(expectedUrls.join(" "));
  });
});
