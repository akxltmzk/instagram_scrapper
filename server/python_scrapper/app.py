from instagram import gallery_url,close_browser
import requests, json
import sys 

gallery_url_array = ''

def get_gallery_url_array():
  username = sys.argv[1]
  global gallery_url_array
  gallery_url_array = gallery_url(username)

def send_data_to_nodejs():
  global gallery_url_array
  print(gallery_url_array)
  sys.stdout.flush()

def generator():
  yield get_gallery_url_array()
  yield send_data_to_nodejs()
  yield close_browser()

g = generator()
next(g)
next(g)
next(g)

