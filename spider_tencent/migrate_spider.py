# coding:utf-8

import requests
import pymongo
import datetime
import time

base_url = 'https://report.amap.com/cityTravel/inAndOutCity.do'

myclient = pymongo.MongoClient("mongodb://localhost:27017")
mydb = myclient["move"]
coll = mydb["migrateIn"]

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36 Edg/86.0.622.38',
    'cookie': 'user_unique_id=a187b9ae74ba457e017524cc42e37fbc'
}


def get_response(date):
    params = {
        'adcode': '210200',
        'dt': date,
        'willReal': 'WILL',
        'size': '100',
        'inOut': 'IN'
    }

    try:
        response = requests.get(base_url, params=params, headers=headers)
        result = response.text
    except Exception as why:
        print(why)
        print('url:', response.url)
        print('text:', response.text)
        result = ''
    return result


def getdaylist():
    beginDate = datetime.datetime.strptime("2020-01-02", "%Y-%m-%d")
    endDate = datetime.datetime.strptime("2020-10-12", "%Y-%m-%d")
    dayList = []

    while beginDate <= endDate:
        dayList.append(datetime.datetime.strftime(beginDate, "%Y-%m-%d"))
        beginDate += datetime.timedelta(days=+1)

    return dayList


def insert_db():
    dayList = getdaylist()

    for day in dayList:
        print(day)
        res = get_response(day)
        if res:
            try:
                coll.insert_one({
                    "date": day,
                    "data": res
                })
            except Exception as why:
                print(why)
        time.sleep(1.5)


insert_db()

