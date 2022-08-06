from parser import getSenderData
from parser import getRequestData
from parser import countMostCommon

def testGetSender():
  senderString = "177.71.128.21 - - [10/Jul/2018:22:21:28 +0200]"
  actual = getSenderData(senderString)
  expected = {
    "ip": "177.71.128.21",
    "date": "10/Jul/2018",
    "time": "22:21:28 +0200"
  }
  assert actual == expected
  
def testGetRequestData():
  requestString = 'GET /intranet-analytics/ HTTP/1.1'
  expected = {
    'requestType': 'GET',
    'url': '/intranet-analytics/',
    'protocol': 'HTTP/1.1'
  }
  actual = getRequestData(requestString)
  assert actual == expected

def testCountMostCommon():
  ipCounts = {
  '1': 4,
  '2': 5,
  '3': 6,
  '4': 8,
  '5': 7
  }
  urlCounts = {
  'a': 4,
  'b': 5,
  'c': 6,
  'd': 7,
  'e': 8
  }
  ips, urls = countMostCommon(ipCounts, urlCounts)
  expectedIps = ['4', '5', '3']
  expectedurls =  ['e', 'd', 'c']
  
  assert ips == expectedIps
  assert urls == expectedurls
  
  

  
