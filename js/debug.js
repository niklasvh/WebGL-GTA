/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 6.1.2012 
* @website http://hertzen.com
 */


GTA.Debug = {
    startPosition: [8, 3, 2],
    "enabled": true,
    fastStart: false,
    positionData: true,
    
    updatePositionData: function (  ) {
        GTA.Debug.positionDataElement.innerHTML = "x: " + Math.round(this.player.position.x) 
        + ", y: " + -Math.round(this.player.position.y)
        + ", z: " + Math.round(this.player.position.z) + "<br />"
        + "x: " + Math.round(this.player.position.x / 64) 
        + ", y: " + -Math.round(this.player.position.y / 64)
        + ", z: " + Math.round(this.player.position.z / 64);
    },
    physicsDebug: true,
    createPhysicsDebug: function ( ) {
        if (GTA.Debug.enabled && GTA.Debug.physicsDebug) {
            //setup debug draw
            var debugDraw = new Box2D.Dynamics.b2DebugDraw(),
            
            debugCanvas = document.createElement('canvas'),
            ctx = debugCanvas.getContext("2d");
            
            
            debugCanvas.width = window.innerWidth;
            debugCanvas.height = window.innerHeight;
           
            debugCanvas.style.position = "absolute";
            debugCanvas.style.right = "0px";
            debugCanvas.style.bottom = "0px";
          
           
            //  document.body.appendChild( debugCanvas );   
             
    
            debugDraw.SetSprite( ctx );
            debugDraw.SetDrawScale( GTA.PhysicsScale );
            debugDraw.SetFillAlpha(0.3);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
            this.physics.world.SetDebugDraw(debugDraw);
            return debugCanvas;
        }
 
    }
};




if (GTA.Debug.enabled && GTA.Debug.positionData) {
    var div = document.createElement('div');
        
    div.id = "GTADebugPositionData";
    
    document.addEventListener("DOMContentLoaded", function() {
        document.body.appendChild( div );   
    }, false);  
    
    GTA.Debug.positionDataElement = div;
   
}

