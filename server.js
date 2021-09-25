require('dotenv').config();

//create koa app
const Koa = require('koa');
const app = new Koa();

if(process.env.NODE_ENV === 'production') {
  app.use(sslify({
    resolver: (ctx) => {
      return ctx.request.header['x-forwarded-proto'] === 'https' || ctx.request.header["x-appengine-cron"];
    } 
  }));
}

//allow cors
const cors = require('koa2-cors');
app.use(cors({
  origin: (ctx) => {
    return ctx.request.header.origin;
  },
  credentials: true
}));

//use bodyParser
const koaBody = require('koa-body');
app.use(koaBody({
  multipart: true,
  formLimit: 15,
  formidable: {
    uploadDir: `${__dirname}/tmp`,
    keepExtensions: true
  }
}));

//define routes
const indexRoutes = require('./routes');

//catches all other routes.
app.use(indexRoutes.routes());

//db connect and app start
const PORT = process.env.PORT || 3001;
module.exports = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
});
