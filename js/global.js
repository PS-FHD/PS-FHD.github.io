var controller;
/***********************************************************************************
 *    Grundsätzliches einrichten von Scroll Magic.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 */
$(document).ready(function($) {
	// Erstellen des Scroll Magic controllers und horizontales Scrollen konfigurieren.
	controller = new ScrollMagic({vertical: false, loglevel: 3});
});