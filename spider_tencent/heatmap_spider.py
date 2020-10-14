# coding:utf-8

import requests
import pymongo
import datetime
import time

base_url = 'https://heat.qq.com/api/getHeatDataByTime.php'
region_url = 'https://heat.qq.com/api/getRegionHeatMapInfoById.php'

myclient = pymongo.MongoClient("mongodb://localhost:27017")
mydb = myclient["move"]
coll = mydb["heatmapregion4163"]

region_params = {
    "id": '4163'
}
r = requests.get(region_url, params=region_params)
center = r.json()['center_gcj']


def get_response(date):
    base_params = {
        'region_id': '4163',
        'datetime': date
    }

    try:
        response = requests.get(base_url, params=base_params)
        result = response.json()
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

    hour_list = ['{num:02d}'.format(num=i) for i in range(24)]
    hour_list = list(map(lambda x: str(x)+":00:00", hour_list))

    day_hour = []
    for day in dayList:
        for hour in hour_list:
            day_hour.append(str(day)+' '+hour)

    return day_hour


def insert_db():
    day_hour = getdaylist()
    r, o = map(lambda x: float(x), center.split(','))

    for hour in day_hour:
        print(hour)
        res = get_response(hour)
        if res:
            result = []
            try:
                for each in res.items():
                    latlng, count = each
                    t = latlng.split(',')
                    lat = (10000 * r + int(t[0])) / 10000
                    lng = (10000 * o + int(t[1])) / 10000
                    result.append({
                        "lat": lat,
                        "lng": lng,
                        "count": count
                    })
                coll.insert_one({
                    "date":hour,
                    "data":result
                })
            except Exception as why:
                print(why)
        time.sleep(1.5)


insert_db()


def insert_one_db():
    arr = []
    res = get_response('2020-10-10')
    for each in res.items():
        arr.append({
            "date": each[0],
            "data": each[1]
        })
    # print(arr)
    coll.insert_many(arr)

# insert_one_db()
