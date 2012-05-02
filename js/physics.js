/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 8.1.2012 
* @website http://hertzen.com
 */


GTA.Physics = function ( ) {
    
    this.world = new Box2D.Dynamics.b2World(
        new Box2D.Common.Math.b2Vec2(0, 0), //no gravity, we aren't applying the physics to z-index
        false            
        );
    
    
    this.blockFixture = new Box2D.Dynamics.b2FixtureDef;
    this.blockFixture.density = 1.0;
    this.blockFixture.friction = 0.5;
    this.blockFixture.restitution = 0.2;
    
    this.built = false;
    
    this.bodies = {
        
    };
    
    this.blockFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape;
       
    // half width, half height.
    this.blockFixture.shape.SetAsBox((64 / GTA.PhysicsScale) / 2, (64 / GTA.PhysicsScale) / 2);
    
/*
    this.addBlock (0, 0);
    this.addBlock (1, 0);
    this.addBlock (1, 1);
    this.addBlock (2, 0);
    this.addBlock (3, 0);
    
    this.addBlock (4, 0);
    this.addBlock (5, 0);
    */
    
};

GTA.Physics.prototype.updateWorld = function ( game, pos ) {
    
    var radiusWidth = 12,
    radiusHeight = 10,
    z = 2,
    x,
    y,
    bodies = {},
    i,
    len = game.activeObjects.length,
    gameobj,
    physPos;
   
   
   for (i = 0; i < len; i+= 1) {
       
       gameobj = game.activeObjects[ i ];
       physPos = gameobj.physics.GetPosition();
    
   // this.movePedestrian ( physPos.x * GTA.PhysicsScale, - physPos.y * GTA.PhysicsScale, 0, game );
    
        gameobj.sprite.position.x = physPos.x * GTA.PhysicsScale;
        gameobj.sprite.position.y = - physPos.y * GTA.PhysicsScale;
       gameobj.sprite.rotation.z = -gameobj.physics.GetAngle();
       
   }
   
   
    // if (!this.built) {
    for (x = pos[0] - radiusWidth; x < radiusWidth + pos[0]; x+= 1 ) {
       
        for (y = pos[1] - radiusHeight; y < radiusHeight + pos[1]; y+= 1 ) {
            if (x >= 0 && y >= 0) {
                    
                if ( this.bodies[ x + "-" + y ] === undefined ) {
                    
                    if (game.map.base[ x ][ y ].blocks[z] !== undefined && game.map.base[ x ][ y ].blocks[z].type === 5){
                        // console.log(x);
                        this.bodies[ x + "-" + y ] = this.addBlock (x, y);   
                    }                
                }
                bodies[ x + "-" + y ] = true;
                    

            }
            
        }
    }
  
    for (z in this.bodies) {
        if ( this.bodies.hasOwnProperty( z ) ) {
            if ( bodies [ z ] !== true ) {
                this.world.DestroyBody (this.bodies [ z ]);
                delete this.bodies [ z ];
            }
        }
    }
    
//   this.built = true;
// }
    
      
           
    
    
    
}

GTA.Physics.prototype.addBlock = function ( x, y ) {
    
    var bodyDef = new Box2D.Dynamics.b2BodyDef,
    body
    
    bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
       
    // positions the center of the object (not upper left!)
    bodyDef.position.x = (((x) * 64) / GTA.PhysicsScale);
    bodyDef.position.y = (((y) * 64) / GTA.PhysicsScale);
    
    
    body = this.world.CreateBody(bodyDef);
    body.CreateFixture( this.blockFixture );
    
    return body;
};

GTA.PhysicsScale = 10;