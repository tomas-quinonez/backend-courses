# load_model.py
import joblib
import os
import json

dir_path = os.path.dirname(os.path.realpath(__file__))

vectorizer = joblib.load(dir_path + '/vectorizer.joblib')
courses = joblib.load(dir_path + '/courses.joblib')

print(vectorizer.get_feature_names_out().tolist())
print(json.dumps(courses))
