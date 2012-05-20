/* 
 * @author Niklas von Hertzen <niklas at hertzen.com>
 * @created 30.12.2011 
 * @website http://hertzen.com
 */




GTA.Data = null;




GTA.Location = function ( ) {
    
    
    };
    
GTA.NavigationalData = function ( ) {
        
    };
    
GTA.NavigationalData.prototype.loadData = function ( x, y, w, h, sam, name ) {
        
        
    this.x = x;
    this.y = y;
        
    this.w = w;
    this.h = h;
        
    this.name = name;
    this.sam = sam;

//console.log(this); 
};


GTA.loader = function ( file ) {

    /*
    GTA.ajaxLoader.call(this, file, function(data) {
        GTA.parseCMP.call( this, new DataViewReader( data, true ) );
    });
     */
    /*
    GTA.ajaxLoader.call(this, "data/F_PLAY1.RAW", function(data) {
        var c = RAWLoader.load( new Uint8Array(data), 102, 141, 3, true );
        document.body.appendChild(c);
    });
    */
    
    GTA.ajaxLoader.call(this, "data/MISSION.INI", function( data ) {
        GTA.parseINI.call( this, data );
        //   this.missions = new GTA.Missions();
        // this.missions.loadData( new DataViewReader( data, true ) );
        //GTA.parseCMP.call( this, new DataViewReader( data, true ) );
        
        
        // select first mission
        this.mission = this.missions[ 1 ];
        
        GTA.ajaxLoader.call(this, "data/" + this.mission.cmp, function(data) {
            GTA.parseCMP.call( this, new DataViewReader( data, true ) );
        });
        
        
    }, 'text');
   
};


GTA.ajaxLoader = function ( file, callback, type ) {
    var xhr = new XMLHttpRequest(),
    game = this;
    xhr.open('GET', file, true);
    xhr.responseType = type || 'arraybuffer';

    xhr.onload = function() {
        if ( this.status === 200 ) {
            callback.call(game, this.response);
        }
    };

    xhr.send();
    
};


GTA.clutLoader = function ( data, clutSize ) {
    var clutData,
    clutPages = [],
    p,
    numPages = clutSize / (64*256*4),
    page;
    
    for (page = 0; page < numPages; page += 1) {
        clutData = [];
        for (p = 0; p < (64*256); p += 1) {
            //   rawClut[p] = [ data.getUint8(), data.getUint8(), data.getUint8(), data.getUint8() ]; // BGRA
            // rawClut[p] = data.getUint8();
        
            if (p <= 63) {
                clutData[ p ] = [];
            }
        
            clutData[(p % 64)].push([ data.getUint8(), data.getUint8(), data.getUint8(), data.getUint8() ]);
        //       ^^clutId          ^^  Blue        ^^ Green          ^^ Red          ^^ Alpha
        
        } 
        clutPages.push(clutData);
    }
    
    return clutPages;
    
};





