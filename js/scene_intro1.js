/***********************************************************************************
 *    Definition Introszene 1.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstuetzten Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 500 pixel nach links verschoben.
	var backgroundTween = TweenMax.to("#intro1", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});
	
	/* Die Wolken fliegen jeweils von unterschiedlichen Startpositionen aus nach links zu einer jeweiligen Endposition. 
	   Die unterschiedlichen Geschwindigkeiten entstehen dabei durch die unterschiedlichen Abstaende zwischen Start- und Endposition. */
	var cloudOneTween   = TweenMax.fromTo("#intro1 > .cloud.one", 1, {left: "50%"}, {left: "-15%", ease: Linear.easeNone});
	var cloudTwoTween   = TweenMax.fromTo("#intro1 > .cloud.two", 1, {left: "30%"}, {left: "-25%", ease: Linear.easeNone});
	var cloudThreeTween = TweenMax.fromTo("#intro1 > .cloud.three", 1, {left: "100%"}, {left: "10%", ease: Linear.easeNone});
	var cloudFourTween  = TweenMax.fromTo("#intro1 > .cloud.four", 1, {left: "180%"}, {left: "25%", ease: Linear.easeNone});
	
	/* Das Flugzeug fliegt entgegen der Scrollrichtung, gewinnt dabei an Hoehe und schrumpft bis es nicht mehr zu sehen ist
	   Hierbei gibt scale den Vergroeßerungsfaktor an. Bei scale:0 ist das Flugzeug nicht mehr sichtbar. */
	var airplane 	= TweenMax.fromTo("#intro1 > .airplane", 1, {left: "-25%", top: "150px", scale: 2}, {left: "125%", top: "-15px", scale: 0, ease: Linear.easeNone});
	
	// headline kommt ONLOAD von oben und bounced mittels ease: Bounce.easeOut per scroll nach links aus dem bild.
	var headlineIn  = TweenMax.fromTo("#intro1 > .mainheadline", 0.8, {top: "-30%", left: "2%"}, {top: "3%", ease: Bounce.easeOut});
	var headlineOut = TweenMax.to("#intro1 > .mainheadline", 0.3, {left: "-50%", ease: Linear.easeNone});
	
	// Der OMG Text wird mittels slala eingeblendet, dazu kommt eine rotation. Hierbei gibt rotation: die Drehung in Grad an.
	var textOmgIn  = TweenMax.fromTo("#intro1 > .bit.one", 0.5, {left: "7%", top: "37%", scale: 0}, {left: "7%", top: "37%", scale: 1, rotation: 342});
	var textOmgOut = TweenMax.fromTo("#intro1 > .bit.one", 0.3, {left: "7%", top: "37%"}, {left: "7%", top: "37%", scale: 1, rotation: -180, scale: 0});	
	
	// Der Text YES!! fliegt von links in das Bild beim Laden der Seite.
	var textYESIn  = TweenMax.to("#intro1 > .bit.two", 0.5, {top: "40%", left: "30%", rotation: 390, ease:Back.easeInOut});
	var textYESOut = TweenMax.to("#intro1 > .bit.two", 0.3, {top: "-80%", ease: Linear.easeNone});
	
	// Der Student-Status Text wird mittels easeIn eingbunden und dreht sich ein wenig.
	var textStudentIN  = TweenMax.to("#intro1 > .bit.three", 1, {rotation: 15, scale: 1, ease:Back.easeInOut });
	var textStudentOut = TweenMax.fromTo("#intro1 > .bit.three", 0.3, {left: "25%", top: "60%"}, {left: "25%", top: "60%", rotation: -40, scale: 0});
	
	var student = TweenMax.to("#intro1 > .student", 1, {left: "50%"});	
	
	// Textblock
	var textBlockHead = TweenMax.from("#intro1 > .textblock h2", 0.35, {top: "-40%", ease: Linear.easeNone});
	var textBlockPara = TweenMax.from("#intro1 > .textblock p", 0.35, {top: "90%", ease: Linear.easeNone});
	
	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
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
			textStudentOut,
			textBlockHead,
			textBlockPara
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#intro1 > .sceneChange"), $("#intro2"));
	
	// Die Scroll Magic Szene definieren. Sie wird in einem Scrollbereich von 0px bis 2500px abgespielt.
	new ScrollScene({duration: 2500})
		.setTween(sceneTimeline)
		.addTo(controller)
		//  Update-Event wird von ScrollMagic beim Scrollen gefeuert.
		.on("update", function (event) {
			/* target liefert das DOM-Element, das das Event ausgeloest hat, also ScrollScene.
			   Parent von ScrollScene ist ScrollMagic.
			   info("scrollDirection") liefert FORWARD REVERSE oder PAUSED als String und gibt die ScrollRichtung an.
			   info("scrollPos") liefert die aktuelle ScrollPosition als Ganzzahl. */
			var scrollDirection = event.target.parent().info("scrollDirection");
			var scrollPosition	= event.target.parent().info("scrollPos");
			
			// Aenderung des FlugzeugBildes bei ScrollRichtungsWechsel
			if (scrollDirection == "REVERSE") 
				$("#intro1 > .airplane").attr({src: "img/Einleitung/einl_hg_flugzeug_reversed_239x87.png"});
			else if (scrollDirection == "FORWARD")
				$("#intro1 > .airplane").attr({src: "img/Einleitung/einl_hg_flugzeug_239x87.png"});
		});
});