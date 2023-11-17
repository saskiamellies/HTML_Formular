import os
import glob
import json
import pandas as pd

# Pfad zur Python-Datei
script_path = os.path.dirname(os.path.realpath(__file__))

# Pfade zu den JSON-Dateien im Downloads-Ordner
downloads_path = os.path.expanduser("~/Downloads")
json_files = glob.glob(os.path.join(downloads_path, '*.json'))

# Finde die neueste JSON-Datei im Ordner
latest_json_file = max(json_files, key=os.path.getctime)

# JSON-Datei einlesen mit korrekter Zeichenkodierung
try:
    with open(latest_json_file, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
except Exception as e:
    print(f"Fehler beim Lesen der JSON-Datei: {e}")
    data = {}  # Setze data auf einen leeren Dictionary, um Fehler zu vermeiden

# Extrahiere die relevanten Informationen
questions_and_answers = data.get("fragenUndAntworten", [])

# DataFrame erstellen
df = pd.DataFrame(questions_and_answers)

# Excel-Writer erstellen
excel_file_path = os.path.join(script_path, 'Bewertungsmatrix.xlsx')
with pd.ExcelWriter(excel_file_path, engine='xlsxwriter') as writer:
    # DataFrame in Excel schreiben
    df.to_excel(writer, index=False, sheet_name='Sheet1')

    # Zugriff auf das Excel-Objekt für weitere Anpassungen
    workbook = writer.book
    worksheet = writer.sheets['Sheet1']

    # Formatierung für die erste Spalte (Fragen)
    question_format = workbook.add_format({'text_wrap': True, 'valign': 'top'})
    worksheet.set_column('A:A', 50, question_format)

    # Formatierung für die zweite Spalte (Antworten)
    answer_format = workbook.add_format({'text_wrap': True, 'valign': 'top'})
    worksheet.set_column('B:B', 20, answer_format)

    # Iteriere über jede Zeile und füge den Text in die erste und zweite Spalte ein
    for i, row in enumerate(df.itertuples(), start=1):
        question_text = row.frage
        answer_text = row.antwort

        worksheet.write(i, 0, question_text, question_format)
        worksheet.write(i, 1, answer_text, answer_format)
