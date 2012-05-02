/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 4.1.2012 
* @website http://hertzen.com
 */


GTA.FileSystem = function ( game ) {
     
     this.filesystem = null;
     
     var props = this;
     
     
    window.requestFileSystem(window.TEMPORARY, 10*1024*1024 /*10MB*/, function( fs ) {
        props.filesystem = fs;
        GTA.loader.call( game );
        
    }, function() {
        game.supports.FileSystem = false;
        GTA.loader.call( game );
    });
    
   
   
    
};