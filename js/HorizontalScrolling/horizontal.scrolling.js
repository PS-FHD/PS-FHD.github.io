/***********************************************************************************
 *    Horizontales Scrolling per Mausrad ermoeglichen.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 **********************************************************************************/
$(document).ready(function() {
	// Legt die Anzahl an Pixeln fest, die pro "klick" des Mausrads gescrollt werden.
	var step = 350;
	// Die laenge in Sekunden die eine Scrollanimation insgesamt dauern kann.
	var duration = 1;

	/* Das Tween das zum animieren des Scrollvorganges benutzt wird. Dieses bezieht sich stets auf
	   eigenschaften des HTML-Elements und hat eine feste Dauer. Es nutzt ausserdem eine easing-function
	   fuer einen schoeneren Scrolleffekt. */
	var scrollTween = new TweenMax(window, duration, {ease: Power2.easeOut});
	
	/* Die horizontale Scrolleiste kann ueblicherweise nicht mittels Mausrad gescrollt werden, daher
	   muss dieses Verhalten emuliert werden. 
	   Einen event Handler an das mousewheel-Ereignis binden, welches vom jQuery 
	   Mousewheel Plugin (siehe jquery.mousewheel.js) zur Verfuegung gestellt wird. */
	$(window).mousewheel(window_mouseWheel);
	
	/****************************************************************************************************
	 * Event-Handler fuer ein mousewheel Ereignis (siehe jquery.mousewheel.js).
	 * Scrollt das Fenster des Browsers in horizontaler Richtung. Hierbei wird auch Smooth Scrolling 
	 * emuliert.
	 * 
	 * @e Die Daten des Ereignisses.
	 * @delta Die Richtung in die gescrollt wurde. -1 = Mausrad runter, +1 = Mausrad hoch.
	 ***************************************************************************************************/
	function window_mouseWheel(e, delta) {
		/* updateTo legt neue Zielwerte fest, hierbei die neue Ziel-Scrollposition. Der zweite Parameter
		   resetDuration = true, legt fest dass wenn das Tween gerade inaktiv ist, es automatisch Aktiviert 
		   werden soll und, falls gerade eine Animation im gange ist, dass deren Dauer zurueckgesetz wird. */ 
		scrollTween.updateTo({scrollTo: {x: "-=" + (delta * step)}}, true);
		
		/* Das Scrollrad der Maus soll keine Standardaktionen ausfuehren. Wenn z.B. die Maus des Benutzers so 
		   konfiguriert ist, dass sie eigentlich auch in der Lage waere horizontal zu Scrollen, dann wuerde sich
		   dieses Verhalten mit unserer Animation ueberlappen. Ausserdem waere diese Scrollgeschwindigkeit dann
		   moeglicherweis nicht fuer unsere Seite angebracht und wuerde in einer schlechte Usability enden. */
		e.preventDefault();
	};
});