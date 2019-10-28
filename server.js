const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();
const PORT = process.env.PORT || 1234;

app.use(serve('./dist'));
app.listen(PORT, () => console.log('\x1b[33m%s\x1b[0m', `App running on http://localhost:${PORT}`));
