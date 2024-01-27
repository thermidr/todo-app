# Lancement de l'application

Exécuter la commande suivante pour installer les packages (vite et sass)

```bash
npm install
```

Mettez votre userKey dans le fichier config.js à la racine du projet :

```bash
export const userKey = "<Mettre votre userKey ici>";
```

Exécuter la commande suivante pour lancer le serveur vite

```bash
npm start
```

# Description de l'application

Cette application contient trois pages :

- Une page qui affiche la liste des tâches (ou todos) par utilisateur. Il est possible de supprimer une todo ou d'en afficher le détail
- Une page qui affiche un formulaire pour créer une nouvelle todo
- Une page qui affiche le détails d'une todo

Toutes ces données sont récupérés depuis l'api suivante : [http://138.68.173.105/api](http://138.68.173.105/api)

Cette api contient deux collections :

- todos : [http://138.68.173.105/api/todos](http://138.68.173.105/api/todos)
- users : [http://138.68.173.105/api/users](http://138.68.173.105/api/users)

#### Attention pour l'accès à la collection "todos" il faut passer une userKey dans les headers pour être authentifié.

# Organisation du projet

Le fichier index.html est la racine du projet.

Il importe le fichier index.js qui va charger les données users et todos de l'api (via deux méthodes GET) et les afficher. Il importe également le fichier de style global : "styles.scss"

# Architecture de l'application

L'application est décomposé en différents sous dossiers :

## assets

Il Contient tous les fichiers de styles génériques
Il pourra également contenir des image si des images sont utilisées

## src

Ce dossier contient tous les fichiers sources de l'application

Dans le dossier source on a l'architecture suivante :

- #### Racine du dossier

  A la racine du dossier on retrouve le fichier index.html, index.js et styles.scss. Ils permettent d'afficher la page d'accueil qui contient affichent les todos par user.

- #### createTodo

  Ce dossier contient le code html js et scss pour afficher la page formulaire de création d'une todo

- #### singleTodo

  Ce dossier contient le code html js et scss pour afficher la page de détails d'une Todo (qui affiche le user, le titre et le contenu d'une todo selectionné)

- #### loader

  Ce dossier contient le code js et scss pour afficher le spinner de loading

- #### fetchRequests

  Ce dossier contient les différents appels à l'api (GET, TODO, etc...) répartis dans différents modules (fichiers).

- #### generateDomElements
  Ce dossier contient les différentes méthodes qui génèrent le code HTML répartis dans différents modules (fichiers).

# Notes

Chaque page html ne charge que les scripts js et le code scss dont il a besoin.

Par exemple la page index.html contient uniquement le script "index.js" et le scss nécessaire pour son affichage "index.scss".

La page form.html contient uniquement le script "form.js" et le scss nécessaire pour son affichage : "form.scss"

Chaque fichier scss importe le fichier de style générique stocké dans "assets/styles/styles.scss"
