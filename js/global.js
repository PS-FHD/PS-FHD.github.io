// Die Scrolldauer fuer alle Szenen insgesamt.
var totalScrollDuration = 7000;

// Der globale Scroll Magic Controller.
var controller;

/* ** Variablen die Ergebnisse zur Browser Feature Detection speichern. ** */
// Gibt an, ob der Browser Viewport einheiten wie vh, vw richtig Unterstuetzt.
var fd_supportsViewportUnits;
/* Gibt das jQuery-Element an, fuer das die Scrollposition der Seite gesetzt 
   werden kann. Dabei handelt es sich normalerweise um das BODY-Element, manche 
   Browser nutzen dafuer aber das HTML-Element (Safari z.B.).
   Moegliche Werte sind das HTML-Element, BODY-Element oder undefined.*/
var fd_pageScrollElement;

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
	
	/***********************************************************************************
	 *    Grundsaetzliches einrichten von Scroll Magic.
	 *    Erstellen des controllers und einrichten der Szene fuer den dauerpin.
	 **********************************************************************************/    
	function setupScrollMagic() {
		// Erstellen des Scroll Magic Controllers und horizontales Scrollen konfigurieren.
		controller = new ScrollMagic({vertical: false, loglevel: 3});
		
		// Eine Scroll Magic Szene die nur dazu dient, #intro1 ueber die gesamte Dauer des scrollings zu Pinnen.
		new ScrollScene({duration: totalScrollDuration, loglevel: 3})
			.setPin("#intro1")
			.addTo(controller);
	}
	
	/***********************************************************************************
	 *    Stellt fest, ob der Browser alle benoetigten Funktionen unterstuezt und falls nicht, wendet
	 *    entsprechende Workarounds an um diese Probleme zu umgehen.  
	 **********************************************************************************/
	function browserFeatureDetection() {
		/* Der Scene-Container ist Unterelement eines Blockelements welches mit einer Hoehe in vh 
		   ausgerichtet wird. Hat nun das besagte Unterelement eine Groesse von 0px, bedeuted das, dass
		   der Browser nicht richtig mit den Viewport-Masseinheiten rechnen kann. */
		fd_supportsViewportUnits = ($("#sceneContainer").css("height") != "0px");
		
		/* Falls der Browser Viewport-Masseinheiten wie vh, vw nicht richtig Unterstuezt, dann ein paar Werte
		   fuer den resize Event-Handler cachen. */
		if (!fd_supportsViewportUnits) {
			var someSceneElement = $("#intro1");
			var scrollContainerElement = $("#scrollContainer");
			
			sceneMinWidth = parseInt(someSceneElement.css("min-width"), 10);
			sceneMaxWidth = parseInt(someSceneElement.css("max-width"), 10);
			scrollContainerMinHeight = parseInt(scrollContainerElement.css("min-height"), 10);
			scrollContainerMaxHeight = parseInt(scrollContainerElement.css("max-height"), 10);
		}
		
		// Pruefen ob die Scrollposition der Seite ueber das HTML-Element oder Body-Element gesetzt werden kann.
		var htmlElement = $("html");
		var bodyElement = $("body");
		
		htmlElement.scrollLeft(1);
		bodyElement.scrollLeft(1);
		
		if (htmlElement.scrollLeft() == 1)
			fd_pageScrollElement = htmlElement;
		else if (bodyElement.scrollLeft() == 1)
			fd_pageScrollElement = bodyElement;
		
		htmlElement.scrollLeft(0);
		bodyElement.scrollLeft(0);
	}

	/****************************************************************************************************
	 *    Event-Handler fuer das window.resize Ereignis.
	 *    Passt Elemente an den Viewport des Browsers neu an die mittels CSS nicht ausreichend angepasst
	 *    werden koennen.
	 ***************************************************************************************************/
	function window_resize() {
		// Falls der Browser Viewport-Masseinheiten wie vh, vw nicht richtig Unterstuezt.
		if (!fd_supportsViewportUnits) {
			var viewportWidth = $(window).width();
			var viewportHeight = $(window).height();
			
			// Alle Elemente updaten die eigentlich Viewport-Masseinheiten verwenden.
			var newSceneWidth = Math.max(sceneMinWidth, Math.min(sceneMaxWidth, viewportWidth));
			$(".scene").css("width", newSceneWidth + "px");
			$(".scene:not(#intro1)").css("left", newSceneWidth + "px");
			$(".sceneChange").css("left", newSceneWidth + "px");
			
			var newViewportHeight = Math.max(scrollContainerMinHeight, Math.min(scrollContainerMaxHeight, viewportHeight * 0.96));
			$("#scrollContainer").css("height", newViewportHeight + "px");
		}
	}
});