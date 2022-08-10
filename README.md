
# HTTP Log Parse Exercise

## Instructions

### Running the API
```
node app.js <port number>
```
If no port number is specified, it will default to 3000
### Endpoints
**All endpoints return their data in JSON format**
```
/num_unique_ips
```
Returns the number of unique IPs
```
/top_ips?count=
```
Returns the IPs that appear most frequently in the log file. The number of IPs can
be specified as a query param `count`. If `count` is not specified, it will default
to 3
```
/top_urls?count=
```
Returns the URLs that appear most frequently in the log file. The number of URLs can
be specified as a query param `count`. If `count` is not specified, it will default
to 3
### Running the tests
Make sure that the server is running on `localhost:3000` before running the tests. Otherwise, the API tests will fail.
```
npm test
```

## Assumptions
### Specification assumptions
- For `/top_ips` and `/top_urls`, if multiple ips/urls occur with the same frequency, we will return the one that appears earliest in the log
- We do **not** need to return the frequency of each IP/URL
- We prioritise time optimisation over space optimisation

### Data assumptions
 - Each entry in the log file will be separate by a newline character
 - Request data and machine data will be enclosed in " characters
 - IP address, user data, time data, request type, URL, and protocol will all be separated by spaces
 - The ordering of data is the same as the given sample log file
 
## Tradeoffs
### Counting frequencies of IPs and URLs
The current implementation will do a linear scan through all the data create an array of objects, representing
each url/ip and it's frequency. This array is reverse sorted on occurences, and the first
elements are returned. The approach used here uses an O(nlogn) sort to get
any k most frequent URLs.

An alternative implementation is, once we generate the list of occurences, find the max element using linear scan,
remove it, and then run another linear scan to get the next max. However, this approach would be
O(nk), which approaches O(n^2) as k increases.

### Reading in the file
The given implementation will synchronously read in the entire file, then extract the data all at once. This may cause memory issues if the file is extremely large. 

The alternative approach is to read and process the file line-by-line. This limits the amount of data being stored in memory at any given time. However, this also increases the amount of read operations to the file, which can become very slow. As stated in the assumptions, the choice was made to prioritise time over space.

## Tests
Tests have been implemented with the Jasmine library. This allows for behaviour-specific tests that ensure the code adheres to the specification. Jasmine tests are also more suited for JavaScript projects that don't require a DOM than other testing frameworks, like Jest or Mocha

### Unit tests
The unit tests only cover one function, with mock input. Each `describe` block is a function, and the `it()` blocks are different functionalities and edge-cases that should be managed
### Integration tests
Integration tests will cover different behaviours that will require more than one function. They check whether the inputs and outputs of each function are compatible with each other.

### API tests
These tests directly call the API endpoints hosted on localhost:3000. These tests
are end-to-end, and simulate the expected use-case of this project

## DevOps
The file `.github/workflows/` outlines a Github Actions workflow that runs whenever code is pushed to the master branch. The YAML file will run `node app.js &`, which runs the API in the background on port 3000. The script then waits 1 second for the server to start before running the tests. Once the tests are finished, the script terminates the server.