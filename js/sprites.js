/* 
 * @author Niklas von Hertzen <niklas at hertzen.com>
 * @created 2.1.2012 
 * @website http://hertzen.com
 */


GTA.Sprite = function ( ) {
    this.deltas = [];
    
};

GTA.Sprite.prototype.loadData = function ( data ) {
    
    
   
    
    this.width = data.getUint8();
    this.height = data.getUint8();
    
    var deltaCount = data.getUint8(),
    i;
    
    data.skip(1); // scaling flag for consoles
    this.size = data.getUint16();
    
    // data.skip(6); // irrelevant CHAR

    this.clut = data.getUint16();
    this.x = data.getUint8();
    this.y = data.getUint8();
    
    

    
    this.page = data.getUint16();
    
    this.y += this.page * 256; // we are drawing the sprite pages vertically
    
    //data.skip(6); 
    
    
    
    for (i = 0; i < deltaCount; i += 1) {
        this.deltas[i] = new GTA.SpriteDelta();
        this.deltas[i].loadData( data );
    }
    

// console.log(this);
    
};



GTA.SpriteDelta = function () {};

GTA.SpriteDelta.prototype.loadData = function ( data ) {
    this.size = data.getUint16();
    this.w = data.getUint32();
};


GTA.SpriteNumbers = function() {
    this.count = {};
    this.offset = {};
};

GTA.SpriteNumbers.prototype.loadData = function ( data ) {
    
    var types = [
    "ARROW",
    "DIGITS",
    "BOAT",
    "BOX",
    "BUS",
    "CAR",
    "OBJECT",
    "PED",
    "SPEEDO",
    "TANK",
    "TRAFFIC_LIGHTS",
    "TRAIN",
    "TRDOORS",
    "BIKE",
    "TRAM",
    "WBUS",
    "WCAR", // wrecked car
    "EX", // explosions
    "TUMCAR",
    "TUMTRUCK",
    "FERRY"
    ], 
    numTypes = types.length,
    i;
    
    
    for ( i = 0; i < numTypes; i += 1 ){
        this.count[ types[ i ] ] = data.getUint16();
        this.offset[ types[ i ] ] = this.offset[types[ i - 1 ]] + this.count[ types [ i - 1 ] ] || 0;
    }
  
    

  
};

GTA.ColorPalette = function ( data, styleInfo ) {
    var palette = [],
    p,
    paletteLength = styleInfo.paletteIndexSize / 2;
    
    data.seek(
        styleInfo.headerSize 
        +  (styleInfo.sideSize + styleInfo.lidSize + styleInfo.auxSize + styleInfo.blockPad) 
        + styleInfo.animSize 
        + styleInfo.clutSizeRounded
        );
      
    for (p = 0;  p < paletteLength; p += 1){
        palette[p] =  data.getUint16() ; // Palette Index; 
    }
    
    return palette;
};


GTA.DrawTiles = function ( ctx, data, styleInfo, palette, xLen, yLen ) {
    
    
    var x,
    y,
    p,
    tileImageData = ctx.createImageData(xLen,  yLen),
    tileData = tileImageData.data,
    clutPages;
    

    
    
    
 
    // load clut
    
    
    
    data.seek(
        styleInfo.headerSize 
        + (styleInfo.sideSize + styleInfo.lidSize + styleInfo.auxSize + styleInfo.blockPad) 
        + styleInfo.animSize
        );
     
    clutPages = GTA.clutLoader( data, styleInfo.tileClutSize )
    
 

  
    data.seek(64);

    // build tile image sprite
    for (y = 0; y < yLen; y += 1) {
        for (x = 0; x < xLen; x += 1) {

            var color = data.getUint8();
            var tileId = Math.floor(((Math.floor(y / 64) * xLen) + x) / 64);
            //    var tileId = 11,
            var clutId = palette[ 4 * ( tileId  ) ];
            //     if (clutData[ clutId ] !== undefined ) {
               
           
            tileData[ (y*xLen*4) + (x*4) ] = clutPages[ Math.floor(clutId/64) ][ clutId % 64 ][ color ] [ 2 ]; // Red
      
            tileData[ (y*xLen*4) + (x*4) + 1] = clutPages[ Math.floor(clutId/64) ][ clutId % 64 ][ color ] [ 1 ]; // Green
       
            tileData[ (y*xLen*4) + (x*4) + 2] = clutPages[ Math.floor(clutId/64) ][ clutId % 64 ][ color ] [ 0 ]; // Blue
            if ( color === 0) {
                tileData[ (y*xLen*4) + (x*4) + 3] = 0;
            } else {
                tileData[ (y*xLen*4) + (x*4) + 3] = 255; // alpha
            }
            
        }
    }
    
   
    
    ctx.putImageData(tileImageData, 0, 0);
    
};




