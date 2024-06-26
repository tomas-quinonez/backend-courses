import os
import joblib
import json
import sys
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.metrics.pairwise import cosine_similarity

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
    user_input = sys.argv[1]

    dir_path = os.path.dirname(os.path.realpath(__file__))

    courses = joblib.load(dir_path + '/courses.joblib')
    model = joblib.load(dir_path + '/model.joblib')
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
        if float(course['similarity']) >= 0.75:
            result.append(int(course['idcourse']))
        break

    print(json.dumps(result))