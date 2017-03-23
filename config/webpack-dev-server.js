
var devServerConfig = {
        hot : true,
        inline : true,
        publicPath: '/dist',
        proxy : {
            '/test' : {
                target : 'http://localhost:9090',
                secure : false
            }
        }
};


module.exports = devServerConfig;
