/* 
 * @author Niklas von Hertzen <niklas at hertzen.com>
 * @created 30.12.2011 
 * @website http://hertzen.com
 */

/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */


var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {

    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );

}


if ( !window.requestAnimationFrame ) {

    window.requestAnimationFrame = ( function() {

        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

            window.setTimeout( callback, 1000 / 60 );

        };

    } )();

}

var clock = new THREE.Clock();
var GTA = GTA || {};
var controls;




window.URL = window.webkitURL;
window.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder;
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

GTA.Game = function ( ) {
    
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    this.scene = new THREE.Scene();
    
    var methods;
    
    this.supports = {
        FileSystem: (window.requestFileSystem) ? true : false
    };
   
   
   
    if ( this.supports.FileSystem ) {
        this.filesystem = new GTA.FileSystem( this );
    } else {
        this.filesystem = null;
        GTA.loader.call( this );
    }
    
   

    
    
    
    
    this.tileMaterials;
    

    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1500 );
    this.camera.position.z = 400; //300
    this.camera.position.x =  105*64;
    this.camera.position.y =  -119*64;
    this.scene.add( this.camera );

   
    controls = new THREE.FirstPersonControls( this.camera );

    controls.movementSpeed = 1000;
    controls.lookSpeed = 0.025;
    controls.lookVertical = true;
    controls.constrainVertical = false;
    controls.verticalMin = 1.1;
    controls.verticalMax = 2.2;
   
    
    this.loaded = function () {
        
     
        
        var car = new GTA.GameObjectPosition();  
        car.addCar(this, 58, 328, 193, 255, 400 );

        car.initPhysics( this );
        this.map.addObject( car );
        this.activeObjects.push ( car );
        
        
        
        car = new GTA.GameObjectPosition();  
        car.addCar(this, 4, 242, 225, 255, 764 );

        car.initPhysics( this );
        this.map.addObject( car );
        this.activeObjects.push ( car );
        
        
         car = new GTA.GameObjectPosition();  
        car.addCar(this, 44, 281, 297, 255, 300 );

        car.initPhysics( this );
        this.map.addObject( car );
        this.activeObjects.push ( car );
        
        cameraZone = [
        Math.round((this.camera.position.x / 64) / GTA.SectionSize),
        Math.round((-(this.camera.position.y / 64)) / GTA.SectionSize)
        ]
        
        
        this.scene.add( this.map.sections [ 0 ][ 0 ] );
        
      //  console.log(this.map.sections);
        
        this.scene.add( this.map.sections [ 0 ][ 1 ] );
        this.scene.add( this.map.sections [ 1 ][ 1 ] );
        this.scene.add( this.map.sections [ 1 ][ 2 ] );
        methods.animate();
    };
   
    this.cars = {};
    
    
    this.activeObjects = [];
    
    this.sprites = [];
  
    this.map = new GTA.Map( this.scene );
    
    this.physics = new GTA.Physics( this );
    
    this.missions = {};
    this.mission = null;
  
    this.gameobjects = [];
  
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    
    this.renderer.setClearColorHex ( 0x000000, 0 );
    this.renderer.sortObjects = false;
        
    console.log(this);
    window.document.body.appendChild( this.renderer.domElement );
    
 //   window.document.body.appendChild(  GTA.Debug.createPhysicsDebug.call ( this ) );
    
    var _ = this,
    cameraZone;
    
    methods = {
        animate: function() {

            requestAnimationFrame( methods.animate );
            
            _.physics.updateWorld(_, GTA.getBlock(_.player.position.x, _.player.position.y, 2));
            
            _.physics.world.Step(
                1 / 60,   //frame-rate
                10,       //velocity iterations
                10       //position iterations
                );
            _.physics.world.DrawDebugData();
            _.physics.world.ClearForces();
            
            
            
            methods.render.call(_);

        },
        render: function() {
            //this.mesh.rotation.x += 0.01;
            //this.mesh.rotation.y += 0.02;
            
            
            this.player.update( clock.getDelta() );
            
            
            this.camera.position.x = this.player.position.x;
            this.camera.position.y = this.player.position.y;
            
            
            //   controls.update( clock.getDelta() );
            
            
            var x = Math.round((this.camera.position.x / 64) / GTA.SectionSize),
            y = Math.round((-(this.camera.position.y / 64)) / GTA.SectionSize);
            
            if ( x !== cameraZone[ 0 ] || y !== cameraZone[ 1 ] ) {
                
                // TODO remove unused sections
                (function(game, x, y){
                    /*
                
                    window.setTimeout(function() {
                        var i, d;
                        for ( i = y - 1; y < (y + 1); i += 1) {
                            if (i >= 0 ) {
                                for ( d = x - 1; x < (x + 1); d += 1) {
                                    if (d >= 0 ) {
                                        
                                        console.log(i);
                                        console.log(d);
                                        console.log( game.map.sections [ i ][ d ]);
                                        game.scene.add( game.map.sections [ i ][ d ] );
    
                                    
                                    }
                                }
                            
                            } 
                            
                        }

                  
                        game.scene.add( game.map.sections [ y - 1][ x ] );
                        game.scene.add( game.map.sections [ y ][ x ] );
                        game.scene.add( game.map.sections [ y + 1][ x ] );
            
                        game.scene.add( game.map.sections [ y - 1][ x + 1 ] );
                        game.scene.add( game.map.sections [ y ][ x + 1] );
                        game.scene.add( game.map.sections [ y + 1][ x + 1 ] );   
                    
                    }, 0); */
                    })(this,  x, y);
                
                cameraZone[ 0 ] = x;
                cameraZone[ 1 ] = y;
            }
            
            
         
            
            if (GTA.Debug.enabled && GTA.Debug.positionData) {
                GTA.Debug.updatePositionData.call( this );
            }
            
            this.renderer.render( this.scene, this.camera );
        }
        
    };
   
    
    
};

GTA.getBlock = function ( x, y, z ) {
    
    return [ Math.round(x / 64), - Math.round(y / 64), Math.round(z / 64) ];
    
};

GTA.getBlockItem = function ( game, blockArray ) {
    
    return game.map.base[ blockArray[ 0 ] ][ (blockArray[ 1 ]) ].blocks[ blockArray [ 2 ] ];
    
};

GTA.Logging = true;

GTA.Log = function ( message ) {
  
    if (GTA.Logging && window.console !== undefined) {
        window.console.log( message );
    }
    
};

GTA.Error = function ( error ) {
    throw new Error( error );
};


GTA.Rotation = function ( gtaAngle ) {
    // return radians  
    return ((gtaAngle / 256) * 90) * (Math.PI / 180);
};

GTA.SectionSize = 16;

GTA.Blocks = [];

GTA.Base = [];

