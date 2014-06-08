/***********************************************************************************
 *    Definition Vorlesung.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstuetzen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 500 pixel nach links verschoben.
	var background = TweenMax.to("#selfstudy1", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});	
	
	var textBlock = TweenMax.from("#selfstudy1 > .textblock", 0.125, {right: "-60%", ease: Linear.easeNone});
	
	// Das Buecherregal im Vordergrund wischt ab 1/4 der Szene schnell von rechts nach links vorbei.
	var bookshelfForeground = TweenMax.fromTo("#selfstudy1 > .foreground", 0.35, {left: "100%"}, {left: "-130%", delay: 0.35, ease: Linear.easeNone});

	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([
			background,
			textBlock,
			bookshelfForeground
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#selfstudy1 > .sceneChange"), $("#selfstudy2"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 7500px bis 10000px abgespielt.
	addScene(new ScrollScene({duration: 5000})
		.setTween(sceneTimeline)
		.addTo(controller));
});