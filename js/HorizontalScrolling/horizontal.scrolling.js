/***********************************************************************************
 *    Horizontales Scrolling per Mausrad ermoeglichen.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 **********************************************************************************/
$(document).ready(function() {
	/* Da die horizontale Scrolleiste üblicherweise nicht mittels Mausrad gescrollt werden kann, einen
	   event Handler an das mousewheel-Ereignis binden (siehe das jQuery Mousewheel Plugin) und die 
	   Position der Scrolleiste manuell setzen. */
	$('html').mousewheel(function(e, delta) {
		this.scrollLeft -= (delta * 40);
		e.preventDefault();
	});
});