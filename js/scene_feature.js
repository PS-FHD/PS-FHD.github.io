/***********************************************************************************
 *    Definition Mensa.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterst�tzen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 840 pixel nach links verschoben.
	
	
	var boy1	= TweenMax.to("#feature > .boy.first", 0.5, {left:"25%", autoAlpha: 0, ease: Linear.easeNone, delay:0.5 });
	var boy2	= TweenMax.to("#feature > .boy.second", 0.5, {left:"25%", ease: Linear.easeNone, delay:0.5});
	
	var logos1In	= TweenMax.fromTo("#feature .logo.column6, #feature .logo.column9" , 0.2,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.1,ease: Linear.easeNone});
	var logos2In	= TweenMax.fromTo("#feature .logo.column5, #feature .logo.column8" , 0.4,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.2,ease: Linear.easeNone});
	var logos3In	= TweenMax.fromTo("#feature .logo.column4, #feature .logo.column7" , 0.4,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.3,ease: Linear.easeNone});
	var logos4In	= TweenMax.fromTo("#feature .logo.column3, #feature .logo.column1" , 0.4,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.4,ease: Linear.easeNone});
	var logos5In	= TweenMax.fromTo("#feature .logo.column2" , 0.5,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.5,ease: Linear.easeNone});
	
	
//	var logos1In	= TweenMax.fromTo("#feature > .logo.seventh, #feature > .logo.eighth" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.1,ease: Linear.easeNone});
//	var logos2In	= TweenMax.fromTo("#feature > .logo.third, #feature > .logo.sixth" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.2,ease: Linear.easeNone});
//	var logos3In	= TweenMax.fromTo("#feature > .logo.ninth, #feature > .logo.fifth" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.3,ease: Linear.easeNone});
//	var logos4In	= TweenMax.fromTo("#feature > .logo.fourth, #feature > .logo.first" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.4,ease: Linear.easeNone});
//	var logos5In	= TweenMax.fromTo("#feature > .logo.second" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.5,ease: Linear.easeNone});

	var headIn 	= TweenMax.fromTo("#feature > .textblock", 0.1, {top: "5%", left:"160%"}, { left:"42%", delay: 0.75, ease: Linear.easeNone});

	var logoFadeOut = TweenMax.to("#feature > .logo" , 0.05, {autoAlpha:0, delay: 0.75,ease: Linear.easeNone});
	var logoBlock	= TweenMax.fromTo("#feature > .blackbox" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.75,ease: Linear.easeNone});

	var logos6In	= TweenMax.fromTo("#feature > .logo2" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.75,ease: Linear.easeNone});
	
	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([

		      boy1, boy2,
		       logos1In, logos2In, logos3In, logos4In, logos5In, 
		       logoBlock,
		       logoFadeOut,
		       logos6In,
		      headIn
		    ])
		//Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#feature > .sceneChange"), $("#outro"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 15000px bis 17500px abgespielt.
	addScene("feature", new ScrollScene({duration: 5000})
		.setTween(sceneTimeline)
		.addTo(controller));
});