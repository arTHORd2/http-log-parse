import re
from collections import defaultdict

def getSenderData(senderData):
  senderDataDict = {}
  senderDataList = senderData.split(" ")
  # Assumption: the length of the IP, date, and time encodings in the log file
  # will be consistent
  senderDataDict["ip"] = senderDataList[0]
  senderDataDict["date"] = senderDataList[3][1:12]
  senderDataDict["time"] = senderDataList[3][13:] + " " + senderDataList[4][:-1]
  return senderDataDict
  
def getRequestData(requestData):
  requestDataList = requestData.split(' ')
  return {
    'requestType': requestDataList[0],
    'url': requestDataList[1],
    'protocol': requestDataList[2]
  }
  
def getStatusData(statusData):
  pass
def getMachineData(machineData):
  pass

# Given a dictionary of IP counts and URL counts, returns the 3 most common IPs
# and URLs to the caller
def countMostCommon(ipCounts, urlCounts):
  mostCommonIps = sorted(ipCounts, key=ipCounts.get, reverse=True)[:3]
  mostCommonUrls = sorted(urlCounts, key=urlCounts.get, reverse=True)[:3]
  
  return (mostCommonIps, mostCommonUrls)

def printResults(ipCounts, urlCounts, mostCommonIps, mostCommonUrls):
  print("Number of unique IP addresses: ", len(ipCounts.keys()))
  print("Top 3 most common IP addresses: ")
  for ip in mostCommonIps:
    print(ip, ipCounts[ip])
  print("Top 3 most visited URLs:")
  for url in mostCommonUrls:
    print(url, urlCounts[url])

def processDataFile(fileName='./test.log'):
  file = open(fileName)
  ipCounts = defaultdict(int)
  urlCounts = defaultdict(int)
  for line in file:
    tokens = line.split("\"")
    senderData = getSenderData(tokens[0])
    requestData = getRequestData(tokens[1])
    ipCounts[senderData["ip"]] += 1
    urlCounts[requestData["url"]] += 1
  return (ipCounts, urlCounts)
  
  
    

if __name__ == "__main__":
  ipCounts, urlCounts = processDataFile()
  mostCommonIps, mostCommonUrls = countMostCommon(ipCounts, urlCounts)
  printResults(ipCounts, urlCounts, mostCommonIps, mostCommonUrls)
    
    



