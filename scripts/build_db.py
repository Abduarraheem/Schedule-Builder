'''
	Builds database collections by web scraping.
'''

import os
import pymongo
import json
from dotenv import load_dotenv
from bs4 import BeautifulSoup
from urllib.request import urlopen
from sys import argv, exit

load_dotenv('.env')
DB_URI = os.getenv('DB_URI')
DB_NAME = os.getenv('DB_NAME')
cluster = pymongo.MongoClient(DB_URI)
db = cluster[DB_NAME]
store_types = ["local", "db"]
build_types = ["subjects", "classes"]

def clear_subjects():
	"""
	Deletes everthing in subjects collection.
	"""
	deleted = db['subjects'].delete_many({})
	print(f'Deleted {deleted.deleted_count} entries.')

def build_subjects(store_type="local"):
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
		if store_type == "db":
			newSubjects = []
			for attr, value in subjects.items():
				newSubjects.append({"dept": value, "code": attr})
			db['subjects'].insert_many(newSubjects)
			print("Inserted to db.")
		elif store_type == 'local':
			return subjects
		else:
			print("Unknown upload type.")
	except Exception as e:
		print(e)

def build_classes(store_type="db"):
	"""
	Put classes to the database.
	TODO
	"""
	return

build_functions = {"subject" : build_subjects, "classes" : build_classes}

def main(argv):
	try:
		build_type = argv[1]
	except:
		functions = build_functions.values()
		print(f"usage: python scripts/build_db.py build_type [store_type]\n \
				build_type: one of {[func.__name__.strip('build_') for func in functions]}\n\
				store_type (optional): one of {store_types}, defualt is 'local'")
		exit()
	try:
		store_type = argv[2]
	except:
		store_type = "local"
	clear_subjects() # use if you want to clear all subject entries in the database.
	built_dict = build_functions[build_type](store_type)
	if store_type == "local":
		file_name = build_type+".json"
		with open(file_name, "w") as outfile:
			json.dump(built_dict, outfile)
		print(f"Saved locally to {file_name}")
	
if __name__ == '__main__':
	main(argv)
