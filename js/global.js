// Die Scrolldauer für alle Szenen insgesamt.
var totalScrollDuration = 3000;

var controller;
/***********************************************************************************
 *    Grundsätzliches einrichten von Scroll Magic.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 **********************************************************************************/
$(document).ready(function($) {
	// Erstellen des Scroll Magic controllers und horizontales Scrollen konfigurieren.
	controller = new ScrollMagic({vertical: false, loglevel: 3});
	
	// Eine Scroll Magic Szene die nur dazu dient, #intro1 über die gesamte Dauer des scrollings zu pinnen.
	var pinScene = new ScrollScene({triggerElement: "#intro1", duration: totalScrollDuration, triggerHook: 0, loglevel: 3})
		.setPin("#intro1")
		.addTo(controller);
});