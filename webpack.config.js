const fs = require('fs');
const path = require('path');
const cors = require('cors');
const selfsigned = require('selfsigned');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


function createHTTPSConfig() {
  // Generate certs for the local webpack-dev-server.
  if (fs.existsSync(path.join(__dirname, 'certs'))) {
    const key = fs.readFileSync(path.join(__dirname, 'certs', 'key.pem'));
    const cert = fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'));

    return { key, cert };
  } else {
    const pems = selfsigned.generate(
      [
        {
          name: 'commonName',
          value: 'localhost'
        }
      ],
      {
        days: 365,
        algorithm: 'sha256',
        extensions: [
          {
            name: 'subjectAltName',
            altNames: [
              {
                type: 2,
                value: 'localhost'
              },
              {
                type: 2,
                value: 'slack.local'
              }
            ]
          }
        ]
      }
    );

    fs.mkdirSync(path.join(__dirname, 'certs'));
    fs.writeFileSync(path.join(__dirname, 'certs', 'cert.pem'), pems.cert);
    fs.writeFileSync(path.join(__dirname, 'certs', 'key.pem'), pems.private);

    return {
      key: pems.private,
      cert: pems.cert
    };
  }
}

module.exports = (env, argv) => ({
    context: __dirname,
    entry: path.resolve(__dirname, 'src', 'custom.scss'),
    output: { filename: 'main.js' },
    devServer: {
        https: createHTTPSConfig(),
        host: '0.0.0.0',
        public: 'slack.local:8080',
        useLocalIp: true,
        writeToDisk: true,
        allowedHosts: ['slack.local'],
        before: function(app) {
            app.use(cors());
            app.head('*', function(req, res, next) {
                if (req.method === 'HEAD') {
                    res.append('Date', new Date().toGMTString());
                    res.send('');
                } else {
                    next();
                }
            });
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'custom.css',
            chunkFilename: 'custom.css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            name: '[path][name].[ext]',
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => [
                                require('autoprefixer'),
                                require('cssnano')
                            ],
                            minimize: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
});
