import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from transformers import BertTokenizer, BertModel
import torch
from sklearn.metrics.pairwise import cosine_similarity
from csv import DictReader
import os
import joblib
from csv import DictReader

# Descargar stopwords
#nltk.download('punkt')
#nltk.download('stopwords')

# Datos de los cursos
'''courses = [
    {"id": 1, "name": "Curso de JavaScript", "description": "Aprende JavaScript desde cero hasta avanzado."},
    {"id": 2, "name": "Curso de Python", "description": "Domina Python para desarrollo web y analisis de datos."},
    {"id": 3, "name": "Curso de Machine Learning", "description": "Introduccion al machine learning con ejemplos practicos."}
]'''

def get_data_from_csv(path):
    # open file in read mode
    with open(path, 'r', encoding='utf8') as f:
        dict_reader = DictReader(f)
        list_of_dict = list(dict_reader)
        return list_of_dict

#custom_stopwords = ['quiero', 'deseo', 'necesito', 'preciso', 'busco', 'aprender']

# Cargar el modelo y el tokenizador BERT
tokenizer = BertTokenizer.from_pretrained('dccuchile/bert-base-spanish-wwm-cased')
model = BertModel.from_pretrained('dccuchile/bert-base-spanish-wwm-cased')

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
    courses = get_data_from_csv('cursos.csv')

    # Preprocesar y obtener embeddings de los cursos
    for course in courses:
        course['preprocessed_description'] = preprocess_text(course['description'])
        course['embedding'] = get_embedding(course['preprocessed_description'])

    # Guardar el vectorizador y los datos
    dir_path = os.path.dirname(os.path.realpath(__file__))

    joblib.dump(courses, dir_path + '/courses.joblib')
    joblib.dump(model, dir_path + '/model.joblib')
    joblib.dump(tokenizer, dir_path + '/tokenizer.joblib')

    #print(preprocess_text('esto es un texto'))