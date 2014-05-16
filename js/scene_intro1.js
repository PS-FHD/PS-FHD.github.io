/***********************************************************************************
 *    Definition Introszene 1.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 **********************************************************************************/
$(document).ready(function($) {
	/* Das Hintergrundbild im div wird um 500 pixel nach links verschoben.
	   Dokumentation zu TweenMax und allen unterst√ºtzen Optionen: http://www.greensock.com/tweenmax/ */
	var backgroundTween = TweenMax.to("#intro1", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});
	
	/* Die Wolken fliegen jeweils von unterschiedlichen Startpositionen aus nach links zu einer jeweiligen Endposition. 
	   Die unterschiedlichen Geschwindigkeiten entstehen dabei durch die unterschiedlichen Abst√§nde zwischen Start- und Endposition. */
	var cloudOneTween   = TweenMax.fromTo(".cloud.one", 1, {left: "50%"}, {left: "-15%", ease: Linear.easeNone});
	var cloudTwoTween   = TweenMax.fromTo(".cloud.two", 1, {left: "30%"}, {left: "-25%", ease: Linear.easeNone});
	var cloudThreeTween = TweenMax.fromTo(".cloud.three", 1, {left: "100%"}, {left: "10%", ease: Linear.easeNone});
	var cloudFourTween  = TweenMax.fromTo(".cloud.four", 1, {left: "180%"}, {left: "25%", ease: Linear.easeNone});
	
	/* Das Flugzeug fliegt entgegen der Scrollrichtung, gewinnt dabei an Hˆhe und schrumpft bis es nicht mehr zu sehen ist
	   Hierbei gibt scale den Vergrˆﬂerungsfaktor an. Bei scale:0 ist das Flugzeug nicht mehr sichtbar	*/
	var airplane 	= TweenMax.fromTo(".airplane", 1, {left: "-25%", top: "150px",scale:2}, {left: "125%", top: "-15px", scale:0, ease: Linear.easeNone});	
	
	/*headline kommt ONLOAD von oben und bounced mittels  ease: Bounce.easeOut
	 * per scroll nach links aus dem bild*/
	var headlineIn 	= TweenMax.fromTo("#intro1_textbox", 0.8, {top: "-30%"}, {top: "3%", ease: Bounce.easeOut});
	var headlineOut = TweenMax.to("#intro1_textbox", 0.3, {left: "-50%", ease: Linear.easeNone});
	
	/* Der OMG Text wird mittels slala eingeblendet, dazu kommt eine rotation. Hierbei gibt rotation: die Drehung in Grad an*/
	var textOmgIn 	= TweenMax.fromTo(".introtext.one", 0.5, {left: "7%", top: "37%", scale: 0}, {left: "7%", top: "37%", scale:1, rotation:342});
	var textOmgOut 	= TweenMax.fromTo(".introtext.one", 0.3, {left: "7%", top: "37%"}, {left: "7%", top: "37%", scale:1, rotation:-180, scale: 0});	
		
	/* Der Text YES!! fliegt von links in das Bild beim Laden der Seite */
	var textYESIn 	= TweenMax.to(".introtext.two", 0.5, { top:"40%", left:"30%", rotation:390, ease:Back.easeInOut});
	var textYESOut 	= TweenMax.to(".introtext.two", 0.3, {top: "-80%", ease:Linear.easeNone});

	/* Der Student-Status Text wird mittels easeIn eingbunden und dreht sich ein wenig */
	var textStudentIN 	= TweenMax.to(".introtext.three", 1, {rotation:15, scale:3, ease:Back.easeInOut });
	var textStudentOut 	= TweenMax.fromTo(".introtext.three", 0.3, {left: "25%", top: "60%"}, {left: "25%", top: "60%", rotation:-40, scale:0 });
	
	
		
	
	// Die Zeitleiste der Szene definieren.
	var timelineTween = new TimelineMax()
		.add([
			backgroundTween,
			cloudOneTween,
			cloudTwoTween,
			cloudThreeTween,
			cloudFourTween,	
			airplane,
			headlineOut,
			textYESOut,
			textOmgOut,
			textStudentOut
			]);
	
	/* Die Scroll Magic Scene f√ºr die erste Introszene definieren.
	   Sie soll ab #intro1 1000px lang scrollen, wobei die position des Ausl√∂sers f√ºr diese Szene ganz an den Anfang gesetzt wird.*/
	var scene = new ScrollScene({triggerElement: "#intro1", duration: 1000, triggerHook: 0})
		.setTween(timelineTween)
		.setPin("#intro1")
		.addTo(controller);
});