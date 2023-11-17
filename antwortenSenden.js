
async function antwortenAbsenden() {
    const fragenUndAntwortenDiv = document.getElementById("fragenUndAntworten");

    if (fragenUndAntwortenDiv.style.display !== "none") {
        if (!jsonDaten) {
            console.error('Daten wurden nicht geladen.');
            return;
        }

        jsonDaten.fragen.forEach(frageObjekt => {
            if (frageObjekt.freitext) {
                const freitextAntwortElement = document.getElementById(`freitextAntwort_${frageObjekt.id}`);
                if (freitextAntwortElement) {
                    const freitextAntwort = freitextAntwortElement.value;
                    console.log(`Frage: ${frageObjekt.frage}, Freitextantwort: ${freitextAntwort}`);
                }
            } else {
                const antwortAuswahl = document.getElementById(`antwortAuswahl_${frageObjekt.id}`);
                if (antwortAuswahl) {
                    const ausgewaehlteAntwort = antwortAuswahl.value;
                    console.log(`Frage: ${frageObjekt.frage}, Ausgewählte Antwort: ${ausgewaehlteAntwort}`);
                }
            }
        });

        fragenUndAntwortenDiv.style.display = "none";
    }
}