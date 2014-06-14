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

// Gibt an ob die Seite vollstaendig geladen wurde.
var isPageFullyLoaded = false;

/****************************************************************************************************
 *    Haengt die gegebene Szene im Scrollverlauf hinten an die zuletzt hinzugefuegte Szene an.
 *    
 *    @param scrollScene Die hinzuzufuegende Szene.
 ***************************************************************************************************/
function addScene(scrollScene) {
	var currentPinDuration = globalPinScene.duration();
	var newPinDuration = currentPinDuration + scrollScene.duration();
	
	// Die neue Szenen einreihen indem ihr eine Start-Scrollposition zugeweisen wird. 
	scrollScene.offset(currentPinDuration);
	// Neue Szenen verlaengern die Dauer der Szene fuer den dauerpin entsprechend.
	globalPinScene.duration(newPinDuration);
	
	// Header und Footer ueber die gesamte Scrolllaenge strecken.
	$("#scrollContainer > header, #scrollContainer > footer").css("width", newPinDuration + sceneWidth + "px");
}

/***********************************************************************************
 *    Grundsaetzliches einrichten der Javascript funktionalitaet der Website.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 **********************************************************************************/
$(document).ready(function($) {
	setupScrollMagic();
	Pace.once("done", pace_done);
	
	function pace_done() {
		isPageFullyLoaded = true;
		fd_pageScrollElement.scrollLeft(0);
	}
	
	/* Achtung: Muss nach setupScrollMagic aufgerufen werden, da diese Funktion fuer 
	   einige tests einen scrollbaren Bereich benoetigt.*/
	browserFeatureDetection();
	
	// Event-Handler "window_resize" an das "resize" Ereignis von Window binden. 
	$(window).resize(window_resize);
	// Den Event-Handler einmal manuell Aufrufen.
	window_resize();
	
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
		
		/* Eine Scroll Magic Szene die nur dazu dient, #intro1 ueber die gesamte Dauer des scrollings zu Pinnen.
		   Hinweis: Durch einen Pin wird die Szene quasi auf dem Bildschirm fixiert. Da die erste Szene alle weiteren
		   Szenen enthaelt, kann diese einfach dauerhaft Gepinnt werden. Neue Szenen schieben sich dann nach und nach
		   ueber die Erste. Achtung: Als Ersatz kann hier nicht der scrollContainer verwendet werden, da dieser 
		   absolut positioniert sein muss. */
		globalPinScene = new ScrollScene({duration: 0})
			.setPin("#intro1")
			.addTo(controller);
		
		// Allgemeine Breite einer Szene feststellen, wobei jede Szene nach CSS immer so Breit wie der Scrollcontainer ist. 
		sceneWidth = parseInt($("#scrollContainer").css("width"), 10);
	}
	
	/***********************************************************************************
	 *    Stellt fest, ob der Browser alle benoetigten Funktionen unterstuezt und falls nicht, wendet
	 *    entsprechende Workarounds an um diese Probleme zu umgehen.  
	 **********************************************************************************/
	function browserFeatureDetection() {
		// Pruefen ob die Scrollposition der Seite ueber das HTML-Element oder BODY-Element gesetzt werden kann.
		var htmlElement = $("html");
		var bodyElement = $("body");
		
		globalPinScene.duration(10000);
		htmlElement.scrollLeft(1);
		bodyElement.scrollLeft(1);
		
		if (htmlElement.scrollLeft() == 1)
			fd_pageScrollElement = htmlElement;
		else if (bodyElement.scrollLeft() == 1)
			fd_pageScrollElement = bodyElement;
		
		htmlElement.scrollLeft(0);
		bodyElement.scrollLeft(0);
		globalPinScene.duration(0);
	}

	/****************************************************************************************************
	 *    Event-Handler fuer das window.resize Ereignis.
	 *    Passt Elemente in ihrer Ausrichtung neu an die mittels CSS nur unzureichend Konfiguriert werden
	 *    koennen.
	 ***************************************************************************************************/
	function window_resize() {
		var bodyElement = $("body");
		var scrollContainer = $("#scrollContainer");
		/* Beim Aendern der groesse muss leider wieder an den Anfang gescrollt werden, sonst ergeben sich manchmal eigenartige 
		   fehler bei der Berechnung der Hoehe.
		   Zudem ist es schwierig die Szenenbereite richtig anzupassen waehrend sie gerade "abespielt" wird. */
		if (!DEBUG)
			fd_pageScrollElement.scrollLeft(0);
		
		/* Umgeht ein Problem mit ScrollMagic, welches den Scrollcontainer beim Erreichen der min- bzw. max- height falsch Skaliert. 
		   Bezieht sich auf jquery.scrollmagic.js (version 1.0.7) Zeile 830 bis 836. */
		// Eigentlich waere das manuelle Beachten von min- und max-height nicht notwendig, aber Safari unterstuetzt das nicht richtig...
		var minHeight = parseInt(scrollContainer.css("min-height"), 10);
		var maxHeight = parseInt(scrollContainer.css("max-height"), 10);
		scrollContainer.css("height", Math.min(Math.max(minHeight, $(window).height()), maxHeight) + "px");
			
		// Berechnete Hoehe des Scrollcontainers ermitteln.
		var scrollContainerHeight = parseInt(scrollContainer.css("height"), 10);
		
		// Die Schrift soll relativ zur hoehe des scrollContainers ausgerichtet werden.
		var newFontSize = scrollContainerHeight * 0.03;
		bodyElement.css("font-size", newFontSize + "px");
		
		var viewportWidth = $(window).width();
		if (viewportWidth > 2000) {
			var extraMargin = ((viewportWidth - 2000) / 2);
			scrollContainer.css("margin", "auto " + extraMargin + "px");
		}
	}
});