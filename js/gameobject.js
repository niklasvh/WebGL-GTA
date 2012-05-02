/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 1.1.2012 
* @website http://hertzen.com
 */


GTA.GameObject = function ( ) {
    
    
    };


GTA.GameObject.prototype.loadData = function ( data ) {
  
    this.width = data.getUint32();
    this.height = data.getUint32();
    this.depth = data.getUint32();
  
 
 
    this.sprite = data.getUint16();
    this.spriteNum = this.sprite;
    this.weight = data.getUint16();
    this.aux = data.getUint16();
  
  
    /*
   * Status:
   * 0 - normal
   * 1 - ignorable
   * 2 - smashable
   * 3 - invisible
   * 4 - ?
   * 5 - animation
   * 6 - car upgrade
   * 7 - 
   * 8 - helipad?
   * 9 - powerup
   * 10 - ?
   * 11 - ?
   * 12 - ?
   */
  
    this.status = data.getInt8();
    if (this.status == "7") {
        console.log(this);
    }
  
    this.numInto = data.getUint8();
  
// console.log(this);
    
};


GTA.GameObjectLoader = function (_, data, fileInfo) {
    
    // Object pos
    
           
            var len = fileInfo.objectPosSize / 14,
            gameobject;
            
        
        data.seek((262172 + fileInfo.columnSize + fileInfo.blockSize));
        
        
        for ( z = 0; z < len; z += 1 ) {
            gameobject = new GTA.GameObjectPosition();
            gameobject.loadData( data );
            
            
            // gameobject.sprite = new THREE.Object3D();
            
            if ( gameobject.remap >= 128  ) {
                // it is a vehicle    
                                
                if ( _.cars[ gameobject.type ] === undefined ) {
                    // console.log(gameobject);
                    //  gameobject.sprite.add( THREE.SceneUtils.cloneObject( this.cars[ 0 ].sprite.sprite ) );
                    GTA.Log("Error: Cannot add add object (position " + z + "), no vehicle with ID " + gameobject.type);
                    gameobject.sprite = new THREE.Object3D();
                  
                } else {
                    gameobject.sprite = THREE.SceneUtils.cloneObject( _.cars[ gameobject.type ].sprite.sprite ) ;
                }
                
            } else {
                
                    
                gameobject.sprite = THREE.SceneUtils.cloneObject( _.gameobjects[ gameobject.type ].sprite ) ;
                
                
            }
            //gameobject.sprite.rotation = (65535 / gameobject.rotation)* Math.PI * (Math.PI / 180);
            // gameobject.sprite.rotation.y = 270 * (Math.PI / 180);
            // gameobject.sprite.rotation.z = 270 * (Math.PI / 180);
            
            // gameobject.sprite.rotation = (65535 / gameobject.rotation)* Math.PI;
            //   gameobject.sprite.rotation = ((65535 / gameobject.rotation)* Math.PI) * (Math.PI / 180);
            //   gameobject.sprite.rotation = 360 * (Math.PI / 180);
            //gameobject.sprite.position.set( gameobject.x - 32, -gameobject.y + 32, 10 + gameobject.z - 2.5 * 64  );
            
            //gameobject.sprite.matrixAutoUpdqate = false;
            //gameobject.sprite.updateMatrix();

   

            
            _.map.addObject( gameobject );
        //this.map.sections[ Math.floor((gameobject.y / 64) / GTA.SectionSize) ][ Math.floor((gameobject.x / 64) / GTA.SectionSize) ].add( gameobject.sprite );
        // this.scene.add( gameobject.sprite );
            
           
            
        //gameobject.sprite.scale.x = gameobject
            
        //this.map.gameobjects.push ( gameobject );
        }
    /*
        this.gameobjects[26].sprite.sprite.scale.x = 4/64;
        this.gameobjects[26].sprite.sprite.scale.y = 4/64;
        
        this.scene.add( this.gameobjects[26].sprite.sprite );
         */
    //    console.log(this.map.gameobjects);
        
    
    
    
}

GTA.GameObjectPosition =  function ( ) {
    

    
    
    };

GTA.GameObjectPosition.prototype.loadData = function ( data ) {
    this.x = data.getUint16();
    this.y = data.getUint16();
    this.z = data.getUint16();
    
    this.type = data.getUint8();
    this.remap = data.getUint8();
    
    this.rotation = data.getUint16();
    this.pitch = data.getUint16();
    this.roll = data.getUint16();
    
};


GTA.GameObjectPosition.prototype.initPhysics = function ( game ) {
        
    var bodyDef  = new Box2D.Dynamics.b2BodyDef;
    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bodyDef.linearDamping = 0.15;
    bodyDef.angularDamping = 0.3;
    bodyDef.angle = -(this.rotation - 1.57079633);
    
    
    var fixDef = new Box2D.Dynamics.b2FixtureDef;
    
    fixDef.friction = 0.3;
    fixDef.restitution = 0.4;
    fixDef.density = 0;
    
    var gameobject;
    
    if (this.remap >= 128) {
        gameobject = game.gameobjects [ this.type ];
    } else {
        gameobject = game.cars [ this.type ];
        fixDef.density = 8*10000;
    }
    
    
    
    fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
    
    fixDef.shape.SetAsBox((gameobject.width / GTA.PhysicsScale) / 2, (gameobject.height / GTA.PhysicsScale) / 2);
    
    //this.physics.angle = this.rotation;   
    
     
    bodyDef.position.x = (this.x - 32) / GTA.PhysicsScale;
    bodyDef.position.y = (this.y - gameobject.height / 2) / GTA.PhysicsScale;
    
    
    
    // half width, half height.
   
    
    
    this.physics = game.physics.world.CreateBody( bodyDef );  
    
  
    
    this.physics.CreateFixture( fixDef );
}


GTA.GameObjectPosition.prototype.addCar = function ( game, type, x, y, z, angle ) {
    this.type = type;
    
    this.x = x;
    this.y = y;
    this.z = z;
    
    
    
    this.rotation = angle;
    // if (this.type < 40) {
        
    this.sprite = THREE.SceneUtils.cloneObject( game.cars[ this.type ].sprite.sprite ) ;
/*
   
    }else{
        this.sprite = {
            position: {
                set:function(){}
            },
            updateMatrix: function(){}
            
        };
    }*/
    
    
};