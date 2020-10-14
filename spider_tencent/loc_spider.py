# coding:utf-8

import requests
import pymongo
import datetime
import time

base_url = 'https://heat.qq.com/api/getLocation_uv_percent_new.php'

myclient = pymongo.MongoClient("mongodb://localhost:27017")
mydb = myclient["move"]
coll = mydb["region4164"]


def get_response(date_begin, date_end):
    params = {
        'region': '4164',
        'date_begin': date_begin,
        'date_end': date_end,
        'range': '60',
        'predict': 'false'
    }
    try:
        response = requests.get(base_url, params=params)
        result = response.json()
    except:
        print(response.url)
        print(response.text)
        result = ''
    return result


def getdaylist():
    beginDate = datetime.datetime.strptime("2020-01-01", "%Y-%m-%d")
    endDate = datetime.datetime.strptime("2020-10-12", "%Y-%m-%d")
    dayList = []

    while beginDate <= endDate:
        dayList.append(datetime.datetime.strftime(beginDate, "%Y-%m-%d"))
        beginDate += datetime.timedelta(days=+1)

    start = dayList[::5]
    start.pop()
    end = dayList[4::5]
    # print(start)
    # print(end)
    s = start[:1]+end[:-1]
    return [s, end]


def insert_db():
    [start, end] = getdaylist()
    for k, v in zip(start, end):
        arr = []
        print(k, v)
        res = get_response(k, v)
        if res:
            for each in res.items():
                arr.append({
                    "date": each[0],
                    "data": each[1]
                })
            coll.insert_many(arr)
        else:
            print(res)
        time.sleep(2)


insert_db()


def insert_one_db():
    arr = []
    res = get_response('2020-10-10', '2020-10-12')
    for each in res.items():
        arr.append({
            "date": each[0],
            "data": each[1]
        })
    # print(arr)
    coll.insert_many(arr)

# insert_one_db()
