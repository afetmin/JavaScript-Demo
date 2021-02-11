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
coll = mydb["movein"]


def read_xlsx():
    book = xlrd.open_workbook('./百度迁徙数据爬取.xlsx')
    sheet = book.sheet_by_name('各市迁徙指数-按日-迁入指数')
    return sheet.col_values(0)

def getdaylist():
    beginDate = datetime.datetime.strptime("2020-09-01", "%Y-%m-%d")
    endDate = datetime.datetime.strptime("2021-02-05", "%Y-%m-%d")
    dayList = []

    while beginDate <= endDate:
        dayList.append(datetime.datetime.strftime(beginDate, "%Y-%m-%d"))
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


def main():
    # daylist = getdaylist()
    urllist = read_xlsx()
    for url in urllist:
        city_id = parse_url(url)
        try:
            res = requests.get(url)
        except Exception as why:
            print(why)
        data = loads_jsonp(res.text)
        if (data['errno'] == 0):
            result = data['data']['list']
            if result:
                coll.insert_one({
                    'id':city_id,
                    'data':result
                })
                print(city_id)
        time.sleep(1)

main()