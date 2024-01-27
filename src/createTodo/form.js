import { postTodo } from "../fetchRequests/fetchTodos";
import { setLoading } from "../loader/loader.js";
import { displayResult } from "../generateDomElements/displayResultHtmlElement.js";
import { fetchUsers } from "../fetchRequests/fetchUsers.js";
import { genrateUserSelectHtmlElement } from "../generateDomElements/genrateUserSelectHtmlElement.js";
const form = document.querySelector("#monForm");

// Cette fonction crée dynamiquement la liste des utilisateurs disponibles dans le form à partir des users récupérés de l'api
async function displayUserSelectListOnForm() {
	setLoading(form, true);
	// Récupère la liste des users depuis l'API
	const users = await fetchUsers();
	const userSelectHtmlElement = document.querySelector("#userId");

	// Rajoute toutes les options possibles dans le champ du form correspondant aux utilisateurs
	genrateUserSelectHtmlElement(userSelectHtmlElement, users);
	setLoading(form, false);
}

// Crée dynamiquement la liste des utilisateurs disponibles à partir des users récupérés de l'api
displayUserSelectListOnForm();

// J'écoute l'évenement submit du formulaire et lorsqu'il est déclenché j'appelle la méthode "handleSubmit"
form.addEventListener("submit", handleSubmit);

//Cette méthode est appellé lors de l'évenement submit. Elle contient en paramètre l'événement passé par l'eventListener
async function handleSubmit(event) {
	// Evite le comporte par défaut de la soumission du formulaire, notament le rechargement de la page.
	event.preventDefault();

	// Affiche un spinner de chargement pendant que la requête s'éxecute
	setLoading(form, true);
	// Appelle une méthode stocké dans un autre module qui va créer une todo
	const result = await postTodo(form);
	// Une fois la requête effectuée le spinner de chargement disparaît
	setLoading(form, false);
	// Appelle une méthode qui va afficher le résultat dans la page html
	displayResult(form, result);
}
