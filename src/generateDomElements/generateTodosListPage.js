import { fetchData } from "../fetchRequests/fetchData";
import { deleteTodo } from "../fetchRequests/fetchTodos";
import { setLoading } from "../loader/loader";
// Cette fonction génère la page avec la liste des utilisateurs et leurs todos.
export function generatePage(parentHtmlElement, data) {
	// On réinitialise le contenu html avant d'ajouter les données
	parentHtmlElement.innerHTML = ``;

	// La fonction map prend un tableau d'objet et retourne le même tableau mais en transformant les objets
	// Dans le cas ci dessous il prend le tableau contenant les users et transforme chaque user en une balise html avec le code html d'une card user
	// On récupère donc une liste de div qu'on va pouvoir ajouter à notre page via la méthode "append"
	const usersDiv = data.map((user) =>
		generateUserCard(user, parentHtmlElement)
	);
	parentHtmlElement.append(...usersDiv);
}

/* Cette fonction génère la card pour un utilisateur 
 et ajoute l'entête avec le nom de l'utilisateur ainsi que le contenu avec la liste des todos */
function generateUserCard(user, parentHtmlElement) {
	// Création de la div pour la card
	const divUser = document.createElement("div");
	divUser.classList.add("user");
	// Récupération du code html de l'entête (en appelant la fonction generateUserInfoHtmlElement)
	const userInfoHtmlElement = generateUserInfoHtmlElement(user);
	// Récupération de la liste des todos. La fonction Map est utilisé car pour chaque todo on veut récupérer l'équivalent en code html.
	// On transforme donc un tableau de todo en un tableau d'éléments html
	const todoHtmlElement = user.todos.map((todo) =>
		generateTodoHtmlElement(todo, parentHtmlElement)
	);
	// On ajoute l'entête et la liste des todo à la card du user.
	divUser.append(userInfoHtmlElement, ...todoHtmlElement);
	return divUser;
}

// Cette fonction génère le code html de l'entete d'une card avec le nom du user
function generateUserInfoHtmlElement(user) {
	const userInfoHtmlElement = document.createElement("p");
	userInfoHtmlElement.classList.add("user-infos");
	userInfoHtmlElement.textContent = user.name;
	return userInfoHtmlElement;
}

// Cette fonction génère le code html du contenu d'une todo avec le titre et un bouton pour afficher le details
function generateTodoHtmlElement(todo, parentHtmlElement) {
	const divTodo = document.createElement("div");
	divTodo.classList.add("todo");
	// Création de la balise contenant le titre
	const todoTitle = document.createElement("p");
	todoTitle.textContent = todo.title;

	// Création de la balise contenant les boutons
	const divTodoButtons = document.createElement("div");
	divTodoButtons.classList.add("todo-buttons");

	// Création de la balise contenant le bouton qui affiche le détail d'une todo
	const todoDetailsButton = document.createElement("a");
	// Cette balise contient une redirection vers une page spécifique pour l'affichage d'une todo : "SingleTodo/todo.html"
	// On place dans l'url l'id de la todo ("?id=12" par ex) pour pouvoir identifier quel todo on souhaite afficher.
	todoDetailsButton.innerHTML = `<a href="/singleTodo/todo.html?id=${todo.id}"><button class="btn btn-reverse-primary">Details</button></a>`;

	// Création de la balise contenant la croix pour supprimer une todo
	const todoDeleteButton = document.createElement("p");
	todoDeleteButton.textContent = "X";
	todoDeleteButton.classList.add("delete-button");

	// On rajoute un evénement sur le click du boutton supprimer pour appeler l'api de suppression
	todoDeleteButton.addEventListener("click", () =>
		handleDelete(todo, parentHtmlElement)
	);
	divTodoButtons.append(todoDetailsButton, todoDeleteButton);

	divTodo.append(todoTitle, divTodoButtons);
	return divTodo;
}

// Cette fonction est appelé à chaque click sur le bouton supprimer d'une todo
// Elle appelle l'api de suppression d'une todo en passant son id
// Cela récupère ensuite à nouveau les données et regénère la page
async function handleDelete(todo, parentHtmlElement) {
	setLoading(parentHtmlElement, true);
	await deleteTodo(todo.id);
	const data = await fetchData();
	console.log(data);
	setLoading(parentHtmlElement, false);
	generatePage(parentHtmlElement, data);
}
