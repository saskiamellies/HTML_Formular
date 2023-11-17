function zeigeFragenAnhandAntworten() {
    const fragenContainer = document.getElementById("fragenContainer");

    fragenContainer.innerHTML = "";

    jsonDaten.fragen.forEach(frageObjekt => {
        let abhaengigkeitsFrage; // Deklaration innerhalb der Schleife

        // Prüfe auf Abhängigkeit von einer vorherigen Frage
        if (frageObjekt.abhaengigkeitVonFrage) {
            abhaengigkeitsFrage = jsonDaten.fragen.find(f => f.frage === frageObjekt.abhaengigkeitVonFrage);

            // Überprüfe, ob die abhängige Frage gefunden wurde
            if (abhaengigkeitsFrage) {
                const abhaengigkeitsAntwortElement = document.getElementById(`antwortAuswahl_${abhaengigkeitsFrage.id}`);
                const abhaengigkeitsAntwort = abhaengigkeitsAntwortElement ? abhaengigkeitsAntwortElement.value : "";

                // Überprüfe, ob die Bedingung erfüllt ist
                if (Array.isArray(frageObjekt.abhaengigkeitAntwort) && frageObjekt.abhaengigkeitAntwort.includes(abhaengigkeitsAntwort)) {
                    zeigeFrageAn(frageObjekt, fragenContainer);
                } else if (frageObjekt.abhaengigkeitAntwort === abhaengigkeitsAntwort) {
                    zeigeFrageAn(frageObjekt, fragenContainer);
                }
            } else {
                console.error('Abhängige Frage nicht gefunden:', frageObjekt.abhaengigkeitVonFrage);
            }
        } else {
            // Wenn keine Abhängigkeit vorhanden ist, zeige die Frage einfach an
            zeigeFrageAn(frageObjekt, fragenContainer);
        }
    });

    document.getElementById("fragenUndAntworten").style.display = "block";
}
