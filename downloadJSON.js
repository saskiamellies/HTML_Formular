
async function downloadJSON() {
    if (jsonDaten) {
        const gespeicherteAntworten = [];

        jsonDaten.fragen.forEach(frageObjekt => {
            const frage = frageObjekt.frage;

            if (frageObjekt.freitext) {
                const freitextAntwortElement = document.getElementById(`freitextAntwort_${frageObjekt.id}`);
                if (freitextAntwortElement) {
                    const freitextAntwort = freitextAntwortElement.value;
                    gespeicherteAntworten.push({ frage, antwort: freitextAntwort });
                }
            } else {
                const antwortAuswahl = document.getElementById(`antwortAuswahl_${frageObjekt.id}`);
                if (antwortAuswahl) {
                    const ausgewaehlteAntwort = antwortAuswahl.value;
                    gespeicherteAntworten.push({ frage, antwort: ausgewaehlteAntwort });
                }
            }
        });

        const gespeicherteDaten = { fragenUndAntworten: gespeicherteAntworten };

        const jsonData = JSON.stringify(gespeicherteDaten);


        var blob = new Blob([jsonData], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'fragen_und_antworten.json';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
    }
}
