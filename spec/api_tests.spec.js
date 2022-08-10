import fetch from "node-fetch";

describe("Count URLs endpoint", function () {
  it("should get the correct number of unique IP addresses", async function () {
    const r = await fetch("http://localhost:3000/num_unique_ips");
    expect(r.status).toEqual(200);
    const data = await r.json();
    expect(data.numIps).toEqual(11);
  });
});

describe("Count frequent URLs endpoint", function () {
  it("should get the number of frequent URLs specified by parameter", async function () {
    const r = await fetch("http://localhost:3000/top_urls?count=2");
    expect(r.status).toEqual(200);
    const data = await r.json();
    expect(JSON.stringify(data.commonUrls)).toEqual(
      JSON.stringify(["/docs/manage-websites/", "/intranet-analytics/"])
    );
  });
  it("should default to 3 if no count is queried", async function () {
    const r = await fetch("http://localhost:3000/top_urls");
    expect(r.status).toEqual(200);
    const data = await r.json();
    expect(JSON.stringify(data.commonUrls)).toEqual(
      JSON.stringify([
        "/docs/manage-websites/",
        "/intranet-analytics/",
        "http://example.net/faq/",
      ])
    );
  });
  it("should return an empty array if count is 0", async function () {
    const r = await fetch("http://localhost:3000/top_urls?count=0");
    expect(r.status).toEqual(200);
    const data = await r.json();
    expect(JSON.stringify(data.commonUrls)).toEqual(JSON.stringify([]));
  });
});

describe("Count frequent IPs endpoint", function () {
  it("should get the number of frequent IPs specified by parameter", async function () {
    const r = await fetch("http://localhost:3000/top_ips?count=2");
    expect(r.status).toEqual(200);
    const data = await r.json();
    expect(JSON.stringify(data.commonIps)).toEqual(
      JSON.stringify(["168.41.191.40", "177.71.128.21"])
    );
  });
  it("should default to 3 if no count is queried", async function () {
    const r = await fetch("http://localhost:3000/top_ips");
    expect(r.status).toEqual(200);
    const data = await r.json();
    expect(JSON.stringify(data.commonIps)).toEqual(
      JSON.stringify(["168.41.191.40", "177.71.128.21", "50.112.00.11"])
    );
  });
  it("should return an empty array if count is 0", async function () {
    const r = await fetch("http://localhost:3000/top_ips?count=0");
    expect(r.status).toEqual(200);
    const data = await r.json();
    expect(JSON.stringify(data.commonIps)).toEqual(JSON.stringify([]));
  });
});
