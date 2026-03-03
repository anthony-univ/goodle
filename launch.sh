#!/bin/bash

# Arrêter et supprimer les conteneurs
docker compose down

# Supprimer les anciennes images inutilisées
docker image prune -a -f

# Reconstruire et redémarrer les conteneurs
docker compose up --build

