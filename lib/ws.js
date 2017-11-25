const Socketio = require('socket.io');
/* 
    path
    serveClient
    emitdata
*/

module.exports = (server,options={}) => {
    let io = Socketio(server);


    if(typeof options.path !== 'undefined'){
        io.path(options.path);    
    }else{
        
    }
    
    io.serveClient(options.serveClient);

    return (ctx,next) => {
        if(ctx.path !== options.path){
            await next();
        }else{
            io.on('connection',(socket)=>{
                socket.broadcast.emit('ws:emit',options.emitdata);
                
                socket.on('disconnect',(reason)=>{
                    
                })
            })
        }    

    }

}