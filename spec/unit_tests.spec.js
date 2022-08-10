import {
  getSenderData,
  getRequestData,
  countMostCommonIps,
  countMostCommonUrls,
  processDataFile,
} from "../parser.js";
import { Sender, Request } from "../types.js";
describe("Sender function", function () {
  it("should get correct sender data", function () {
    const senderString = "177.71.128.21 - - [10/Jul/2018:22:21:28 +0200]";
    const actual = getSenderData(senderString);
    const expected = {
      ip: "177.71.128.21",
      date: "10/Jul/2018",
      time: "22:21:28",
    };

    expect(actual.ip).toEqual(expected.ip);
    expect(actual.date).toEqual(expected.date);
    expect(actual.time).toEqual(expected.time);
  });
});

describe("Request function", function () {
  it("should get correct request data", function () {
    const requestString = "GET /intranet-analytics/ HTTP/1.1";
    const expected = {
      requestType: "GET",
      url: "/intranet-analytics/",
      protocol: "HTTP/1.1",
    };
    const actual = getRequestData(requestString);
    expect(actual.requestType).toEqual(expected.requestType);
    expect(actual.url).toEqual(expected.url);
    expect(actual.protocol).toEqual(expected.protocol);
  });
});

describe("IP Count function", function () {
  it("should get the 3 most common IPs", function () {
    const res = countMostCommonIps(
      [
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.2", "11/Jul/2018", "17:33:01"),
        new Sender("1.2", "11/Jul/2018", "17:33:01"),
        new Sender("1.2", "11/Jul/2018", "17:33:01"),
        new Sender("1.3", "11/Jul/2018", "17:33:01"),
        new Sender("1.3", "11/Jul/2018", "17:33:01"),
        new Sender("1.4", "11/Jul/2018", "17:33:01"),
      ],
      3
    );
    expect(JSON.stringify(res)).toEqual(JSON.stringify(["1.1", "1.2", "1.3"]));
  });
  it("should get the IP appearing earliest in the log if two IPs have the same frequency", function () {
    const res = countMostCommonIps(
      [
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.2", "11/Jul/2018", "17:33:01"),
        new Sender("1.2", "11/Jul/2018", "17:33:01"),
        new Sender("1.3", "11/Jul/2018", "17:33:01"),
        new Sender("1.3", "11/Jul/2018", "17:33:01"),
        new Sender("1.4", "11/Jul/2018", "17:33:01"),
      ],
      3
    );
    expect(JSON.stringify(res)).toEqual(JSON.stringify(["1.1", "1.2", "1.3"]));
  })
  it("should get the 3 most common IPs with unordered input", function () {
    const res = countMostCommonIps(
      [
        new Sender("1.3", "11/Jul/2018", "17:33:01"),
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.2", "11/Jul/2018", "17:33:01"),
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.4", "11/Jul/2018", "17:33:01"),
        new Sender("1.2", "11/Jul/2018", "17:33:01"),
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.3", "11/Jul/2018", "17:33:01"),
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.2", "11/Jul/2018", "17:33:01"),
      ],
      3
    );
    expect(JSON.stringify(res)).toEqual(JSON.stringify(["1.1", "1.2", "1.3"]));
  });
  it("should return an emtpy list if given invalid input", function () {
    const res = countMostCommonIps(
      [
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.1", "11/Jul/2018", "17:33:01"),
        new Sender("1.2", "11/Jul/2018", "17:33:01"),
        new Sender("1.2", "11/Jul/2018", "17:33:01"),
        new Sender("1.3", "11/Jul/2018", "17:33:01"),
        new Sender("1.3", "11/Jul/2018", "17:33:01"),
        new Sender("1.4", "11/Jul/2018", "17:33:01"),
      ],
      -1
    );
    expect(JSON.stringify(res)).toEqual(JSON.stringify([]));
  })
});

