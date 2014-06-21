/***********************************************************************************
 *    Definition Mensa.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterst�tzen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 840 pixel nach links verschoben.
	
	
	var boy1	= TweenMax.to("#feature > .boy.first", 0.3, {left:"30%", autoAlpha: 0, ease: Linear.easeNone, delay:0.5 });
	var boy2	= TweenMax.to("#feature > .boy.second", 0.3, {left:"30%", ease: Linear.easeNone, delay:0.5});


	var logos1In	= TweenMax.fromTo("#feature > .window-frame >  .logo.column1.row1" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.0,ease: Linear.easeNone});
	var logos2In	= TweenMax.fromTo("#feature > .window-frame >  .logo.column2.row1" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.09,ease: Linear.easeNone});
	var logos3In	= TweenMax.fromTo("#feature > .window-frame >  .logo.column3.row1" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.21,ease: Linear.easeNone});
	var logos4In	= TweenMax.fromTo("#feature > .window-frame >  .logo.column4.row2" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.11,ease: Linear.easeNone});
	var logos5In	= TweenMax.fromTo("#feature > .window-frame >  .logo.column5.row2" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.18,ease: Linear.easeNone});
	var logos6In	= TweenMax.fromTo("#feature > .window-frame >  .logo.column6.row2" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.03,ease: Linear.easeNone});
	var logos7In	= TweenMax.fromTo("#feature > .window-frame >  .logo.column7.row3" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.35,ease: Linear.easeNone});
	var logos8In	= TweenMax.fromTo("#feature > .window-frame >  .logo.column8.row3" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.06,ease: Linear.easeNone});
	var logos9In	= TweenMax.fromTo("#feature > .window-frame >  .logo.column9.row3" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.10,ease: Linear.easeNone});
	
	var headIn 	= TweenMax.fromTo("#feature > .textblock", 0.1, {top: "5%", left:"160%"}, { left:"42%", delay: 0.65, ease: Linear.easeNone});
	var logoFadeOut = TweenMax.to("#feature > .window-frame > .logo" , 0.05, {autoAlpha:0, delay: 0.65,ease: Linear.easeNone});
	var HimmelFadeOut = TweenMax.to("#feature > .window-frame > .middleground " , 0.05, {autoAlpha:0, delay: 0.65,ease: Linear.easeNone});

	var logos10In	= TweenMax.fromTo("#feature > .window-frame >  .logo2" , 0.05,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.65,ease: Linear.easeNone});
	
	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([

		      boy1, boy2,
		       logos1In, logos2In, logos3In, logos4In, logos5In, logos6In, logos7In, logos8In, logos9In,
		       logoFadeOut,
		       HimmelFadeOut,
		       logos10In,
		      headIn
		    ])
		//Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#feature > .sceneChange"), $("#outro"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 15000px bis 17500px abgespielt.
	addScene("feature", new ScrollScene({duration: 5000})
		.setTween(sceneTimeline)
		.addTo(controller));
});