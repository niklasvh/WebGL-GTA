/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 1.1.2012 
* @website http://hertzen.com
 */



GTA.Column = function (x, y) {
    this.x = x;
    this.y = y;
    
    this.height;
    this.blocks = [];  
   
};

GTA.Column.prototype.loadColumn = function( offset, data ) {
    var h;
    
    this.height = 6 - data.getUint16( offset );
    
    for ( h = 0; h < this.height; h += 1 ) {
        this.blocks[h] = GTA.Blocks[ data.getUint16() ];
    }
    
    this.blocks.reverse();

};



GTA.Block  = function () {
    
    this.directions = {
        up: false,
        down: false,
        left: false,
        right: false
    };
    
    /*
     * 0 = air, 
     * 1 = water, 
     * 2 = road, 
     * 3 = pavement, 
     * 4 = field, 
     * 5 = building, 
     * 6 = unused, 
     * 7 = unused 
     */
    this.type = 0;
    
    this.flat = false;
    
    this.railway = false;
    
    
    this.left;
    this.right;
    this.top;
    this.bottom;
    this.lid;
    
    
    // (0 = normal, 1 = 90 deg, 2=180 deg, 3=270 deg)
    this.lidRotation = 0;
    
    
};


GTA.Block.prototype.tileUV = function (row, column, rotation, flipH, flipV, totalRows, totalColumns) {
        
                 
        
    var deltaX = 1 / totalColumns,
    deltaY = 1 / totalRows,

    arr = [
    new THREE.UV((column - 1) * deltaX, (row - 1) * deltaY), // top - left
    new THREE.UV((column - 1) * deltaX, row * deltaY), // bottom - left
    new THREE.UV(column * deltaX, row * deltaY), // bottom - right
    new THREE.UV(column * deltaX, (row - 1) * deltaY) // top - right
    ],
    /*
    arr = [
    new THREE.UV((column - 1) * deltaX, (row - 1) * deltaY), // top - left
    new THREE.UV((column - 1) * deltaX, row * deltaY), // bottom - left
    new THREE.UV(column * deltaX, row * deltaY), // bottom - right
    new THREE.UV(column * deltaX, (row - 1) * deltaY) // top - right
    ],
     */
    splicedArr = arr.splice(0, rotation);
        
    arr = arr.concat(splicedArr);

    
 
    
    
    /*

    if (flipH) {
        arr.reverse();
    }
     
    if (flipV) {
        splicedArr = arr.splice(0, 4);
            
        arr.push(splicedArr[1], splicedArr[0], splicedArr[3], splicedArr[2]);
 
    }*/

    return arr;
                
                
                
};

GTA.Block.prototype.getTile = function ( tileid, side, rotation, tiles ) {
    
    tileid += 1;
    
    if (side === "lid") {
        
        tileid += tiles.sideTiles;
    }
    
    var row = Math.ceil(tileid / 4),
    column = 4 - ((row * 4) - tileid);
   
   
    
    switch(side) {
    
        case "lid":
            return this.tileUV( row, column, rotation.lidRotation, false, false, tiles.numRows , 4 );
            break;
     
        case "right":
            return this.tileUV( row, column, 1, rotation.flipX, rotation.flipY, tiles.numRows , 4 );
            break;
                  
        case "top":
            return this.tileUV( row, column, 2, rotation.flipX, rotation.flipY, tiles.numRows , 4 );
            break;
            
        case "left":
            return this.tileUV( row, column, 1, rotation.flipX, !rotation.flipY, tiles.numRows , 4 );
            break;
     
        default:
            return this.tileUV( row, column, 0, rotation.flipX, rotation.flipY, tiles.numRows , 4 );
     
       
    }
    
      
    
    
};


