import { fetchSingleTodo } from "../fetchRequests/fetchTodos.js";
import { generateSingleTodoCard } from "../generateDomElements/generateSingleTodoPage.js";
import { setLoading } from "../loader/loader.js";

// Ces lignes permettent de récupérer l'id de la todo à partir de l'url de la page. Voir la doc ci-dessous
//https://developer.mozilla.org/en-US/docs/Web/API/Location
// https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
let params = new URL(document.location).searchParams;
let todoId = params.get("id"); // is the string "Jonathan Smith".
await displayTodoPage();

//Cette fonction affiche le contenu de la page qui contient le détail d'une todo
async function displayTodoPage() {
	const singleTodoHtmlElement = document.querySelector("#singleTodo");
	setLoading(singleTodoHtmlElement, true);

	// Appel l'api pour récupérer les infos d'une todo unique grâce à son id.
	const result = await fetchSingleTodo(todoId);
	setLoading(singleTodoHtmlElement, false);
	// Génère la page à partir du contenu de la todo
	generateSingleTodoCard(singleTodoHtmlElement, ...result);
}
