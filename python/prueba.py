import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import os
from csv import DictReader

# Datos de los cursos
'''courses = [
    {"id": 1, "title": "Curso de JavaScript", "description": "Aprende JavaScript desde cero hasta avanzado."},
    {"id": 2, "title": "Curso de Python", "description": "Domina Python para desarrollo web y analisis de datos."},
    {"id": 3, "title": "Curso de Machine Learning", "description": "Introduccion al machine learning con ejemplos practicos."}
]'''

def get_data_from_csv(path):
    # open file in read mode
    with open(path, 'r', encoding='utf8') as f:
        dict_reader = DictReader(f)
        list_of_dict = list(dict_reader)
        return list_of_dict

courses = get_data_from_csv('cursos.csv')

# Crear una lista de descripciones
descriptions = [course["description"] for course in courses]

# Vectorizar las descripciones
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(descriptions)

# Guardar el vectorizador y los datos
dir_path = os.path.dirname(os.path.realpath(__file__))

joblib.dump(vectorizer, dir_path + '/vectorizer.joblib')
joblib.dump(X, dir_path + '/courses_embeddings.joblib')
joblib.dump(courses, dir_path + '/courses.joblib')