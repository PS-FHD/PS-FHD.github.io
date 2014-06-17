// Debug flag, fuers Testen auf true belassen, fuer Releases auf false setzen.
var DEBUG = true;

// Der globale Scroll Magic Controller.
var controller;

// Zum Zaehlen, ob etwas zum ersten Mal eintritt.
// eingesetzt in function scene_leave in scene_intro2.js zum Stellen der Uhr in der VorlesungsSzene
var globalCounterFirstTime = true;

/* *** UHR *** */

// globale Variablen fuer die Uhrzeit der Uhr in der VorlesungsSzene (lecture) */
globalIntSek = 0; 		// Sekunden
globalIntMin = 15; 		// Minuten
globalIntStd = 8; 		// Stunden
		
// damit das Ziffernblatt der Uhr sofort auf der Seite sichtbar ist, wird es als Image geladen, bevor der DomBaum ready ist
var objImgUhr = new Image();
objImgUhr.src = "img/clock/clock_face.png";

// globale Variable fuer die temporaere Scrollposition - wichtig in der VorlesungsSzene fuer die Realisierung der Uhr
var globalTempScrollPosition = 0;

/* *** UHR ENDE *** */

// Die Laenge aller Szenen.
var totalDuration = 0;

// Alle Szenen als assoziatives Array.
var scenes = {};

/****************************************************************************************************
 *    Haengt die gegebene Szene im Scrollverlauf hinten an die zuletzt hinzugefuegte Szene an.
 *    
 *    @param sceneName Name der hinzuzufuegenden Szene.
 *    @param scrollScene Die hinzuzufuegende Szene.
 ***************************************************************************************************/
function addScene(sceneName, scrollScene) {
	// Die neue Szenen einreihen indem ihr eine Start-Scrollposition zugeweisen wird.
	scrollScene.offset(totalDuration);
	
	// Die Scrollaenge erhoeht sich um die Dauer der hinzuzufuegenden Szene.
	totalDuration += scrollScene.duration();
	
	updateScrollLength();
	
	/* Wenn es vorher noch keine Scrollbar gab und diese erst jetzt durch das Anlegen von Sznene erschienen ist, dann kann es durch die
	   aenderung der Seitenhoehe im Zusammenhang mit den resize Event-Handlern zu ausrichtungsproblemem kommen. 
	   Daher explizit alle resize Event-Handler aufrufen. */
	$(document).resize();
	
	// Szene ins assoziative Array aufnehmen.
	scenes[sceneName] = scrollScene;
}

/****************************************************************************************************
 *    Legt die moegliche Scrollaenge des Browserfensters fest. 
 ***************************************************************************************************/
function updateScrollLength() {
	// Spacer ueber die gesamte Scrolllaenge strecken um die Scrollbar zu erzeugen.
	$("#scrollSpacer").width(totalDuration + $("#sceneContainer").width());
}

/***********************************************************************************
 *    Grundsaetzliches einrichten der Javascript funktionalitaet der Website.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 **********************************************************************************/
$(document).ready(function($) {
	setupScrollMagic();

	// Event-Handler "window_resize" an das "resize" Ereignis von Window binden. 
	$(window).resize(window_resize);
	// Den Event-Handler einmal manuell Aufrufen.
	window_resize();
	
	/* Kleiner Event-Handler fuer das Scrollereignis, emuliert vertikales Scrolling indem es den Scenecontainer relativ zur Scrollposition
	   nach Oben schiebt. */
	$(window).scroll(function() {
		$("#sceneContainer").css("top", "-" + $(document).scrollTop() + "px");
	});
	
	/***********************************************************************************
	 *    Grundsaetzliches einrichten von Scroll Magic.
	 *    Erstellen des controllers und einrichten der Szene fuer den dauerpin.
	 **********************************************************************************/    
	function setupScrollMagic() {
		// Erstellen des Scroll Magic Controllers und horizontales Scrollen konfigurieren.
		controller = new ScrollMagic({
				vertical: false, 
				loglevel: DEBUG ? 3 : 0,
				globalSceneOptions: {
					loglevel: DEBUG ? 3 : 0
				}
			}
		);
	}

	/****************************************************************************************************
	 *    Event-Handler fuer das window.resize Ereignis.
	 *    Passt Elemente in ihrer Ausrichtung neu an die mittels CSS nur unzureichend Konfiguriert werden
	 *    koennen.
	 ***************************************************************************************************/
	function window_resize() {
		/* Beim Aendern der groesse muss leider wieder an den Anfang gescrollt werden, sonst ergeben sich manchmal eigenartige 
		   fehler bei der Berechnung der Hoehe.
		   Zudem ist es schwierig die Szenenbereite richtig anzupassen waehrend sie gerade "abespielt" wird. */
		if (!DEBUG)
			fd_pageScrollElement.scrollLeft(0);

		// Die Schrift der gesamten Seite soll relativ zur hoehe des Scenecontainers sein.
		var newFontSize = $("#sceneContainer").height() * 0.03;
		$("body").css("font-size", newFontSize + "px");
		
		/* Browser Fix: Manche Browser (z.B. Firefox) scheinen Unterelemente nicht immer richtig Ausrichten zu koennen, wenn sich diese
		   in einem Container mit position: fixed und 100% höhe befinden und diese mit Transform zentriert werden  
		   (siehe Szene 5 mit unterschiedlichen Seitenhoehen). */
		$("#intro1").height($("#sceneContainer").height() * 0.825);
		
		// Mit Aenderungen der Groesse veraendert sich auch die Scrollaenge.
		updateScrollLength();
	}
});