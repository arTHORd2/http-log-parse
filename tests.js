import { getSenderData, getRequestData, countMostCommonIps } from "./parser.js";
import { Sender, Request } from "./types.js";
describe("Should get correct sender data", function () {
  const senderString = "177.71.128.21 - - [10/Jul/2018:22:21:28 +0200]";
  actual = getSenderData(senderString);
  expected = {
    ip: "177.71.128.21",
    date: "10/Jul/2018",
    time: "22:21:28 +0200",
  };

  expect(actual.ip).toEqual(expected.ip);
  expect(actual.date).toEqual(expected.date);
  expect(actual.time).toEqual(expected.time);
});

describe("Should get correct request data", function () {
  const requestString = "GET /intranet-analytics/ HTTP/1.1";
  expected = {
    requestType: "GET",
    url: "/intranet-analytics/",
    protocol: "HTTP/1.1",
  };
  actual = getRequestData(requestString);
  expect(actual.requestType).toEqual(expected.requestType);
  expect(actual.url).toEqual(expected.url);
  expect(actual.protocol).toEqual(expected.protocol);
});

describe("Should get count most common IPs correctly", function () {
  expectedIps = countMostCommonIps([
    new Sender("1.1", new Date(Date())),
    new Sender("1.1", new Date(Date())),
    new Sender("1.1", new Date(Date())),
    new Sender("1.1", new Date(Date())),
    new Sender("1.2", new Date(Date())),
    new Sender("1.2", new Date(Date())),
    new Sender("1.2", new Date(Date())),
    new Sender("1.3", new Date(Date())),
    new Sender("1.3", new Date(Date())),
    new Sender("1.4", new Date(Date())),
  ]);

  expect(JSON.stringify(expectedIps)).toEqual(
    JSON.stringify(["1.1", "1.2", "1.3"])
  );
});

describe('Should get most common requests correctly', function () {
  expectedUrls = countMostCommonUrls([
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
  ]);
  expect(JSON.stringify(expectedUrls)).toEqual(
    JSON.stringify(["/home", "/about", "/about"])
  );
  
});