GTA.SpriteAnimation = function ( game, original, sprite ) {
    this.game =  game;
    
       
    this.spriteWidth = game.sprites[ original ].width;
    this.spriteHeight = game.sprites[ original ].height;
    
    this.sprite = sprite;

    
};

GTA.SpriteAnimation.prototype.setSprite = function ( spriteId ) {
    
    
    var newSprite = this.game.sprites[ spriteId ];
    
    this.sprite.geometry.faceVertexUvs[ 0 ][ 0 ] = newSprite.sprite.geometry.faceVertexUvs[ 0 ][ 0 ];
    this.sprite.scale.set( newSprite.width / this.spriteWidth, newSprite.height / this.spriteHeight, 1 );


    this.sprite.geometry.__dirtyUvs = true;
    
};


GTA.DrawSprite = function ( ctx, data, styleInfo, palette, clutTable, height ) {
    
    // var spriteCanvas = document.createElement( 'canvas' );
    
    //spriteCanvas.width = 256;
    
    //var ctx = spriteCanvas.getContext('2d'),
    var spriteImageData,
    spriteData,
    p = 0,
    color,
    width = 256;
    
    //spriteCanvas.height = Math.ceil(styleInfo.spriteGraphicsSize / 256);
    
    data.seek(styleInfo.headerSize + (styleInfo.sideSize + styleInfo.lidSize + styleInfo.auxSize + styleInfo.blockPad) + styleInfo.animSize);
    
    
    var clutPages = GTA.clutLoader( data, styleInfo.spriteClutSize + styleInfo.tileClutSize  );
    
    data.seek(
        styleInfo.headerSize + 
        (styleInfo.sideSize + styleInfo.lidSize + styleInfo.auxSize + styleInfo.blockPad) + 
        styleInfo.animSize + 
        styleInfo.clutSizeRounded + 
        styleInfo.paletteIndexSize + 
        styleInfo.objectInfoSize + 
        styleInfo.carSize +
        styleInfo.spriteInfoSize
    
        );
            
    
    
    var len = styleInfo.spriteGraphicsSize;
    spriteImageData = ctx.createImageData( width,  height ),
    spriteData = spriteImageData.data;
    
    // 45 - 54 
    
    
    var d = 0;
    
    for (p = 0;  p < len; p += 1 ) {
        color = data.getUint8();
         
         
        var tileId = clutTable[ p ];
        var clutId = palette[ tileId + (styleInfo.tileClutSize / 1024) ];
        var clutPage = Math.floor(clutId/64);
         
        // console.log(tileId);
        if (tileId !== undefined) {
            spriteData[ d ] = clutPages[ clutPage ][ clutId % 64 ][ color ] [ 2 ]; // Red
      
            spriteData[ d + 1] = clutPages[ clutPage ][ clutId % 64 ][ color ] [ 1 ]; // Green
       
            spriteData[ d + 2] = clutPages[ clutPage ][ clutId % 64 ][ color ] [ 0 ]; // Blue
        }
    
        
        if (color === 0) {
            spriteData[ d + 3] = 0;
        } else {
            spriteData[ d + 3] = 255; // Alpha
        }
                
        
        d+=4;
    }
    ctx.putImageData(spriteImageData, 0, 0);
  
    

    
};