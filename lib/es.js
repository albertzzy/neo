/* 
    path
    response
*/
const Readable = require('stream').Readable;

class esStream extends Readable{
    constructor(source,...args){
        super(args);
        this.source = source;
    }

    _read(){
        setInterval( () => {
            this.push(this.source);
        },2000)

    }

}




module.exports = (options={}) => {
    if(typeof options.path === 'undefined'){
        throw new Error('path should be specified.');
    }
    let path = options.path;

    return (ctx,next) => {
        if(ctx.path === path){
            ctx.type = 'text/event-stream';
            ctx.body = new esStream("es:hello \n\n")
        }else{
            await next();
        }

    }

}