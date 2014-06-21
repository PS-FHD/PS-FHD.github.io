// Debug flag, fuers Testen auf true belassen, fuer Releases auf false setzen.
var DEBUG = true;

// Der globale Scroll Magic Controller.
var controller;

/* *** UHR *** */
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

/* *** UHR ENDE *** */

// Die Laenge aller Szenen.
var totalDuration = 0;

/* Globales Tween um von ueberall sanft (per Animation) zu verschiedenen Positionen scrollen zu koennen.
   Es scrollt stets ueber eine Dauer von einer Sekunde und nutzt ausserdem eine easing-function fuer einen schoeneren linearen Scrollverlauf
   - aenlich wie das Smooth-Scrolling vom Browser. */
var scrollTween = new TweenMax(window, 1, {ease: Power2.easeOut});

// Alle Szenen als assoziatives Array.
var scenes = {};

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
				loglevel: DEBUG ? 2 : 0,
				globalSceneOptions: {
					loglevel: DEBUG ? 2 : 0
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
 *    Manche Browser (z.B. Safari 5.1.7) richten ein Element falsch aus wenn folgende Bedingungen gegeben sind: 
 *      * Ein img-Kindelement mit Hoehenangabe, aber keiner Breitenangabe ist in dem Element enthalten.
 *      * Das img-Kindelement ist aufgrund der Bildgroesse breiter als das Element.
 *      * Das Element hat keine Breitenangabe und ist, aufgrund seines beinhaltenden img-Elements, breiter als sein Elternelement.
 *      * Das Element wird durch transformation um 50% nach links uebersetzt.
 *    Die Loesung: Das Element muss eine feste Breite haben.
 *    
 *    @param imgElement Das Quellbild dessen ausgangsbreite verwendet wird. Die Ausrichtung findet erst statt, nachdem das Bild geladen wurde.
 *    @param add Optionaler summand der noch auf die Groesse des/der Zielelement/e hinzuaddiert wird.
 ***************************************************************************************************/
function bf_SizeContainerToInnerImg(imgElement, add) {
	/* Erst muss das Bild vollstaendig geladen sein, sonst kann seine Breite nicht bestimmt werden - daher einen Event-Handler an das 
	   load-Ereignis binden. */
	imgElement.load(function() {
		// Die Breite des Elternelements dauerhaft an die Breite des Bildes binden.
		bindElementWidth(imgElement.parent(), imgElement, add);
	});
}

/****************************************************************************************************
 *    Bindet die Breite eines oder mehrere Elemente an die Breite eines anderen Elements.
 *    
 *    @param targetElement Das/die Zielelement/e deren Breite an die eines anderen Elements gebunden werden soll.
 *    @param sourceElement Das Quellelement dessen ausgangsbreite verwendet wird.
 *    @param add Optionaler summand der noch auf die Groesse des/der Zielelement/e hinzuaddiert wird. 
 ***************************************************************************************************/
function bindElementWidth(targetElement, sourceElement, add) {
	// Wenn optionaler Parameter nicht gegeben, dann explizit festlegen.
	if (typeof add === "undefined")
		add = 0;
	
	// Einen Event-Handler an das Resize-Ereignis vom Quellelement binden.
	element_resize = function() {
		targetElement.width(sourceElement.width() + add);
	};
	$(sourceElement).bind("resize", element_resize);
	
	// Muss bei jeder Groessenaenderung aufgerufen werden und wird daher im Resize-Ereignis des Fensters registriert.
	$(window).resize(element_resize);
	// Den Event-Handler einmal manuell Aufrufen.
	element_resize();
}

/****************************************************************************************************
 *    Legt die moegliche Scrollaenge des Browserfensters fest. 
 ***************************************************************************************************/
function updateScrollLength() {
	// Spacer ueber die gesamte Scrolllaenge strecken um die Scrollbar zu erzeugen.
	$("#scrollSpacer").width(totalDuration + $("#sceneContainer").width());
}
