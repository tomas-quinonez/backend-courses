import os
import joblib
import json
import sys
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


if __name__ == '__main__':
    user_input = sys.argv[1]

    dir_path = os.path.dirname(os.path.realpath(__file__))

    vectorizer = joblib.load(dir_path + '/vectorizer.joblib')
    courses = joblib.load(dir_path + '/courses.joblib')
    courses_embeddings = joblib.load(dir_path + '/courses_embeddings.joblib')

    texto_vectorizado = vectorizer.transform([user_input])

    similitudes = cosine_similarity(texto_vectorizado, courses_embeddings)

    # Índices de los cursos ordenados por similitud descendente
    indices_similares = np.argsort(similitudes[0])[::-1]
    
    # Recomendación de los cursos más similares
    result = []
    for i in indices_similares:
        if float(similitudes[0][i]) >= 0.75:
            result.append(int(courses[i]['idcourse']))
        break

    print(json.dumps(result))

    

    