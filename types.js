export class Sender {
  constructor(ip, date, time) {
    this.ip = ip
    this.date = date
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