# Utilisez une image de base Python
FROM python:3.12.2

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le code de l'application Flask dans le conteneur
COPY . /app

# Installez les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Install PyMySQL instead of mysqlclient
RUN pip install mysqlclient==2.0.3
#RUN pip install marshmallow-sqlalchemy

# Commande par défaut pour exécuter l'application Flask
CMD ["python", "app.py"]
