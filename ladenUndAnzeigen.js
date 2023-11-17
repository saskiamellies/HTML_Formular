async function ladenUndAnzeigen() {
    const datenquelleDropdown = document.getElementById("Applikation");
    const selectedDatenquelle = datenquelleDropdown.value;

    try {
        const response = await fetch(`${selectedDatenquelle}.json`);
        jsonDaten = await response.json();
        zeigeFragenAnhandAntworten();
    } catch (error) {
        console.error('Fehler beim Laden der JSON-Datei:', error);
    }

    

        document.getElementById("fragenUndAntworten").style.display = "block";
    }
