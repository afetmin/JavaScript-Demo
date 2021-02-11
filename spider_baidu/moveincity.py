import requests
import re
import json
import pymongo
import datetime
import time
import xlrd
from urllib import parse

myclient = pymongo.MongoClient("mongodb://localhost:27017")
mydb = myclient["baidu"]
coll = mydb["moveoutcity"]

base_url = "http://huiyan.baidu.com/migration/cityrank.jsonp"


def read_xlsx():
    book = xlrd.open_workbook('./百度迁徙数据爬取.xlsx')
    sheet = book.sheet_by_name('各城市迁出目的地-按日统计')
    return sheet.col_values(0)


def getdaylist():
    beginDate = datetime.datetime.strptime("20201001", "%Y%m%d")
    endDate = datetime.datetime.strptime("20210206", "%Y%m%d")
    dayList = []

    while beginDate <= endDate:
        dayList.append(datetime.datetime.strftime(beginDate, "%Y%m%d"))
        beginDate += datetime.timedelta(days=+1)

    return dayList


def loads_jsonp(_jsonp):
    try:
        return json.loads(re.match(".*?({.*}).*", _jsonp, re.S).group(1))
    except:
        raise ValueError('Invalid Input')


def parse_url(url):
    result = parse.urlparse(url)
    query_dict = parse.parse_qs(result.query)
    return query_dict['id'][0]


def get_response(_id, date):
    params = {
        'dt': 'city',
        'id': _id,
        'type': 'move_out',
        'date': date
    }
    response = requests.get(base_url, params=params)
    result = response.text
    return result


def main():
    daylist = getdaylist()
    urllist = read_xlsx()
    for url in urllist:
        city_id = parse_url(url)
        for date in daylist:
            try:
                res = get_response(city_id, date)
            except Exception as why:
                print(why)
                time.sleep(3)
            data = loads_jsonp(res)
            if (data['errno'] == 0):
                result = data['data']['list']
                if result:
                    coll.insert_one({
                        'id': city_id,
                        'date': date,
                        'data': result
                    })
                    print(city_id, date)
            time.sleep(1)


main()
