/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 3.1.2012 
* @website http://hertzen.com
 */


GTA.Pedestrian = function ( sprite ) {
    this.sprite = sprite;
    this.add( sprite );

    this.speed = 2;
    this.rotationSpeed = 0.1;
    
};

GTA.Pedestrian.prototype = new THREE.Object3D();
GTA.Pedestrian.prototype.constructor = GTA.Pedestrian;


GTA.Pedestrian.prototype.initPhysics = function ( game ) {
    var bodyDef  = new Box2D.Dynamics.b2BodyDef;
    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bodyDef.linearDamping = 0.15;
    bodyDef.angularDamping = 0.3;
    bodyDef.angle = 1.57079633;
    bodyDef.fixedRotation = true;
    
    var fixDef = new Box2D.Dynamics.b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.3;
    fixDef.restitution = 0.4;
    
    
    fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape( 0.3 );
     
    //this.physics.angle = this.rotation;   
    bodyDef.position.x = (this.position.x) / GTA.PhysicsScale;
    bodyDef.position.y = -(this.position.y) / GTA.PhysicsScale;
    
    this.physics = game.physics.world.CreateBody( bodyDef );  
    this.physics.CreateFixture( fixDef );
    
    
};

GTA.Pedestrian.prototype.registerAnimations = function ( offset ) {
    var action = [
    
    // fist - 0
    // [221, 0, 0], 
    
    [offset + 98, 0],            // standing
    [offset + 0, 7, 0.1],      // walking
    [offset + 8, 7, 0.1],     // running
        
    // pistol - 1
    [offset + 89, 0],
    [offset + 99, 7, 0.1],
    [offset + 107, 7, 0.1],
    
    
    // machine gun - 2
    [offset + 152, 0],
    [offset + 136, 7, 0.1],
    [offset + 144, 7, 0.2],
    
            
    // rocket launcher - 3
    [offset + 170, 0],
    [offset + 154, 7, 0.001],
    [offset + 162, 7, 0.002],
    
    // flame thrower - 4
    [offset + 134, 0],
    [offset + 118, 7, 0.1],
    [offset + 126, 7, 0.2]
    

        

        
    ];
    
    this.animationSprites = action;
    
};

GTA.Pedestrian.prototype.movePedestrian = function ( x, y, z ) {
    
    
    /*
    var toBlock = GTA.getBlock( this.position.x + x, this.position.y + y, this.position.z + z ),
    fromBlock = GTA.getBlock(  this.position.x, this.position.y, this.position.z  ),
    toBlockObject;
    */
    /*
    var directionVector = new THREE.Vector3( x, y, z );
    
    var left = new THREE.Vector3( this.position.x + x, this.position.y + y, this.position.z + z );
    
    var left_ray = new THREE.Ray( left, directionVector );
    
					var left_intersects = left_ray.intersectScene( game.scene );*/
    //  console.log(left_intersects);
    //   this.translateX( x );
    //     this.translateY( y );  
        
        
    this.position.x =  x ;
    this.position.y =  y ; 
/*
    if (toBlock === fromBlock) {
        this.translateX( x );
        this.translateY( y );  
    } else if ( toBlock[ 0 ] === fromBlock[ 0 ] || toBlock[ 1 ] === fromBlock[ 1 ] ) {
        // vertical or horizontal move  
        
        toBlockObject = game.map.base[ toBlock[ 0 ] ][ (toBlock[ 1 ]) ].blocks[ toBlock [ 2 ] ];
       
        if (toBlockObject === undefined || toBlockObject.type !== 5 ) {
            this.position.x( x );
            this.position.x( y ); 
        }
       
    } */
    
  
    
    
    
};

