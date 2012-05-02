/* 
 * @author Niklas von Hertzen <niklas at hertzen.com>
 * @created 6.1.2012 
 * @website http://hertzen.com
 */


GTA.Map =  function ( scene ) {
    
    this.sections = [];
    this.gameobjects = [];
    
    this.base = [];
    
    this.scene = scene;
    
    this.mapGeometry = new THREE.Geometry();
    
    var x, y;
    
    // build section groups
    for (y = 0; y < GTA.SectionSize; y += 1) {
        this.sections[ y ] = [];
        for (x = 0; x < GTA.SectionSize; x += 1) {
            this.sections[ y ][ x ] = new THREE.Object3D();
            
            this.sections[ y ][ x ].matrixAutoUpdate = false;
            this.sections[ y ][ x ].updateMatrix();
        //   scene.add ( this.sections[ y ][ x ] )
            
        }
        
    }
    
    
   
    
};


GTA.Map.prototype.addObject = function ( gameobject ) {
    
    gameobject.sprite.rotation.z = GTA.Rotation ( gameobject.rotation );
    
    // gameobject.sprite.rotation.x = 1.5
    
    gameobject.sprite.position.set( gameobject.x - 32, -gameobject.y + 32, 2 +  gameobject.z - 2 * 64  );
    //       gameobject.sprite.position.z = 200;
    gameobject.sprite.matrixAutoUpdqate = false;
    gameobject.sprite.updateMatrix();
    
    
    if (gameobject.x > 256*64 || gameobject.y > 256*64) {
        GTA.Log("Game object out of bounds");
    }else {
       // this.scene.add( gameobject.sprite );
          this.sections[ Math.floor((gameobject.y / 64) / GTA.SectionSize) ][ Math.floor((gameobject.x / 64) / GTA.SectionSize) ].add( gameobject.sprite );
         
        this.gameobjects.push ( gameobject );       
    }
    

    
};

GTA.Map.prototype.addColumn = function( x, y, data ) {
    
    
    var column = new GTA.Column(x, y),
    mesh,
    z;
    
    column.loadColumn( data.getUint32(28 + (x*4) + (y*4)*256 ) + 262172, data );
            
    if (y === 0) {
        this.base[ x ] = [];
    }
            
   
            
    for (z = 0; z < column.height; z+= 1 ) {
        


        mesh = THREE.SceneUtils.cloneObject( column.blocks[z].mesh );
        
        mesh.position.z = (z * 64) + 32;
        mesh.position.x = x * 64;
        mesh.position.y = -(y * 64);
                    
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        

                    
        if ( GTA.Debug.enabled && GTA.Debug.fastStart ) {
            this.sections[ Math.floor(y / GTA.SectionSize) ][ Math.floor(x / GTA.SectionSize) ].add( mesh );
        } else {
            THREE.GeometryUtils.merge(this.mapGeometry, mesh);
        }          
    //   
              
               
                 
              
              
    }
                
                
      
         
                
    this.base[ x ][ y ] = column;
            
    
    
};