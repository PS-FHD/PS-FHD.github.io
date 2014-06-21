

$(document).ready(function ($) {

	var objCanvas = $("#lecture > .clock > .canvasClockFastReverse ")[0]; // HTML DOM Object <canvas class="canvasClockReverse">;

	/* falls Canvas nicht funktioniert, wird die Funktion nicht aufgerufen */
	if (objCanvas.getContext) {
		/* Uhr beginnt bei 8:15h und 0 Sekunden */
		var intSec = 0; 		// Sekunden
		var intMin = 15; 		// Minuten
		var intHour = 7; 		// Stunden
		clock_draw();					// Funktion sofort ausfuehren
		setInterval(function () { clock_draw();}, 100);	// nach jeweils einer 10tel Sekunde (100ms) Funktion clock_draw() erneut ausfuehren
	}

	function clock_draw() {

		// Kontext-Objekt
		var objContext = objCanvas.getContext("2d");
		objContext.clearRect(0, 0, 150, 150); 		// Anzeigebereich leeren
		objContext.drawImage(objImgClock, 0, 0);	// Ziffernblatt zeichnen
		objContext.save(); 							// Ausgangszustand speichern
		objContext.translate(75, 75); 				// Koordinatensystem in Mittelpkt des Ziffernblatts verschieben
		
		// Stunden
		objContext.save();
		/* 	hier einfach mal mit 6 multipliziert, um schneller zu drehen */
		objContext.rotate(intHour * Math.PI  + intMin * Math.PI / 60);
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
		objContext.rotate(intSec * Math.PI / 3); // bei normaler Uhr durch 30 teilen
		objContext.beginPath();
		objContext.moveTo(0, 10);
		objContext.lineTo(0, -50);
		objContext.lineWidth = 2;
		objContext.strokeStyle = "#a00";
		objContext.stroke();
		objContext.restore();
		
		objContext.restore();
		
		// Neue Werte fuer Uhrzeit setzen, NICHT wie echte Uhrzeitbrechnung, da es schneller drehen soll
		if (intSec == 0){
			intSec = 59;
		}
		else
			intSec--;
			
		intMin -= 6;
	}
});