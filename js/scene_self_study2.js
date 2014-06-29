/***********************************************************************************
 *    Definition Vorlesung.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstützen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild in der section wird um 500 pixel nach links verschoben.
	var background = TweenMax.to("#selfstudy2", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});			

	/* Die Wolken fliegen jeweils von unterschiedlichen Startpositionen aus nach links zu einer jeweiligen Endposition. 
	   Die unterschiedlichen Geschwindigkeiten entstehen dabei durch die unterschiedlichen Abstaende zwischen Start- und Endposition. */
	var cloud1 = TweenMax.fromTo("#selfstudy2 > .cloud.one", 1, {left: "40%"}, {left: "0%", ease: Linear.easeNone});
	var cloud2 = TweenMax.fromTo("#selfstudy2 > .cloud.two", 1, {left: "60%"}, {left: "-25%", ease: Linear.easeNone});
	var cloud3 = TweenMax.fromTo("#selfstudy2 > .cloud.three", 1, {left: "150%"}, {left: "45%", ease: Linear.easeNone});	
	
	// Schwarze Moewe und Burg Grafik die im Vordergrund erscheint, bewegt sich ab 20% in die Szene.
	var foreground = TweenMax.fromTo("#selfstudy2 > .foreground", 0.8, {left: "100%"}, {left: "-105%", delay: 0.2, ease: Linear.easeNone});
	
	// Die Krabbe
	var crab = TweenMax.fromTo("#selfstudy2 > .crab", 1, {left: "100%"}, {left: "70%"});
	
	// Krebsbilder im Browsercache bereitstellen, um bei ScrollRichtungswechsel Bild aendern zu koennen
	var crabImg				= new Image();
	var crabImg_reversed	= new Image();
	
	crabImg.src				= "img/Selbststudium/Urlaub/krebs.png"; // Krebs vorwaerts
	crabImg_reversed.src	= "img/Selbststudium/Urlaub/krebs_reversed.png"; // Krebs horizontal gespiegelt rueckwaerts
	
	// Der Textblock und sein zweiter Paragraph der sich erst nachtraeglich einschieben soll.
	var textBlock = TweenMax.from("#selfstudy2 > .textblock", 0.15, {left: "-60%", ease: Linear.easeNone});
	var textPara2 = TweenMax.from("#selfstudy2 > .textblock p:nth-of-type(2)", 0.15, {left: "-105%", delay: 0.2, ease: Linear.easeNone});
	
	// Der Text im Hintergrund, der sich am Horizont bewegt.
	var bit = TweenMax.fromTo("#selfstudy2 > .bit", 1, {left: "-40%", top: "76%", rotation: -1.5}, {left: "30%", top: "73%"});
	
	/* Die beiden Palmen sind nicht Teil der Zeitleiste der Szene und daher nicht direkt von der Scrollposition abhaengig, denn Tweens die 
	   keiner Zeitleiste angehoeren werden unabhaengig abgespielt. Ihre Animation wiederholt sich endlos (repeat: -1) mit einer 
	   Animationslaenge von 2 bzw. 2,2 Sekunden jeweils vor- und zurueck abgespielt (yoyo: true).
	   Um Performance zu sparen, sind diese Tweens anfangs pausiert (paused: true), sie werden per Javascript Event-Handler manuell gestartet
	   bzw. gestoppt sobald die Szene betreten / verlassen wird. */
	var palm1 = TweenMax.fromTo("#selfstudy2 > .palm.first", 2, {scaleX: 0.97, scaleY: 1}, {scaleX: 1, scaleY: 0.97, repeat: -1, yoyo: true, paused: true, ease: Power2.easeInOut});
	var palm2 =	TweenMax.fromTo("#selfstudy2 > .palm.second", 2.2, {scaleX: 1, scaleY: 0.93}, {scaleX: 0.95, scaleY: 1, repeat: -1, yoyo: true, paused: true, ease: Linear.easeNone});

	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([
			background,
			cloud1,
			cloud2,
			cloud3,
			foreground,
			textBlock,
			textPara2,
			bit,
			crab
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#selfstudy2 > .sceneChange"), $("#selfstudy3"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen.
	addScene("selfstudy2", new ScrollScene({duration: 5000})
		.setTween(sceneTimeline)
		.addTo(controller)
		.on("enter", scene_enter)
		.on("leave", scene_leave)
		.on("progress", scene_progress));

	/***********************************************************************************
	 *    Event-Handler der beim Starten der Szene aufgerufen wird.
	 *    
	 *    @param event Die Ereignisdaten.
	 **********************************************************************************/
	function scene_enter(event) {
		// Plamenanimation nur abspielen, wenn dies die aktuelle Szene ist.
		palm1.resume();
		palm2.resume();
	}
	
	/***********************************************************************************
	 *    Event-Handler der beim Verlassen der Szene aufgerufen wird.
	 *    
	 *    @param event Die Ereignisdaten.
	 **********************************************************************************/
	function scene_leave(event) {
		// Plamenanimation nur abspielen, wenn dies die aktuelle Szene ist.
		palm1.pause();
		palm2.pause();
	}
	
	/***********************************************************************************
	 *    Event-Handler der bei Fortschrittsaenderung der Szene aufgerufen wird.
	 *    
	 *    @param event Die Ereignisdaten.
	 **********************************************************************************/
	function scene_progress(event) {
		// event.scrollDirection liefert als Scrollrichtung FORWARD REVERSE oder PAUSED.
		var scrollDirection = event.scrollDirection;
		
		// Aenderung des Krebsbildes bei Richtungswechsel - PAUSED nicht relevant (aktuelles Bild bleibt automatisch erhalten)
		if (scrollDirection == "REVERSE") {
			$("#selfstudy2 > .crab").attr({src: crabImg.src});
		}
		else if (scrollDirection == "FORWARD")
			$("#selfstudy2 > .crab").attr({src: crabImg_reversed.src});
	}
});

