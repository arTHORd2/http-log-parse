export class Sender {
  constructor(ip, time) {
    this.ip = ip
    this.time = time
  }
}

export class Request {
  constructor(requestType, url, protocol) {
    this.requestType = requestType
    this.url = url
    this.protocol = protocol
  }
}