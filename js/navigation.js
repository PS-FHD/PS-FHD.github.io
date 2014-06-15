/**
 * Dieses Script stellt die Funktionalitäten für die Navigation bereit
 * @Author Alexander Dlugosch
 */
$(document).ready(function($) {
   
    var scenes = controller.getScenes(); //registriere alle Szenen  
    
    //Registriere Navigation
    var nav_1_einstieg = $("#nav1");
    var nav_2_vorlesung = $("#nav2");
    var nav_3_selbststudium = $("#nav3");
    var nav_4_tools = $("#nav4");
  
    /**
     * Konfiguration für das Event: ENTER
     * Einstellen, bei welcher Szene, welcher Navigationspunkt
     * größer wird
     * @param scene - der Szenenschlüssel
     */
    function extend(scene){
        switch(scene){
            case 0: animate(nav_1_einstieg);
                break;              
            case 1: animate(nav_1_einstieg);
                break;
            case 2: animate(nav_1_einstieg);
                break;
            case 3: animate(nav_2_vorlesung);
                break;
            case 4: animate(nav_3_selbststudium);
                break;
            case 5: animate(nav_3_selbststudium);
                break;
            case 6: animate(nav_3_selbststudium);
                break;
            case 7: animate(nav_3_selbststudium);
                break;
            case 8: animate(nav_4_tools);
                break;
        }
    }
    
    /**
     * Konfiguration für das Event: LEAVE
     * Einstellen, bei welcher Szene, welcher Navigationspunkt wieder
     * kleiner wird
     * @param scene - der Szenenschlüssel
     */
    function reset(scene){
        switch(scene){
            case 2: back_animate(nav_1_einstieg);
                break;
            case 3: back_animate(nav_2_vorlesung);
                break;
            case 4: back_animate(nav_3_selbststudium);
                break;
            case 7: back_animate(nav_3_selbststudium);
                break;
            case 8: back_animate(nav_4_tools);
                break;
        }
    }
    
    /**
     * Animation eines Navigationspunktes nach unten
     * @param obj //das Navigationselement
     */
    function animate(obj){
        TweenLite.to(obj, .5, {height:"2em"});
    }
    
    /**
     * Animation eines Navigationspunktes nach oben
     * @param obj //das Navigationselement
     */
    function back_animate(obj){
        TweenLite.to(obj, .5, {height:".5em"});
    }
   
    /**
     * Die Events Enter und Leave werden an die einzelnen Szenen gebunden.
     * Bei einem Eintritt in oder einem Austritt aus einer Szene wird eine ent-
     * sprechende Funktion aufgerufen, die die Navigationstweens entsprechend der 
     * Konfiguration extend() und reset() aufruft.
     */
    $.each(scenes,function(k){
        scenes[k].on("enter", function () {
            console.log("enter scene: "+k);
            extend(k);
        });
        scenes[k].on("leave", function () {
            console.log("leave scene: "+k);
            reset(k);
        });
    });
    
    /**
     * Scrolling zur mit dem Navigationspunkt verknüpten Szene
     * Übergeben wird der gesetzte Wert des hrefs-Attributs
     * Insofern vom Browser unterstützt, wird die Browser History geupdated
     */
    $(document).on("click", "a[href^=#]", function (e) {
        var id = $(this).attr("href");
        var $target = $(id); //die Zielszene
        
        if ($target.length > 0) { //prüfen ob die angegebene Zielszene existiert
            e.preventDefault(); //normale Funktionsweise der Navigation deaktivieren (a href)
            TweenMax.to(window, 0.5, {
                scrollTo: {
                    x: $target.offset().left
                }
            });
            
            //Update der Browserhistory, insofern mit dem Browser kompatibel
            if (window.history && window.history.pushState) {
                history.pushState("", document.title, id);
            }
        }
    });

});