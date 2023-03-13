'''
	Builds database collections by web scraping.
'''

import os
import pymongo
from dotenv import load_dotenv
from bs4 import BeautifulSoup
from urllib.request import urlopen

load_dotenv('.env')
DB_URI = os.getenv('DB_URI')
DB_NAME = os.getenv('DB_NAME')
cluster = pymongo.MongoClient(DB_URI)
db = cluster[DB_NAME]

def clear_subjects():
	"""
	Deletes everthing in subjects collection.
	"""
	deleted = db['subjects'].delete_many({})
	print(f'Delete {deleted.deleted_count} entries.')

def build_subjects(upload_type="db"):
	"""
	Get all subjects from duckweb classes page.
	The subjects found get put into the database.
	"""
	try:
		url = 'https://duckweb.uoregon.edu/duckweb/hwskdhnt.p_search?term=202203'
		page = urlopen(url)
		html = page.read().decode('utf-8')
		soup = BeautifulSoup(html, 'html.parser')
		subjects_tag = soup.find('select', {'id': 'subj_id'})
		subjects = {subject['value']: subject.text for subject in subjects_tag if subject != '\n'}
		del subjects["%"] # delete 'not selected entry'.
		if upload_type == "db":
			db['subjects'].insert_many([subjects])
		else:
			return subjects
	except Exception as e:
		print(e)

def main():
	build_subjects()
	# clear_subjects() # use if you want to clear all subject entries in the database.
	
if __name__ == '__main__':
	main()