import os
import joblib
import json
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import time
import numpy as np

# Función de preprocesamiento
def preprocess_text(text):
    # Tokenización
    tokens = word_tokenize(text.lower())
    # Eliminación de stop words
    tokens = [word for word in tokens if word.isalnum() and word not in stopwords.words('spanish')]
    return ' '.join(tokens)

# Función para generar embeddings
def get_embedding(text):
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=512)
    outputs = model(**inputs)
    # Usamos la salida del token [CLS] como el embedding del texto
    return outputs.last_hidden_state[:, 0, :].detach().numpy()

if __name__ == '__main__':
    user_input = "Quiero aprender a crear Aplicaciones Web ASP.NET"

    dir_path = os.path.dirname(os.path.realpath(__file__))

    vectorizer = joblib.load(dir_path + '/vectorizer.joblib')
    courses = joblib.load(dir_path + '/courses.joblib') # 0.002
    courses_embeddings = joblib.load(dir_path + '/courses_embeddings.joblib')

    texto_vectorizado = vectorizer.transform([user_input])

    similitudes = cosine_similarity(texto_vectorizado, courses_embeddings)

    # Índices de los cursos ordenados por similitud descendente
    indices_similares = np.argsort(similitudes[0])[::-1]
    
    # Recomendación de los cursos más similares
    result = []
    for i in indices_similares:
        result.append({"idcourse": courses[i]['idcourse'], "similarity": float(similitudes[0][i])})

    #recomendaciones = [(courses[i]['idcourse'], float(similitudes[0][i])) for i in indices_similares]

    print(json.dumps(result))
    
    '''model = joblib.load(dir_path + '/model.joblib') # 6.16
    
    tokenizer = joblib.load(dir_path + '/tokenizer.joblib')

    similarities = []
    
    
    preprocessed_input = preprocess_text(user_input)

    # Obtener el embedding del texto preprocesado del usuario
    user_embedding = get_embedding(preprocessed_input)

    
    # Calcular similitudes
    for course in courses:
        similarity = cosine_similarity(user_embedding, course['embedding'])
        similarities.append(similarity[0][0])

    # Añadir las similitudes a los cursos y ordenarlos
    for i, course in enumerate(courses):
        course['similarity'] = similarities[i]
    courses = sorted(courses, key=lambda x: x['similarity'], reverse=True)

    result = []
    # Mostrar los cursos recomendados
    for course in courses:
        #print(f"Curso: {course['name']}, Similitud: {course['similarity']}")
        result.append({"idcourse": course['idcourse'], "similarity": float(course['similarity'])})

    print(json.dumps(result))'''

    

    