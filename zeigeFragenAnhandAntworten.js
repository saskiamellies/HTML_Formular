function zeigeFragenAnhandAntworten() {
    const fragenContainer = document.getElementById("fragenContainer");

    fragenContainer.innerHTML = "";

    jsonDaten.fragen.forEach(aktuelleFrage => {
        let abhaengigkeitsFrage; // Deklaration innerhalb der Schleife

        // Prüfe auf Abhängigkeit von einer vorherigen Frage
        if (aktuelleFrage.abhaengigkeitVonFrage) {
            // abhaengigkeitsFrage = jsonDaten.fragen.find(f => f.id === aktuelleFrage.abhaengigkeitVonFrage);
            // console.log(abhaengigkeitsFrage)
            // console.log(aktuelleFrage.abhaengigkeitVonFrage)

            zeigeFrageAn(aktuelleFrage, fragenContainer, aktuelleFrage.abhaengigkeitVonFrage, aktuelleFrage.abhaengigkeitAntwort);


        //     // Überprüfe, ob die abhängige Frage gefunden wurde
        //     if (abhaengigkeitsFrage) {
        //         const abhaengigkeitsAntwortElement = document.getElementById(`antwortAuswahl_${abhaengigkeitsFrage.id}`);
        //         const abhaengigkeitsAntwort = abhaengigkeitsAntwortElement ? abhaengigkeitsAntwortElement.value : "";

        //         // Überprüfe, ob die Bedingung erfüllt ist
        //         if (Array.isArray(aktuelleFrage.abhaengigkeitAntwort) && aktuelleFrage.abhaengigkeitAntwort.includes(abhaengigkeitsAntwort)) {
        //             zeigeFrageAn(aktuelleFrage, fragenContainer);
        //         } else if (aktuelleFrage.abhaengigkeitAntwort === abhaengigkeitsAntwort) {
        //             zeigeFrageAn(aktuelleFrage, fragenContainer);
        //         }
        //     } else {
        //         console.error('Abhängige Frage nicht gefunden:', aktuelleFrage.abhaengigkeitVonFrage);
        //     }
        } else {
            // Wenn keine Abhängigkeit vorhanden ist, zeige die Frage einfach an
            zeigeFrageAn(aktuelleFrage, fragenContainer);
        }
    });

    document.getElementById("fragenUndAntworten").style.display = "block";
}
