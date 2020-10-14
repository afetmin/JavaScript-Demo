import datetime
import requests

# beginDate = datetime.datetime.strptime("2020-01-01", "%Y-%m-%d")
# endDate = datetime.datetime.strptime("2020-10-12", "%Y-%m-%d")
# dayList = []

# while beginDate <= endDate:
#     dayList.append(datetime.datetime.strftime(beginDate, "%Y-%m-%d"))
#     beginDate += datetime.timedelta(days=+1)

# start = dayList[::5]
# start.pop()
# end = dayList[4::5]

# s = start[:1]+end[:-1]
# print(s)
# print(end)


# for k,v in zip(s,end):
#     print(k,v)

# region_url = 'https://heat.qq.com/api/getRegionHeatMapInfoById.php?id=4164'
# r = requests.get(region_url)
# center = r.json()['center_gcj']

# base_url = 'https://heat.qq.com/api/getHeatDataByTime.php'

# params = {
#     'region_id': '4164',
#     'datetime': '2020-10-12 16:00:00'
# }

# res = requests.get(base_url, params=params)
# data = res.json()
# r, o = map(lambda x: float(x), center.split(','))
# result = []
# for each in data.items():
#     latlng, count = each
#     t = latlng.split(',')
#     lat = (10000 * r + int(t[0])) / 10000
#     lng = (10000 * o + int(t[1])) / 10000
#     result.append({
#         "lat": lat,
#         "lng": lng,
#         "count": count
#     })

# print(result)

# hour_list = ['{num:02d}'.format(num=i) for i in range(24)]
# hour_list = list(map(lambda x: str(x)+":00:00",hour_list))

# day_hour = []
# for day in dayList:
#     for hour in hour_list:
#         day_hour.append(str(day)+' '+hour)
# print(day_hour)

url = 'https://report.amap.com/cityTravel/inAndOutCity.do'
params = {
    'adcode': '210200',
    'dt': '2020-07-21',
    'willReal': 'WILL',
    'size': '20',
    'inOut': 'IN'
}

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36 Edg/86.0.622.38',
    'cookie': 'user_unique_id=a187b9ae74ba457e017524cc42e37fbc'
}
res = requests.get(url, params=params,headers=headers)
print(res.url)
print(res.text)
