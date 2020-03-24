import requests
import json
import pprint
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import re

#----------------------------------------------------------------------------#
#-----------------------------  variable  -----------------------------------#
#----------------------------------------------------------------------------#

MATCH_PATTERN = re.compile('<a href="(?P<photourl>[\w-]+)">')
insta_username = "01066631693"
insta_password = "haha8269^^"
login_url = 'https://www.instagram.com/accounts/login/?source=auth_switcher'
instagram_url = f'https://www.instagram.com/'

browser =  webdriver.Chrome('C:\\Users\\dohyunoo\\Documents\\chromedriver_win32\\chromedriver.exe')

#----------------------------------------------------------------------------#
#-----------------------------  function   ----------------------------------#
#----------------------------------------------------------------------------#

def gallery_url(_username):
    login_page = browser.get(login_url)
    time.sleep(1)
    instagram_login(_username)
    urllist = browserscrolldown()
    return urllist

def instagram_login(_username):
    """
    browser.find_element_by_xpath("//button[contains(.,'Log in')]").click()
    browser.find_element_by_xpath("//input[@name='email']").send_keys(insta_username)
    browser.find_element_by_xpath("//input[@name='pass']").send_keys(insta_password)
    browser.find_element_by_xpath("//button[@name='login']").click()
    time.sleep(7)
    browser.find_element_by_xpath("//button[@class='aOOlW   HoLwm ']").click()
    """
    browser.get(instagram_url + _username)

def browserscrolldown():
    elem = browser.find_element_by_tag_name("body")
    no_of_pagedowns = 1
    urllist = []
    while no_of_pagedowns:
        # html을 파싱하면서 image url을 배열(urlist)에 담는다
        html = browser.page_source
        bs_html = BeautifulSoup(html, 'html.parser')
        urllist = urllist + extract_gallery_url(bs_html)

        # 페이지 다운
        elem.send_keys(Keys.PAGE_DOWN)
        time.sleep(0.2)
        no_of_pagedowns -= 1

    # 중복제거
    urllist = list(set(urllist))
    return urllist

def extract_gallery_url(bs_html):
    urllist = []
    gallery_class = bs_html.find_all('div', {'class': 'v1Nh3 kIKUG _bz0w'})
    for each_class in gallery_class:
        try :
            url = each_class.find('img',{'class':'FFVAD'})['src']
        except :
            pass
        urllist.append(url)
    return urllist

def close_browser():
    browser.close()


