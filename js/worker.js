/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 4.1.2012 
* @website http://hertzen.com
 */


GTA.Worker = function ( func, params, complete ) {
    
 // console.log(func);
    // Prefixed in Webkit, Chrome 12, and FF6: window.WebKitBlobBuilder, window.MozBlobBuilder
    var bb = new BlobBuilder();
    bb.append("onmessage = " + func.toString());

    // Obtain a blob URL reference to our worker 'file'.
    // Note: window.webkitURL.createObjectURL() in Chrome 10+.
    var blobURL = window.URL.createObjectURL(bb.getBlob());

    var worker = new Worker(blobURL);
    worker.onmessage = function(e) {
        // e.data == 'msg from worker'
        console.log(e);
        complete.call(this, e.data);
    };
    console.log( params );
    worker.postMessage( params ); // Start the worker.

    
};