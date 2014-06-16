// Debug flag, fuers Testen auf true belassen, fuer Releases auf false setzen.
var DEBUG = true;

// Der globale Scroll Magic Controller.
var controller;

// Die breite einer Szene (fuer jede Szene gleich).
var sceneWidth;

// Die Szene die fuer den Dauerpin genutzt wird, deren Parameter muessen spaeter noch veraendert werden.
var globalPinScene;

/* ** Variablen die Ergebnisse zur Browser Feature Detection speichern. ** */
/* Gibt das jQuery-Element an, fuer das die Scrollposition der Seite gesetzt 
   werden kann. Dabei handelt es sich normalerweise um das BODY-Element, manche 
   Browser nutzen dafuer aber das HTML-Element (Safari z.B.).
   Moegliche Werte sind das HTML-Element, BODY-Element oder undefined.*/
var fd_pageScrollElement;

var totalScrollLength = 0;

/****************************************************************************************************
 *    Haengt die gegebene Szene im Scrollverlauf hinten an die zuletzt hinzugefuegte Szene an.
 *    
 *    @param scrollScene Die hinzuzufuegende Szene.
 ***************************************************************************************************/
function addScene(scrollScene) {
	// Die neue Szenen einreihen indem ihr eine Start-Scrollposition zugeweisen wird.
	scrollScene.offset(totalScrollLength);
	
	var newScrollLength = totalScrollLength + scrollScene.duration();
	totalScrollLength = newScrollLength;
	
	// Spacer ueber die gesamte Scrolllaenge strecken um die Scrollbar zu erzeugen.
	$("#scrollSpacer").width(newScrollLength + sceneWidth);
}

/***********************************************************************************
 *    Grundsaetzliches einrichten der Javascript funktionalitaet der Website.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 **********************************************************************************/
$(document).ready(function($) {
	setupScrollMagic();

	/* Achtung: Muss nach setupScrollMagic aufgerufen werden, da diese Funktion fuer 
	   einige tests einen scrollbaren Bereich benoetigt.*/
	browserFeatureDetection();
	
	// Event-Handler "window_resize" an das "resize" Ereignis von Window binden. 
	$(window).resize(window_resize);
	// Den Event-Handler einmal manuell Aufrufen.
	window_resize();
	
	$(window).scroll(function() {
		
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
		
		// Allgemeine Breite einer Szene feststellen, wobei jede Szene nach CSS immer so Breit wie der Scenecontainer ist. 
		sceneWidth = $("#sceneContainer").width();
	}
	
	/***********************************************************************************
	 *    Stellt fest, ob der Browser alle benoetigten Funktionen unterstuezt und falls nicht, wendet
	 *    entsprechende Workarounds an um diese Probleme zu umgehen.  
	 **********************************************************************************/
	function browserFeatureDetection() {
		// Pruefen ob die Scrollposition der Seite ueber das HTML-Element oder BODY-Element gesetzt werden kann.
		var htmlElement = $("html");
		var bodyElement = $("body");
		
		$("#scrollSpacer").width(10000);
		htmlElement.scrollLeft(1);
		bodyElement.scrollLeft(1);
		
		if (htmlElement.scrollLeft() == 1)
			fd_pageScrollElement = htmlElement;
		else if (bodyElement.scrollLeft() == 1)
			fd_pageScrollElement = bodyElement;
		
		htmlElement.scrollLeft(0);
		bodyElement.scrollLeft(0);
		$("#scrollSpacer").width(0);
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

		// Die Schrift soll relativ zur hoehe des Scenecontainers sein.
		var newFontSize = $("#sceneContainer").height() * 0.03;
		$("body").css("font-size", newFontSize + "px");
	}
});