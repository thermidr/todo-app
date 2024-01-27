// Affiche un texte sur la page précisant si la requête a échoué ou réussi
// L'affichage du texte dépend du paramètre result. Si il est à true alors on affiche un succès sinon un echec.
export function displayResult(htmlElement, result) {
	const resultElement = document.createElement("p");
	if (result) {
		// Supprime l'ancienne balise si elle existe
		deleteOldResultHtmlElement();

		resultElement.textContent = `La requête a été effectué avec succès`;
		resultElement.classList.add("result");
		resultElement.classList.add("ok");
	} else {
		// Supprime l'ancienne balise si elle existe
		deleteOldResultHtmlElement();
		resultElement.textContent = `Une erreur est survenue`;
		resultElement.classList.add("result");
		resultElement.classList.add("not-ok");
	}
	htmlElement.append(resultElement);
}

// Supprime l'ancienne balise si elle existe
function deleteOldResultHtmlElement() {
	const resultHtmlElement = document.querySelector(".result");
	if (resultHtmlElement) {
		resultHtmlElement.remove();
	}
}
