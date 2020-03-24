from instagram import gallery_url,close_browser
import requests, json
import sys 

gallery_url_array = ''

def get_user_name():
  username = sys.argv[1]
  global gallery_url_array
  gallery_url_array = gallery_url(username)

def send_data_to_scrapper():
  global gallery_url_array
  print(gallery_url_array)
  sys.stdout.flush()

def generator():
  yield get_user_name()
  yield send_data_to_scrapper()
  yield close_browser()

g = generator()
next(g)
next(g)
next(g)


# gallery_url = gallery_url('jjong.h')
# print(len(gallery_url))
# sys.stdout.flush()