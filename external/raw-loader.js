/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 20.5.2012 
* @website http://hertzen.com
 */

var RAWLoader = (function( d ) {
    
    var methods = {
        load: function( data, width, height, channels, interleaved, header ) {
            var canvas = d.createElement( "canvas" ),
            ctx = canvas.getContext("2d"),
            imgdata = ctx.createImageData( width, height ),
            pxdata = imgdata.data,
            i,
            c,
            p = 0,
            len = data.length;
            
            // set default values
           
            if ( channels <= 0 ) {
                channels = 1;
            }
            
            if ( interleaved !== false) {
                interleaved = true;
            }
            
            if ( header === undefined ) {
                header = 0;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            for ( i = 0; i < len;  ) {
                
                for (c = 0; c < channels; c++, i++ ) {
                    pxdata[ p++ ] = data[ i ];
                }
                if (channels <= 4) {
                    pxdata[ p++ ] = 255;
                } 
             //   p += 4 - channels;
            }
            
            ctx.putImageData( imgdata, 0, 0 );
          
            return canvas;
            
        } 
        
    };
    
    return methods;
    
})( document );
