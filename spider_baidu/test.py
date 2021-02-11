import requests
import datetime

url = "http://huiyan.baidu.com/migration/cityrank.jsonp"


params = {
    'dt': 'city',
    'id': '110000',
    'type': 'move_in',
    'date': '20210101'
}



def getdaylist():
    beginDate = datetime.datetime.strptime("20200901", "%Y%m%d")
    endDate = datetime.datetime.strptime("20210206", "%Y%m%d")
    dayList = []

    while beginDate <= endDate:
        dayList.append(datetime.datetime.strftime(beginDate, "%Y%m%d"))
        beginDate += datetime.timedelta(days=+1)

    return dayList

print(getdaylist())