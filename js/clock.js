// Zum Zaehlen, ob etwas zum ersten Mal eintritt.
// eingesetzt in function scene_leave in scene_intro2.js zum Stellen der Uhr in der VorlesungsSzene
var globalCounterFirstTime = true;

// globale Variablen fuer die Uhrzeit der Uhr in der VorlesungsSzene (lecture) */
globalIntSec = 0; 		// Sekunden
globalIntMin = 15; 		// Minuten
globalIntHour = 8; 		// Stunden

// damit das Ziffernblatt der Uhr sofort auf der Seite sichtbar ist, wird es als Image geladen, bevor der DomBaum ready ist
var objImgClock = new Image();
objImgClock.src = "img/clock/clock_face.png";

// globale Variable fuer die temporaere Scrollposition - wichtig in der VorlesungsSzene fuer die Realisierung der Uhr
var globalTempScrollPosition = 0;

$(document).ready(function ($) {

	var objCanvas = $("#lecture > .clock > .canvasClock ")[0] // HTML DOM Object <canvas class="canvasClock">;

	/* falls Canvas nicht funktioniert, wird die Funktion nicht aufgerufen */
	if (objCanvas.getContext) {
		/* Uhr beginnt bei 8:15h und 0 Sekunden */
		globalIntSec = 0; 		// Sekunden
		globalIntMin = 15; 		// Minuten
		globalIntHour = 8; 		// Stunden
		clock_draw();					// Funktion sofort ausfuehren
		setInterval(function () { clock_draw();}, 1000);	// nach jeweils einer Sekunde (1000ms) Funktion clock_draw() erneut ausfuehren
	}

	function clock_draw() {
		// Kontext-Objekt
		var objContext = objCanvas.getContext("2d");
		objContext.clearRect(0, 0, 150, 150); 		// Anzeigebereich leeren
		objContext.drawImage(objImgClock, 0, 0);		// Ziffernblatt zeichnen
		objContext.save(); 							// Ausgangszustand speichern
		objContext.translate(75, 75); 				// Koordinatensystem in Mittelpkt des Ziffernblatts verschieben
		
		// Stunden
		objContext.save();
		/* 	Aktuelle Stunde zzgl. Minutenanteil über Drehung des Koordinatensystems
			(kontinuierlicher Übergang zwischen zwei Stunden gewünscht, keine Sprung) */
		objContext.rotate(globalIntHour * Math.PI / 6 + globalIntMin * Math.PI / 360);
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
		objContext.rotate(globalIntSec * Math.PI / 30);
		objContext.beginPath();
		objContext.moveTo(0, 10);
		objContext.lineTo(0, -50);
		objContext.lineWidth = 2;
		objContext.strokeStyle = "#a00";
		objContext.stroke();
		objContext.restore();
		
		objContext.restore();
		
		// Neue Werte fuer Uhrzeit setzen, sprich eine Sekunde weitergehen
		if (globalIntSec == 59) {
			globalIntSec = 0;
			globalIntMin++;
		} else
			globalIntSec++;
		
		if (globalIntMin == 60) {
			globalIntMin = 0;
			globalIntHour++;
		}
	}
});