# import pymongo
#
#
# def connect_to_DB():
#   client = pymongo.MongoClient(host='mongodb://opsstatus:opsstatus1@ds139167.mlab.com:39167/opsstatus')
#   # client = pymongo.MongoClient(host='mongodb://uptime:pxzzApaMNqb8PbtS@34.73.46.96:27017/uptime_server')
#   db1 = client.opsstatus
#   posts = db1.posts
#
#   db2 = client.opsstatus
#   usr = db2.users
#
#   db3 = client.opsstatus
#   services = db3.services
#
#   return posts, usr, services

# def users():
#   client = pymongo.MongoClient(host='mongodb://opsstatus:opsstatus1@ds139167.mlab.com:39167/opsstatus')
#   db = client.opsstatus
#   usr = db.users
#   return usr