describe("URL count function", function () {
  it("should get the 3 most common requests", function () {
    const res = countMostCommonUrls(
      [
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/about", "HTTP/1.1"),
        new Request("GET", "/about", "HTTP/1.1"),
        new Request("GET", "/about", "HTTP/1.1"),
        new Request("GET", "/contact", "HTTP/1.1"),
        new Request("GET", "/contact", "HTTP/1.1"),
        new Request("GET", "/shop", "HTTP/1.1"),
      ],
      3
    );
    expect(JSON.stringify(res)).toEqual(
      JSON.stringify(["/home", "/about", "/contact"])
    );
  });
  
  it("should return the URL appearing earliest in the log if multiple URLs have the same frequency", function () {
    const res = countMostCommonUrls(
      [
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/about", "HTTP/1.1"),
        new Request("GET", "/about", "HTTP/1.1"),
        new Request("GET", "/contact", "HTTP/1.1"),
        new Request("GET", "/contact", "HTTP/1.1"),
        new Request("GET", "/shop", "HTTP/1.1"),
      ],
      3
    );
    expect(JSON.stringify(res)).toEqual(
      JSON.stringify(["/home", "/about", "/contact"])
    );
  });

  it("should get the 3 most common requests with unordered input", function () {
    const res = countMostCommonUrls(
      [
        new Request("GET", "/about", "HTTP/1.1"),
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/shop", "HTTP/1.1"),
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/about", "HTTP/1.1"),
        new Request("GET", "/contact", "HTTP/1.1"),
        new Request("GET", "/about", "HTTP/1.1"),
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/contact", "HTTP/1.1"),
      ],
      3
    );
    expect(JSON.stringify(res)).toEqual(
      JSON.stringify(["/home", "/about", "/contact"])
    );
  });
  it("should return an empty list if given invalid input", function () {
    const res = countMostCommonUrls(
      [
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/home", "HTTP/1.1"),
        new Request("GET", "/about", "HTTP/1.1"),
        new Request("GET", "/about", "HTTP/1.1"),
        new Request("GET", "/contact", "HTTP/1.1"),
        new Request("GET", "/contact", "HTTP/1.1"),
        new Request("GET", "/shop", "HTTP/1.1"),
      ],
      -1
    );
    expect(JSON.stringify(res)).toEqual(
      JSON.stringify([])
    );
  })
});

describe("Process function", function () {
  it("should correctly process the file", function () {
    const res = processDataFile("spec/testSamples/count_ips.log");

    const expectedSenders = [
      new Sender("177.71.128.21", "10/Jul/2018", "22:21:28"),
      new Sender("177.71.128.21", "10/Jul/2018", "22:21:28"),
      new Sender("177.71.128.21", "10/Jul/2018", "22:21:28"),
      new Sender("177.71.128.21", "10/Jul/2018", "22:21:28"),
      new Sender("168.41.191.40", "10/Jul/2018", "22:21:28"),
      new Sender("168.41.191.40", "10/Jul/2018", "22:21:28"),
      new Sender("168.41.191.40", "10/Jul/2018", "22:21:28"),
      new Sender("168.41.191.41", "10/Jul/2018", "22:21:28"),
      new Sender("168.41.191.41", "10/Jul/2018", "22:21:28"),
      new Sender("168.41.191.9", "10/Jul/2018", "22:21:28"),
    ];
    const expectedRequests = [
      new Request("GET", "a/", "HTTP/1.1"),
      new Request("GET", "b/", "HTTP/1.1"),
      new Request("GET", "c/", "HTTP/1.1"),
      new Request("GET", "d/", "HTTP/1.1"),
      new Request("GET", "a/", "HTTP/1.1"),
      new Request("GET", "b/", "HTTP/1.1"),
      new Request("GET", "c/", "HTTP/1.1"),
      new Request("GET", "a/", "HTTP/1.1"),
      new Request("GET", "b/", "HTTP/1.1"),
      new Request("GET", "a/", "HTTP/1.1"),
    ];
    expect(JSON.stringify(res.senders)).toEqual(
      JSON.stringify(expectedSenders)
    );
    expect(JSON.stringify(res.requests)).toEqual(
      JSON.stringify(expectedRequests)
    );
  });
});
