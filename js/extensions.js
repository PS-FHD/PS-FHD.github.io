/***************************************************************************************************
 *    Definieren von Erweiterungsmethoden fuer Scroll Magic, GSAP und jQuery.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser das erstellen 
 *             des DOM-Baums beendet hat.
 **************************************************************************************************/
$(document).ready(function($) {
	/*************************************************************************************************
	 *    Fuegt eine Szenenwechsel-Animation zur Zeitleiste hinzu.
	 *    
	 *    @param sceneChangeElement Das Element das fuer den Szenenwechel animiert werden soll.
	 *    @param nextSceneElement Das Element welches die naechste Szene repraesentiert und ueber die 
	 *                            letzte Szene geschoben werden soll.
	 *    @param duration Die Dauer der Szenenwechsel-Animation in Prozent.
	 *    @returns Die Zeitleiste auf dem diese Methode aufgerufen wurde.
	 ************************************************************************************************/
	TimelineLite.prototype.addSceneChange = function(sceneChangeElement, nextSceneElement, duration) {
		if (typeof duration === "undefined")
			duration = 0.15;
		
		// Das Tween welches das Einschieben der naechsten Szene animiert.
		var nextSceneInTween = TweenMax.to(
			nextSceneElement, 
			duration, {
				left: "0", // Zielposition
				startAt: {left: "100%"}, // Startposition
				ease: Linear.easeNone
			}
		);
		
		// Das Tween welches den Szenenwechsel-Effekt animiert.
		var sceneChangeTween = TweenMax.to(
			sceneChangeElement, 
			duration, {
				left: "-" + sceneChangeElement.css("width"), // Zielposition
				startAt: {left: "100%"}, // Startposition
				ease: Linear.easeNone
			}
		);
		
		/* Der letzte Parameter gibt die Startposition an, ab der beide Tweens abgespielt werden sollen.
		   Wie fast alle Methoden von TimelineLite, gibt auch insertMultiple die Timeline selbst zurueck.*/
		return this.insertMultiple([nextSceneInTween, sceneChangeTween], 1.0 - duration);
	};
});