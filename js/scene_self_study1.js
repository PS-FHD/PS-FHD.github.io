/***********************************************************************************
 *    Definition Vorlesung.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstuetzen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 840 pixel nach links verschoben.
	
	
	var backgroundBooks = TweenMax.to("#selfstudy1", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});
	
	
	var bookshelf =  TweenMax.fromTo(".bookshelfBG", 0.5, {bottom: "0%", left:"120%"}, { left:"-70%",  ease: Linear.easeNone});

	var self1_textIn = TweenMax.fromTo("#selfstudy1 > .textblock", 0.4, {right: "-60%"}, {right: "2%", ease: Linear.easeNone});
	
	var self1_headOut = TweenMax.to("header.self1", 0.1, {autoAlpha: 0, delay: 0.7});
	var self1_textOut = TweenMax.to("section.self1", 0.2, {autoAlpha: 0, delay: 0.7});

	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([
			backgroundBooks,
			self1_textIn,
			self1_headOut,
			self1_textOut,
			bookshelf
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#selfstudy1 > .sceneChange"), $("#selfstudy2"));
	
	// Die Scroll Magic Szene definieren. Sie wird in einem Scrollbereich von 7500px bis 10000px abgespielt.
	new ScrollScene({offset: 7500, duration: 2500})
		.setTween(sceneTimeline)
		.addTo(controller);
});