let path = require('path');
let root_dir = path.resolve(__dirname);

module.exports = {
    entry:"./src/main.js",
    output: {
        path: path.resolve(root_dir, 'build/assets'),
        filename: "bcx.min.js",
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["env", {
                                targets: {
                                    node: "6.10",
                                    browsers: ["> 1%", "last 4 versions"]
                                }
                            }]
                        ],
                        plugins:["transform-runtime", "babel-plugin-transform-regenerator", "transform-object-rest-spread"]
                    }
                }
            }
        ]
    },
    mode:"production",
    optimization: {
        minimize: true
    }
};
