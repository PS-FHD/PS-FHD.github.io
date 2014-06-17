/***********************************************************************************
 *    Definition Introszene 2.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstuetzten Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 500 pixel nach links verschoben.
	var backgroundTween = TweenMax.to("#intro2", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});
	
	var shineElement  = $("#intro2 > .students > .shine"); 
	var shineRotation = TweenMax.to(shineElement, 1,  {rotation: 180, ease: Linear.easeNone}); 
	var shineFadeIn   = TweenMax.fromTo(shineElement, 0.2, {autoAlpha: 0}, {autoAlpha: 1, ease: Linear.easeNone});	
	var shineFadeOut  = TweenMax.to(shineElement, 0.2, {autoAlpha: 0, delay: 0.7, ease: Linear.easeNone});
	
	var textBlock = TweenMax.from("#intro2 > .textblock", 0.25, {left: "-40%", ease: Linear.easeNone});
	
	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([
			backgroundTween,
			shineRotation,
			shineFadeIn,
			shineFadeOut,
			textBlock,
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#intro2 > .sceneChange"), $("#lecture"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 2500px bis 5000px abgespielt.
	addScene("intro2", new ScrollScene({duration: 2500})
		.setTween(sceneTimeline)
		.addTo(controller)
		.on("progress", scene_progress));
	
	/***********************************************************************************
	 *    Event-Handler der bei Fortschrittsaenderung ("progress") der Szene aufgerufen wird.
	 *    
	 *    @param event Objekt vom Typ "progress"
	 **********************************************************************************/
	function scene_progress(event) {
		// Beim Eintritt in die VorlesungSzene soll die Uhr auf 8:15h stehen, daher hier stellen
		
		/* ScrollPosition auslesen
		target liefert das DOM-Element, das das Event ausgeloest hat, also ScrollScene.
		Parent der ScrollScene ist ScrollMagic (get the parent controller).
		info("scrollPos") liefert die aktuelle ScrollPosition als Ganzzahl. */
		var scrollPosition = event.target.parent().info("scrollPos");
//console.log("scrollPosition aus sceneintro2:");
//console.log(scrollPosition);		
		// sobald scrollPosition 6500 erreicht Uhr auf 8:15h stellen. <=7300 wichtig fuers Rausgehen aus der VorlesungSzene von links
		// globale Variablen siehe global.js
		if (scrollPosition >= 6500 && scrollPosition <= 7300 && globalCounterFirstTime){ // da das ProgressEvent mehrfach gefeuert wird globalCounterFirstTime einsetzen
			globalIntSek = 0; 		// Sekunden
			globalIntMin = 15; 		// Minuten
			globalIntStd = 8; 		// Stunden
			globalCounterFirstTime = false;
			$("#lecture > .clock > .canvasClock").css({visibility: "visible"});
		}
	}
});