GTA.parseG24 = function ( data ) {
    
    var styleInfo = {
        versionCode: data.getUint32(),
        sideSize: data.getUint32(),
        lidSize: data.getUint32(),
        auxSize: data.getUint32(),
        animSize: data.getUint32(),
        clutSize: data.getUint32(),
        tileClutSize: data.getUint32(),
        spriteClutSize: data.getUint32(),
        newCarClutSize: data.getUint32(),
        fontClutSize: data.getUint32(),
        paletteIndexSize: data.getUint32(),
        objectInfoSize: data.getUint32(),
        carSize: data.getUint32(),
        spriteInfoSize: data.getUint32(),
        spriteGraphicsSize: data.getUint32(),
        spriteNumbersSize: data.getUint32(),
        headerSize: data.getPos()
    },
    len,
    sprite,
    car;
    
    console.log(styleInfo);
    
    
    styleInfo.clutSizeRounded = styleInfo.clutSize + (65536 - (styleInfo.clutSize % 65536));
    
    
    var numTiles = (styleInfo.sideSize + styleInfo.lidSize +  styleInfo.auxSize) / (64*64),
    x,
    xLen = 64*4,
    yLen = (styleInfo.sideSize + styleInfo.lidSize + styleInfo.auxSize + (numTiles % 4) * 64 * 64) / xLen,
    y,
    i,
    height,
    p,

    palette,
    
    tileSprite = document.createElement('canvas'),
    spriteCanvas = document.createElement( 'canvas' ),
    ctx;
    
    tileSprite.width = xLen;
    tileSprite.height = yLen;
  
    spriteCanvas.width = 256;
    spriteCanvas.height = height = Math.ceil(styleInfo.spriteGraphicsSize / 256);
    
    
    // needs to be a multiple of 4
  
    styleInfo.blockPad = (numTiles % 4) * 64 * 64;
    
    

  
 
    // load sprite data
    data.seek(
        styleInfo.headerSize + 
        (styleInfo.sideSize + styleInfo.lidSize + styleInfo.auxSize + styleInfo.blockPad) + 
        styleInfo.animSize + 
        styleInfo.clutSizeRounded + 
        styleInfo.paletteIndexSize + 
        styleInfo.objectInfoSize + 
        styleInfo.carSize
        );
 
 
    p = data.getPos();
    
    var spriteClut = [];  
    while( p + styleInfo.spriteInfoSize > data.getPos()) {
        sprite = new GTA.Sprite();
        sprite.loadData( data );
        this.sprites.push( sprite ); 
        
        
        for (y = sprite.y; y < (sprite.height + sprite.y); y+= 1){           
            for (x = sprite.x; x < (sprite.width + sprite.x); x+= 1){
                spriteClut[ (y *  256) + x ] = sprite.clut;
            }
        }

    }   
 
 
    // create color palette    
    
    palette = GTA.ColorPalette(data, styleInfo);
    
  
    GTA.DrawTiles( tileSprite.getContext("2d"), data, styleInfo, palette, xLen, yLen );
    GTA.DrawSprite( spriteCanvas.getContext('2d'), data, styleInfo, palette, spriteClut, height );
    
    delete spriteClut; // won't need it anymore
 
 
 
 
 
 
    var texture = new THREE.Texture( spriteCanvas, new THREE.UVMapping(), THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, THREE.NearestFilter, THREE.LinearMipMapLinearFilter );
    texture.needsUpdate = true;
    

    var spriteCanvasWidth = spriteCanvas.width,
    spriteCanvasHeight = spriteCanvas.height,
    geom,
    arr;
    
   

 
    len = this.sprites.length;
    
    
    
    for (i = 0; i < len; i += 1) {
        /*
        this.sprites[ i ].sprite = new THREE.Sprite( {
            map: texture, 
            useScreenCoordinates: false, 
            color: 0xffffff
        } );

        
        this.sprites[ i ].sprite.scale.set( this.sprites[ i ].width / 225, this.sprites[ i ].height / 225, 1.0 );
        */
       
        arr = [
        new THREE.UV( this.sprites[ i ].x / spriteCanvasWidth, this.sprites[ i ].y / spriteCanvasHeight ), // top - left
        new THREE.UV( this.sprites[ i ].x / spriteCanvasWidth , (this.sprites[ i ].y + this.sprites[ i ].height) / spriteCanvasHeight ), // bottom - left
        new THREE.UV( (this.sprites[ i ].x + this.sprites[ i ].width) / spriteCanvasWidth,  (this.sprites[ i ].y + this.sprites[ i ].height) / spriteCanvasHeight ), // bottom - right
        new THREE.UV( (this.sprites[ i ].x + this.sprites[ i ].width) / spriteCanvasWidth,  this.sprites[ i ].y / spriteCanvasHeight) // top - right
        ];
    
       
        geom = new THREE.PlaneGeometry( this.sprites[ i ].width, this.sprites[ i ].height, 1, 1);
        // console.log(geom);
        geom.faceVertexUvs[ 0 ][ 0 ] = arr;
        
       
        this.sprites[ i ].sprite = new THREE.Mesh( geom, new THREE.MeshBasicMaterial( {
            map: texture,
            // blending: THREE.SubtractiveBlending,
            transparent: true
        } ) );
       
    //   this.sprites[ i ].sprite.scale.set( scaleDown * this.sprites[ i ].width, scaleDown * this.sprites[ i ].width, 1.0  );
   
    //  this.sprites[ i ].sprite.scale.set( scaleWidth, scaleHeight, 1.0 );
         
    //  this.sprites[ i ].sprite.scale.set( scaleWidth * this.sprites[ i ].width, scaleHeight * this.sprites[ i ].height, 1.0 ); 
         
    // this.sprites[ i ].sprite .uvOffset.set( this.sprites[ i ].x / 256, this.sprites[ i ].y / height );
    // this.sprites[ i ].sprite .uvScale.set( this.sprites[ i ].width / 256, this.sprites[ i ].height / height );
        
        
    }
 
 
 
 
 
 
    // sprite numbers
    

    data.seek(
        styleInfo.headerSize + 
        (styleInfo.sideSize + styleInfo.lidSize + styleInfo.auxSize + styleInfo.blockPad) + 
        styleInfo.animSize + 
        styleInfo.clutSizeRounded + 
        styleInfo.paletteIndexSize + 
        styleInfo.objectInfoSize + 
        styleInfo.carSize + 
        styleInfo.spriteInfoSize + 
        styleInfo.spriteGraphicsSize
        );
            
    this.spriteNumbers = new GTA.SpriteNumbers();
    this.spriteNumbers.loadData( data );
 
 

    // load object data
    data.seek(
        styleInfo.headerSize + 
        (styleInfo.sideSize + styleInfo.lidSize + styleInfo.auxSize + styleInfo.blockPad) + 
        styleInfo.animSize + 
        styleInfo.clutSizeRounded + 
        styleInfo.paletteIndexSize
        );
            
    i = styleInfo.objectInfoSize / 20;
    
    for (p = 0; p < i; p += 1) {
        var gameObject = new GTA.GameObject();
        gameObject.loadData( data );   
        
        //   console.log(this.sprites[ gameObject.sprite + 67 ]);
        // gameObject.sprite = THREE.SceneUtils.cloneObject( this.sprites[ gameObject.sprite + 83 ].sprite );
        gameObject.sprite = this.sprites[  gameObject.sprite  + this.spriteNumbers.offset.OBJECT ].sprite;
            
            
        //   gameObject.sprite.scale.x = gameObject.width / 64;
        //   gameObject.sprite.scale.y = gameObject.height / 64;
        
        //gameObject.sprite = this.sprites[ gameObject.sprite + 67 ];
        this.gameobjects.push( gameObject );
    }

    //console.log(this.gameobjects[101]);
    
    
    
    // load car data
    
    data.seek(
        styleInfo.headerSize + 
        (styleInfo.sideSize + styleInfo.lidSize + styleInfo.auxSize + styleInfo.blockPad) + 
        styleInfo.animSize + 
        styleInfo.clutSizeRounded +
        styleInfo.paletteIndexSize +
        styleInfo.objectInfoSize
        
        );
    p = data.getPos();
      
    while( p + styleInfo.carSize > data.getPos()) {
        car = new GTA.Car();
        car.loadData( data );
        //  console.log( car.sprite + 56 );
        //    car.sprite = this.sprites[  car.sprite + this.spriteNumbers.offset.CAR ];
        
        if ( car.type === 0 ) {
            car.sprite = this.sprites[  car.sprite + this.spriteNumbers.offset.BUS ];
        } else {
            car.sprite = this.sprites[  car.sprite + this.spriteNumbers.offset.CAR ];
        }
        
        this.cars[car.model] = car; 
    }        

    
    return {
        materials: GTA.createBlockMaterial( tileSprite ),
        numRows: Math.ceil(numTiles / 4),
        sideTiles: (styleInfo.sideSize) / (64*64),
        tiles: tileSprite
    };
    
    
    
    
    
};


