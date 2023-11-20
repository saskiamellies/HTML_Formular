async function zeigeFrageAn(frageObjekt, fragenContainer, abhaegigkeit, antworten) {
    const frageElement = document.createElement("div");
    if (abhaegigkeit) {
        frageElement.dataset.abhaegigkeit = abhaegigkeit
        frageElement.dataset.antworten = JSON.stringify(antworten)
        if (antworten.includes(0)) {
            frageElement.style.display = "block"
        } else {
            frageElement.style.display = "none"
        }
    }
    frageElement.innerHTML = `${frageObjekt.frage}`;

    if (frageObjekt.freitext) {
        const freitextInput = document.createElement("input");
        freitextInput.type = "text";
        freitextInput.id = `freitextAntwort_${frageObjekt.id}`;
        freitextInput.name = `freitextAntwort_${frageObjekt.id}`;

        if (frageObjekt.beispielantwort && frageObjekt.freitext) {
            freitextInput.placeholder = `Beispiel: ${frageObjekt.beispielantwort}`;
        }

        frageElement.appendChild(freitextInput);
    } else {
        const antwortAuswahl = document.createElement("select");
        antwortAuswahl.id = `antwortAuswahl_${frageObjekt.id}`;
        antwortAuswahl.name = `antwortAuswahl_${frageObjekt.id}`;

        frageObjekt.antworten.forEach(antwort => {
            const option = document.createElement("option");
            option.value = antwort;
            option.text = antwort;
            antwortAuswahl.add(option);
        });

        antwortAuswahl.addEventListener('change', function () {
            handleSelectChange(this.selectedIndex, frageObjekt.id);
        });

        frageElement.appendChild(antwortAuswahl);
    }

    fragenContainer.appendChild(frageElement);
}

function handleSelectChange(gegebeneAntwort, questionId) {
    var alleFragen = Array.from(fragenContainer.children);
    var gefundeneFrage = alleFragen.find(f => f.dataset.abhaegigkeit == questionId)

    if (gefundeneFrage) {
        var moeglicheAntworten = JSON.parse(gefundeneFrage.dataset.antworten)
        var antwortGefunden = moeglicheAntworten.some(a => a == gegebeneAntwort)

        if (antwortGefunden) {
            gefundeneFrage.style.display = "block"
        } else {
            gefundeneFrage.style.display = "none"
        }
    }
}