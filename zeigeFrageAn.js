async function zeigeFrageAn(frageObjekt, fragenContainer) {
    const frageElement = document.createElement("div");
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

        frageElement.appendChild(antwortAuswahl);
    }

    fragenContainer.appendChild(frageElement);
}