GTA.parseSDT = function ( data, number ) {
    
    var len = data.getData().byteLength / 12,
    i, 
    sounds = [];
    
    GTA.ajaxLoader.call(this, "data/LEVEL00" + number + ".RAW", function(audioData) {       
             
        for ( i = 0; i < len; i += 1 ) {
            sounds.push ( new GTA.Sound( audioData, data.getUint32(), data.getUint32(), data.getUint32() ) );
        }
              
    });

    
    return sounds;
    

    
};

GTA.parseCMP = function ( data ) {
    
    var fileInfo = {
        versionCode: data.getUint32(),
        styleNumber: data.getUint8(),
        sampleNumber: data.getUint8(),
        routeSize: data.getUint32(8),
        objectPosSize: data.getUint32(12),
        columnSize: data.getUint32(),
        blockSize: data.getUint32(),
        navDataSize: data.getUint32()
    },
    x = 0,
    y = 0,
    gameobject,
    column;
    
    /*
    GTA.ajaxLoader.call(this, "data/LEVEL00" + fileInfo.styleNumber + ".SDT", function(soundData) {       
        this.sounds = GTA.parseSDT.call( this, new DataViewReader( soundData, true ), fileInfo.styleNumber );    
    });
    */
    
    GTA.ajaxLoader.call(this, "data/STYLE00" + fileInfo.styleNumber + ".G24", function(styleData) {
              
        var material = GTA.parseG24.call( this, new DataViewReader( styleData, true ) );
    

        // pos = 28
    
    
    
        // Block Data
    
        data.seek((262172 + fileInfo.columnSize));
        var z,
        len = fileInfo.blockSize / 8,
        block;
        for (z = 0; z < len; z += 1) {
        
            block = new GTA.Block();
        
            block.loadType( data, material );
            GTA.Blocks.push(block);
        }
    
 
        
        
        
    
    
    
    
        data.seek((262172 + fileInfo.columnSize + fileInfo.blockSize + fileInfo.objectPosSize + fileInfo.routeSize));
        len = 3*6*6;
    
        // Location Data
    
        /*
    for (z = 0; z < len; z += 1) {
        
        block = new GTA.Block();
        
        block.loadType( 
            data.getUint16(), 
            data.getUint8(),
            data.getUint8(),
            data.getUint8(),
            data.getUint8(),
            data.getUint8(),
            data.getUint8()

            );
        GTA.Blocks.push(block);
    }
         */
    
    
        // Navigational Data
    
        data.seek((262172 + fileInfo.columnSize + fileInfo.blockSize + fileInfo.objectPosSize + fileInfo.routeSize + 3*6*6));
        len = fileInfo.navDataSize / 35;
    
        for (z = 0; z < len; z += 1) {
        
            block = new GTA.NavigationalData();
        
            block.loadData( 
                data.getUint8(), 
                data.getUint8(),
                data.getUint8(), 
                data.getUint8(),
                data.getUint8(),
                data.getString(30)


                );
   
        }
    
    
        var columnDataView = new DataViewReader( data.getData().buffer, true ),
        map = this.map,
        scene = this.scene,
        game = this;
   
        columnDataView.seek( data.getPos() );
        
      
        var recallFunc = function( ) {
            window.setTimeout(function() {
                var y;
                for (y = 0; y < 256; y+= 1) {
                    map.addColumn( x, y, columnDataView );
                }
                x += 1;
                if ( x < 256) {
                    recallFunc();
                } else {
                    map.mesh = new THREE.Mesh( map.mapGeometry, new THREE.MeshFaceMaterial({
                        transparent: true,
                    })  );
                    
                    
                    scene.add(map.mesh);
                    
                    GTA.GameObjectLoader(game, data, fileInfo);
                    
                    
                            
                    if (GTA.Debug.startPosition !== undefined && GTA.Debug.enabled) {
                        game.player = new GTA.Player( game, 64 * GTA.Debug.startPosition[ 0 ], -64 * GTA.Debug.startPosition[ 1 ], 64 * GTA.Debug.startPosition[ 2 ]  );
        
                    } else {
            
                        game.player = new GTA.Player( game, 
                            64 * 105, 
                            -64 * 119, 
                            2 * 64  
                            );
    
                        
                    }
        
                    // this.player.position.z += 64;
                    game.scene.add( game.player );
                    
                    
                    game.loaded.call( game );
                    
                    
                }
                
            //  map.mesh = new THREE.Mesh( map.mapGeometry, new THREE.MeshFaceMaterial()  );
            //  this.scene.add(map.mesh);
                
            }, 0);
        }
        
        recallFunc();
        //   this.map.mesh = new THREE.Mesh( this.map.mapGeometry, new THREE.MeshFaceMaterial()  );
        //   this.scene.add(this.map.mesh);
   
       

        
      
        
        //   this.scene.add(this.map.sections[ 7 ][ 6 ]);
        //   this.scene.add(this.map.sections[ 7 ][ 7 ]);
        var i;
        
        for (i in this.mission.commands) {
            
            if (this.mission.commands.hasOwnProperty( i )) {
                this.mission.commands[ i ].create( this );
            }
                 
        }

    //   this.map.mesh.material = material.materials;

        
       
        
     
   

    });


    
};



