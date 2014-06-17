

		
$(document).ready(function ($) {

	var objCanvas = $("#lecture > .clock > .canvasClockFast ")[0];

	/* falls Canvas nicht funktioniert, wird die Funktion nicht aufgerufen */
	if (objCanvas.getContext) {
		/* Uhr beginnt bei 8:15h und 0 Sekunden */
		var intSek = 0; 		// Sekunden
		var intMin = 15; 		// Minuten
		var intStd = 7; 		// Stunden
		Uhr();					// Funktion sofort ausfuehren
		setInterval(function () { Uhr();}, 100);	// nach jeweils einer 10tel Sekunde (100ms) Funktion Uhr() erneut ausfuehren
	}

	function Uhr() {

		// Kontext-Objekt
		var objContext = objCanvas.getContext("2d");
		objContext.clearRect(0, 0, 150, 150); 		// Anzeigebereich leeren
		objContext.drawImage(objImgUhr, 0, 0);	// Ziffernblatt zeichnen
		objContext.save(); 							// Ausgangszustand speichern
		objContext.translate(75, 75); 				// Koordinatensystem in Mittelpkt des Ziffernblatts verschieben
		
		// Stunden
		objContext.save();
		/* 	hier einfach mal mit 6 multipliziert, um schneller zu drehen */
		objContext.rotate(intStd * Math.PI  + intMin * Math.PI / 60);
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
		objContext.rotate(intMin * Math.PI / 30);
		objContext.beginPath();
		objContext.moveTo(0, 10);
		objContext.lineTo(0, -50);
		objContext.lineWidth = 4;
		objContext.strokeStyle = "#666";
		objContext.stroke();
		objContext.restore();
		
		// Sekunden
		objContext.save();
		objContext.rotate(intSek * Math.PI / 3); // bei normaler Uhr durch 30 teilen
		objContext.beginPath();
		objContext.moveTo(0, 10);
		objContext.lineTo(0, -50);
		objContext.lineWidth = 2;
		objContext.strokeStyle = "#a00";
		objContext.stroke();
		objContext.restore();
		
		objContext.restore();
		
		// Neue Werte fuer Uhrzeit setzen, NICHT wie echte Uhrzeitbrechnung, da es schneller drehen soll
		if (intSek == 59){
			intSek = 0;
		}
		else
			intSek++;
			
		intMin += 6;
	}
});