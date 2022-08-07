/**
 * It was decided to use specific classes for this exercise, rather than simply
 using objects. There is minimal extra engineering effort, and the code becomes
 more readable and more extensible
 */
export class Sender {
  // It would be better to use the Date object in JavaScript, however for brevity
  // of the exercise, the date and time are stored as strings
  constructor(ip, date, time) {
    this.ip = ip
    this.date = date
    this.time = time
  }
}

export class Request {
  // The requestType here could be an enum with the common HTTP request types 
  // (GET, POST, UPDATE etc.). The protocol attribute could similarly be an enum
  constructor(requestType, url, protocol) {
    this.requestType = requestType
    this.url = url
    this.protocol = protocol
  }
}