

		
		
$(document).ready(function ($) {

	var objCanvas = $("#lecture > .clock > .canvasClock ")[0] // HTML DOM Object <canvas class="canvasClock">;
console.log(objCanvas);
	/* falls Canvas nicht funktioniert, wird die Funktion nicht aufgerufen */
	if (objCanvas.getContext) {
		/* Uhr beginnt bei 8:15h und 0 Sekunden */
		globalIntSek = 0; 		// Sekunden
		globalIntMin = 15; 		// Minuten
		globalIntStd = 8; 		// Stunden
		Uhr();					// Funktion sofort ausfuehren
		setInterval(function () { Uhr();}, 1000);	// nach jeweils einer Sekunde (1000ms) Funktion Uhr() erneut ausfuehren
	}

	function Uhr() {
		// Kontext-Objekt
		var objContext = objCanvas.getContext("2d");
		objContext.clearRect(0, 0, 150, 150); 		// Anzeigebereich leeren
		objContext.drawImage(objImgUhr, 0, 0);		// Ziffernblatt zeichnen
		objContext.save(); 							// Ausgangszustand speichern
		objContext.translate(75, 75); 				// Koordinatensystem in Mittelpkt des Ziffernblatts verschieben
		
		// Stunden
		objContext.save();
		/* 	Aktuelle Stunde zzgl. Minutenanteil über Drehung des Koordinatensystems
			(kontinuierlicher Übergang zwischen zwei Stunden gewünscht, keine Sprung) */
		objContext.rotate(globalIntStd * Math.PI / 6 + globalIntMin * Math.PI / 360);
		objContext.beginPath(); 		// Neuen Pfad anlegen
		objContext.moveTo(0, 10); 		// Zeiger über Mitte hinaus zeichnen
		objContext.lineTo(0, -38); 		// Stundenzeiger im gedrehten Koord-Sys. um 38 Einheiten nach oben zeichnen
		
		// Linienstyle festlegen und zeichnen
		objContext.lineWidth = 4;
		objContext.strokeStyle = "#666";
		objContext.stroke();
		objContext.restore();
		
		// Minuten
		objContext.save();
		objContext.rotate(globalIntMin * Math.PI / 30);
		objContext.beginPath();
		objContext.moveTo(0, 10);
		objContext.lineTo(0, -50);
		objContext.lineWidth = 4;
		objContext.strokeStyle = "#666";
		objContext.stroke();
		objContext.restore();
		
		// Sekunden
		objContext.save();
		objContext.rotate(globalIntSek * Math.PI / 30);
		objContext.beginPath();
		objContext.moveTo(0, 10);
		objContext.lineTo(0, -50);
		objContext.lineWidth = 2;
		objContext.strokeStyle = "#a00";
		objContext.stroke();
		objContext.restore();
		
		objContext.restore();
		
		// Neue Werte fuer Uhrzeit setzen, sprich eine Sekunde weitergehen
		if (globalIntSek == 59) {
			globalIntSek = 0;
			globalIntMin++;
		} else
			globalIntSek++;
		
		if (globalIntMin == 60) {
			globalIntMin = 0;
			globalIntStd++;
		}
	}
});