GTA.Pedestrian.prototype.update = function ( delta ) {
    
    var speed = delta * this.speed,
    movementSpeed = 0,
    spriteID;
    
    this.lastframe += delta; 
    
    
    // check if it is on ground
    /*
    var onBlock = GTA.getBlock( this.position.x, this.position.y, this.position.z ),
    blockBelow = GTA.getBlock( this.position.x, this.position.y, this.position.z - 1 ),
    blockObject;
    
    if (onBlock !== blockBelow) {
        blockObject = GTA.getBlockItem( this.game, onBlock );
        if (blockObject === undefined || blockObject.type === 0) {
            this.falling = true;
            console.log("falling");
        }
    //     console.log(GTA.getBlockItem( game, onBlock ));
    }
    */
    
    
    if ( this.moveForward  ) {
        // this.movePedestrian ( - ( speed * Math.cos(this.sprite.rotation + 1.57079633) ), - ( speed * Math.sin(this.sprite.rotation + 1.57079633) ), 0, game );
      
      
        //  this.physics.SetLinearVelocity( new Box2D.Common.Math.b2Vec2(  ( speed * Math.cos(this.physics.GetAngle() + 1.57079633) ) ,  ( speed * Math.sin(this.physics.GetAngle() + 1.57079633) ) ) )
        var physicsSpeed = 1;
        this.physics.SetLinearVelocity( new Box2D.Common.Math.b2Vec2(   ( speed * Math.cos(this.physics.GetAngle()) ) ,   ( speed * Math.sin(this.physics.GetAngle()) ) ) );
        
        movementSpeed = 2; // running
    } else if ( this.moveBackward  ) {
        this.movePedestrian (  ( (speed/2) * Math.cos(this.sprite.rotation.z + 1.57079633) ) , ( (speed/2) * Math.sin(this.sprite.rotation.z + 1.57079633) ), 0 );
        
        movementSpeed = 1; // walking
    } else  {
        this.physics.SetLinearVelocity( new Box2D.Common.Math.b2Vec2(  0 ,  0 ) );
    }
    
    spriteID = (this.weapon * 3) + movementSpeed;
    
    if (this.animationSprites[ spriteID ].length <= 2) {
        // no animation
        
        //   this.sprite.scale.set( game.sprites[ this.animationSprites[ spriteID ][0] ].width / 512, game.sprites[ this.animationSprites[ spriteID ][0] ].height / 512, 1.0 );
        
        //     this.sprite.uvScale = game.sprites[ this.animationSprites[ spriteID ][0] ].sprite.uvScale;
        //     this.sprite.uvOffset = game.sprites[ this.animationSprites[ spriteID ][0] ].sprite.uvOffset;
        
        //     this.sprite.scale.set( game.sprites[ this.animationSprites[ spriteID ][0] + this.spriteframe ].width / 256, game.sprites[ this.animationSprites[ spriteID ][0] + this.spriteframe ].height / 256, 1.0 );

     //   this.sprite.geometry.faceVertexUvs[ 0 ][ 0 ] = this.game.sprites[ this.animationSprites[ spriteID ][0] + this.spriteframe ].sprite.geometry.faceVertexUvs[ 0 ][ 0 ];
     
       this.spriteAnimator.setSprite( this.animationSprites[ spriteID ][0]  );
       this.spriteframe = 0;
       
    }       
        
    else if (this.lastframe > this.animationSprites[ spriteID ][2]) {
        this.lastframe = 0;
        /*
        this.remove( this.sprite );
        this.sprite = game.sprites[ this.animationSprites[ spriteID ][0] + this.spriteframe ].sprite;
        this.add ( this.sprite );*/
        
        //     this.sprite.scale.set( game.sprites[ this.animationSprites[ spriteID ][0] + this.spriteframe ].width / 256, game.sprites[ this.animationSprites[ spriteID ][0] + this.spriteframe ].height / 256, 1.0 );

        //   this.sprite.uvScale = game.sprites[ this.animationSprites[ spriteID ][0] + this.spriteframe ].sprite.uvScale;
        //   this.sprite.uvOffset = game.sprites[ this.animationSprites[ spriteID ][0] + this.spriteframe ].sprite.uvOffset;
        
        
        
  //      this.sprite.geometry.faceVertexUvs[ 0 ][ 0 ] = this.game.sprites[ this.animationSprites[ spriteID ][0] + this.spriteframe ].sprite.geometry.faceVertexUvs[ 0 ][ 0 ];
        
    //    this.sprite.geometry.__dirtyUvs = true;
        this.spriteAnimator.setSprite( this.animationSprites[ spriteID ][0] + this.spriteframe );
        this.spriteframe += 1;
        
        if (this.spriteframe >= this.animationSprites[ spriteID ][1]) {
            this.spriteframe = 0;
        }
    }
    
    if ( this.turnLeft  ) {
        // this.sprite.rotation  +=  this.rotationSpeed ;
        //  this.physics.angle += this.rotationSpeed;
        
        this.physics.SetAngle((this.physics.GetAngle()) - this.rotationSpeed);
        
    }
    if ( this.turnRight ) {
        //  this.sprite.rotation  -=  this.rotationSpeed ;
        this.physics.SetAngle((this.physics.GetAngle()) + this.rotationSpeed);
    }
    
    var physPos = this.physics.GetPosition();
    
    this.movePedestrian ( physPos.x * GTA.PhysicsScale, - physPos.y * GTA.PhysicsScale, 0 );
    
    this.sprite.rotation.z = -(this.physics.GetAngle() - 1.57079633);
    
//   this.sprite.rotation = -this.physics.GetAngle();
    
};