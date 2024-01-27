import { fetchData } from "./fetchRequests/fetchData.js";
import { generatePage } from "./generateDomElements/generateTodosListPage.js";
import { setLoading } from "./loader/loader.js";
import { displayResult } from "./generateDomElements/displayResultHtmlElement.js";

async function main() {
	const usersDom = document.querySelector(".users");
	// Affiche un spinner de chargement pendant que la requête s'éxecute
	setLoading(usersDom, true);
	// fetchData est une méthode asyncrhone. Il faut donc utiliser await.
	// Ainsi j'attends la fin de la méthode avant de continuer mon code et notament de générer la page.
	const data = await fetchData();
	// Une fois la requête effectuée le spinner de chargement disparaît
	setLoading(usersDom, false);
	// Si la requête a bien renvoyé des données, la page est générée
	// Il est important d'attendre d'avoir récupéré chaque données (users et todos) avant de pouvoir effectuer des traitements.
	// Cette fonction doit donc forcément se trouver après le "await fetchData()"
	// Ainsi JS attendra que le fetch soit terminé avant de génrérer la page
	if (data) {
		/* La fonction qui génère la page prend deux paramètres :
		   - la balise html à laquelle rajouter les données
		   - les données à afficher
		 */
		generatePage(usersDom, data);
	} else {
		displayResult(usersDom, false);
	}
}
main();
