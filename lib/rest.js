/* 
    path
    response
*/

module.exports = (options={}) => {
    if(typeof options.path === 'undefined'){
        throw new Error('path should be specified.');
    }
    let path = options.path;

    return (ctx,next) => {
        if(ctx.path === path){
            ctx.body = options.response;
        }else{
            await next();
        }
    }

}