GTA.Block.prototype.loadType = function( data, tileSprite ) {

    
    var type_map = data.getUint16(), 
    type_map_ext = data.getUint8();
    
    this.left = data.getUint8();
    this.right = data.getUint8();
    this.top = data.getUint8();
    this.bottom = data.getUint8();
    this.lid = data.getUint8();
    
    

    this.directions.up = (type_map & 1) != 0;
    this.directions.down = (type_map & 2) != 0;
    this.directions.left = (type_map & 4) != 0;
    this.directions.right = (type_map & 8) != 0;
    
    this.type = (type_map & 0x70) >> 4;
   
    this.flat = (type_map & 128) != 0;
    
    
    this.railway = (type_map_ext & 128) != 0;
    
    this.flipY = (type_map & 32) != 0;
    this.flipX = (type_map & 64) != 0;
    
    this.slope = (type_map & 0x3F00) >> 8;
    
    this.rotation = {
        lidRotation: (type_map & 0xC000) >> 14,
        flipY: (type_map & 32) != 0,
        flipX: (type_map & 64) != 0
    };
    
    
    
    
    this.trafficLights = (type_map_ext & 0x7) >> 0;
    
    this.remap = (type_map_ext & 0x18) >> 3;
    
    
    
    
   
    var sides = {
        px: this.right != 0, 
        nx: this.left != 0, 
        py: this.top != 0, 
        ny: this.bottom != 0, 
        pz: this.lid != 0, 
        nz: false
    };
    /*
    sides = {
        px: true, 
        nx: true, 
        py: true,  
        ny: true,  
        pz: true,
        nz: true
    };


sides = {
        px: (this.right || this.lid) != 0, 
        nx: (this.left || this.lid) != 0, 
        py: (this.top || this.lid) != 0, 
        ny: (this.bottom || this.lid) != 0, 
        pz: this.lid != 0, 
        nz: false
    };
    */
    var txtSides = ["right","left","top","bottom","lid"];
  
    var cube = new THREE.CubeGeometry( 64, 64, 64, 1, 1, 1, tileSprite.materials, sides )

    cube.doubleSided = false; 
    cube.flipSided = false; 
    cube.overdraw = false; 
    cube.dynamic = false; 


  
 
    

    // top
    //cube.faceVertexUvs[0][sides.px + sides.nx + sides.py + sides.ny ] = this.tileUV(1, 2, 0, false, false, 95, 4);
    if (this.lid != 0) {
        cube.faceVertexUvs[0][sides.px + sides.nx + sides.py + sides.ny ] = this.getTile( this.lid, "lid", this.rotation, tileSprite);
    }
    

    if (this.bottom != 0) {
        cube.faceVertexUvs[0][sides.px + sides.nx + sides.py  ] = this.getTile( this.bottom, "bottom", this.rotation, tileSprite);
    }
   
    if (this.top != 0) {
        cube.faceVertexUvs[0][sides.px + sides.nx   ] = this.getTile( this.top, "top", this.rotation, tileSprite);
    }
    
    if (this.left != 0) {
        cube.faceVertexUvs[0][ +sides.px  ] = this.getTile( this.left, "left", this.rotation, tileSprite);
    }
    
    if (this.right != 0) {
        cube.faceVertexUvs[0][0] = this.getTile( this.right, "right", this.rotation, tileSprite);
    }
    
    //this.flipY = false;
    //this.flipX = false;
    
    var copyFrom = sides.px + sides.nx;
    var copyTo = sides.px + sides.nx + sides.py;
    
  
   
    
    if ( this.flat === true ) {
        if ( this.bottom !== 0 ) {
            
            // move bottom to top
            
            cube.faces[ copyTo ].a = cube.faces[ copyFrom ].b;
            cube.faces[ copyTo ].b = cube.faces[ copyFrom ].a;
            cube.faces[ copyTo ].c = cube.faces[ copyFrom ].d;
            cube.faces[ copyTo ].d = cube.faces[ copyFrom ].c;
        /*
            
        // if (cube.faces.length === 4){
        
                cube.faces[ cube.faces.length - 1 ].a = 2;
                cube.faces[ cube.faces.length - 1 ].b = 0;
                cube.faces[ cube.faces.length - 1 ].c = 1;
                cube.faces[ cube.faces.length - 1 ].d = 3; 
            } else {
                cube.faces[ +sides.ny ].a = 2;
                cube.faces[ +sides.ny ].b = 0;
                cube.faces[ +sides.ny ].c = 1;
                cube.faces[ +sides.ny ].d = 3; 
            }*/
        }
        copyFrom = 0;
        if (this.right !== 0) {
        
            if (cube.faces [ copyFrom + 1] == undefined) {
                cube.faces[ copyFrom ].a = 2;
                cube.faces[ copyFrom ].b = 0;
                cube.faces[ copyFrom ].c = 1;
                cube.faces[ copyFrom ].d = 3;
            } else {
                cube.faces[ copyFrom ].a = cube.faces[ copyFrom + 1].b;
                cube.faces[ copyFrom ].b = cube.faces[ copyFrom + 1].a;
                cube.faces[ copyFrom ].c = cube.faces[ copyFrom + 1].d;
                cube.faces[ copyFrom ].d = cube.faces[ copyFrom + 1].c; 
            }
        
            
        }
    // console.log(cube.faces[sides.px + sides.nx  ]);
    // cube.faces[sides.px + sides.nx + sides.py  ].centroid.y = 32;
    // console.log(cube.faces[sides.px + sides.nx + sides.py  ]);
    

    //console.log(cube.faces[sides.px + sides.nx  ]);
    // cube.faces[sides.px + sides.nx + sides.py  ].centroid.y = 32;
    //    console.log(this.mesh);
    //     }
    
        
    }
    
    var sideIndex = [ 0, 1, 2, 3 ];
    if ( cube.faces.length > 1 ) {
        
        var faceIndex = cube.faces.length - 1;
        sideIndex = [ cube.faces[ faceIndex ].a, cube.faces[ faceIndex ].d, cube.faces[ faceIndex ].b, cube.faces[ faceIndex ].c ];

    }
    
    function buildSlope ( start, angle, vertices, direction ) {
        
        if ( vertices.length > 0 ) {
            
            // top left
            vertices[ sideIndex[ 0 ] ].position.z = ( start + direction [ 0 ] ) * angle;
                                   
            // top right
            vertices[ sideIndex[ 1 ] ].position.z = ( start + direction [ 1 ] ) * angle; 
           
           
            // bottom left
            vertices[ sideIndex[ 2 ] ].position.z = ( start + direction [ 2 ] ) * angle; 
       
            // bottom right
            vertices[ sideIndex[ 3 ] ].position.z = ( start + direction [ 3 ] ) * angle;    
        
        }
        
    }
    
    switch (this.slope) {
        /*
        case  3:
             
            // top left
            cube.vertices[ sideIndex[ 0 ] ].position.z = -32;
                            
            // top right
            cube.vertices[ sideIndex[ 1 ] ].position.z = -32;
                
            // bottom left
            cube.vertices[ sideIndex[ 2 ] ].position.z = 0;
                
            // bottom right
            cube.vertices[ sideIndex[ 3 ] ].position.z = 0;
                
            break;
            
        case  4:
             
            // top left
            cube.vertices[ sideIndex[ 0 ] ].position.z = 0;
                            
            // top right
            cube.vertices[ sideIndex[ 1 ] ].position.z = 0; 
           
           
            // bottom left
            cube.vertices[ sideIndex[ 2 ] ].position.z = 32; 
       
            // bottom right
            cube.vertices[ sideIndex[ 3 ] ].position.z = 32; 

            break;
            */
           
        case 1:
        case 2:
            buildSlope( (this.slope - 2), 32, cube.vertices, [ 1, 1, 0, 0 ] );
            break;
           
        case 3:
        case 4:
            buildSlope( (this.slope - 4), 32, cube.vertices, [ 0, 0, 1, 1 ] );
            break;
           
        case 5:
        case 6:
            buildSlope( (this.slope - 6), 32, cube.vertices, [ 1, 0, 1, 0 ] );
            break;
           
        case 7:
        case 8:
            buildSlope( (this.slope - 8), 32, cube.vertices, [ 0, 1, 0, 1 ] );
            break;
        
        
        case  9:
        case  10:
        case  11:
        case  12:
        case  13:
        case  14:
        case  15:
        case  16:
            
            buildSlope( (this.slope - 9) - 4, 8, cube.vertices, [ 1, 1, 0, 0 ] );

            break;
        
        

        
        case  17:
        case  18:
        case  19:
        case  20:
        case  21:
        case  22:
        case  23:
        case  24:
            
            buildSlope( (this.slope - 17) - 4, 8, cube.vertices, [ 0, 0, 1, 1 ] );

            break;
            
            
                         
        case  25:
        case  26:
        case  27:
        case  28:
        case  29:
        case  30:
        case  31:
        case  32:
            
            buildSlope( (this.slope - 25) - 4, 8, cube.vertices, [ 1, 0, 1, 0 ] );

            break;
            
            
                         
        case  33:
        case  34:
        case  35:
        case  36:
        case  37:
        case  38:
        case  39:
        case  40:
            
            buildSlope( (this.slope - 33) - 4, 8, cube.vertices, [ 0, 1, 0, 1 ] );

            break;
        
        
    }
 
    
    //console.log(cube.faces.length);

    this.mesh = new THREE.Mesh( cube, new THREE.MeshFaceMaterial() );
   
       

    
    
};



GTA.createBlockMaterial = function ( tileSprite ) {
    
    var materials = [],
    i,
    texture;
 
    for (i = 0; i < 5; i += 1) {
        

        texture = new THREE.Texture( tileSprite, new THREE.UVMapping(), THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, THREE.NearestFilter, THREE.LinearMipMapLinearFilter );
        texture.needsUpdate = true;
          
        materials[i] =  new THREE.MeshBasicMaterial( {
            map: texture,
            transparent: true
        } );
        

    }
 
    materials.push( new THREE.MeshBasicMaterial( {
        color: Math.random() * 0x000000,
        opacity: 0,
        transparent: true
    } ) );
    
    return materials;
    
};
