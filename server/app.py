from flask import Flask, request, jsonify, render_template, redirect
from flask_restful import Api, Resource
from flask_cors import CORS
# from db import connect_to_DB
from _datetime import datetime
# from bson import json_util
import json
from bson.objectid import ObjectId
from statistics import mean
import os

import subprocess
import re

from urllib.request import urlopen

#
# posts, users, servicesDB = connect_to_DB()

app = Flask(__name__, static_folder='uptime')
CORS(app)
api = Api(app)

@app.route('/')
def main():
  return render_template('index.html')


@app.route('/ping', methods=['POST'])
def ping_site():
  request_data = request.get_json()
  data = request_data['data']
  print(data)
  host = data['url']
  ping = subprocess.Popen(
    ["ping", "-c", "1", host],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
  )

  out, error = ping.communicate()
  pings_5 = out.decode().split('\n')[1:2]
  print(pings_5)
  matcher = re.compile("round-trip min/avg/max/stddev = (\d+.\d+)/(\d+.\d+)/(\d+.\d+)/(\d+.\d+)")
  # print(matcher.search(out.decode()).groups())
  avg = matcher.search(out.decode()).groups()

  return jsonify({'ping': pings_5, 'value': avg[0], 'time': datetime.now().timestamp()})


@app.route('/mtr', methods=['POST'])
def mtr_site():
  request_data = request.get_json()
  data = request_data['data']
  print(data)
  host = data['url-mtr']

  ping = subprocess.Popen(
    ["sudo", "-s", "mtr", "-c3", "--report", host],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
  )
  trace_list = []
  out, error = ping.communicate()
  while True:
    print(out.decode() == '')
    if not out.decode() == '':
      pings_5 = out.decode()
      print(pings_5)
      lst = pings_5.split('\n')
      del lst[0]
      del lst[0]
      del lst[-1]
      for line in lst:
        line_arr = line.split(),
        print(line_arr[0])
        curr_ip = line.split()[1]
        curr_ip_chunks = curr_ip.split('.')
        if len(curr_ip_chunks) == 4:
          if curr_ip_chunks[0] == '192':
            print(line, "on my network")
            # print(curr_ip, "on my local network")
          else:
            try:
              responce = urlopen(
                "https://api.ipgeolocation.io/ipgeo?apiKey=ff273f84bb4641e3a665b0aafa3c1119&ip={}&include=hostname".format(
                  curr_ip)).read().decode()
              dt = json.loads(responce)
              print(line, dt["city"], dt["state_prov"], dt["country_name"])
              each = {
                "host": line_arr[0][0],
                "hostname": line_arr[0][1],
                "loss": line_arr[0][2],
                "snt": line_arr[0][3],
                "last": line_arr[0][4],
                "avg": line_arr[0][5],
                "best": line_arr[0][6],
                "wrst": line_arr[0][7],
                "stdev": line_arr[0][8],
                "city": dt["city"],
                "prov": dt["state_prov"],
                "country": dt["country_name"]
              }
              trace_list.append(each)
            except:
              pass
        else:
          each = {
            "host": line_arr[0][0],
            "hostname": line_arr[0][1],
            "loss": line_arr[0][2],
            "snt": line_arr[0][3],
            "last": line_arr[0][4],
            "avg": line_arr[0][5],
            "best": line_arr[0][6],
            "wrst": line_arr[0][7],
            "stdev": line_arr[0][8],
            "city": '',
            "prov": '',
            "country": ''
          }
          trace_list.append(each)
    return json.dumps({'ping': trace_list}, indent=4)

@app.route('/trace', methods=['POST'])
def trace_site():
  trace_list = []
  request_data = request.get_json()
  data = request_data['data']
  print(data)
  host = data['url-trace']

  trace_result = subprocess.check_output(["traceroute", "-m12", host]).decode()
  lst = trace_result.split('\n')
  del lst[0]
  del lst[-1]
  for line in lst:
    curr_ip = line.split()[2].strip('()')
    curr_ip_chunks = curr_ip.split('.')
    if len(curr_ip_chunks) == 4:
      if curr_ip_chunks[0] == '192':
        print(line, "on my network")
        # print(curr_ip, "on my local network")
      else:
        responce = urlopen(
          "https://api.ipgeolocation.io/ipgeo?apiKey=ff273f84bb4641e3a665b0aafa3c1119&ip={}&include=hostname".format(
            curr_ip)).read().decode()
        dt = json.loads(responce)
        print(line, dt["city"], dt["state_prov"], dt["country_name"])
        each = {
          "res": line,
          "city": dt["city"],
          "prov": dt["state_prov"],
          "country": dt["country_name"]
        }
        trace_list.append(each)
        # print(curr_ip, dt["city"], dt["state_prov"], dt["country_name"])
  return json.dumps(trace_list, indent=4)


@app.route('/dns', methods=['POST'])
def dns_site():
  request_data = request.get_json()
  data = request_data['data']
  print(data)
  host = data['url-dns']
  ping = subprocess.Popen(
    # time nslookup -type=any picsart.com
    ["dig", "any", host],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
  )

  out, error = ping.communicate()
  pings_5 = out.decode().split('\n')
  print(pings_5)
  # result = re.search('com/(.*)', url)
  # pings_6 =[each.split(':') for each in pings_5]
  matcher = re.compile("round-trip min/avg/max/stddev = (\d+.\d+)/(\d+.\d+)/(\d+.\d+)/(\d+.\d+)")
  # print(matcher.search(out.decode()).groups())
  # avg = matcher.search(out.decode()).groups()

  return json.dumps({'ping': pings_5}, indent=4)


# app.wsgi_app = ProxyFix(app.wsgi_app)
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=9999, debug=True)
