const path = require('path');
const express = require('express');
const exec = require('child_process').exec;
// サーバをインスタンス化する 
const app = express();

// 以下の設定だけで dist/index.html も返せてはいる
app.use(express.static(`${__dirname}/dist`));

// ルートへのアクセス時は念のため dist/index.html を確実に返すようにしておく
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.post('/assets/dummy.js',function (req, res, next) {
// app.use(function (req, res, next) {
  console.log('postest:', Date.now());
  console.log('postest_:', require('child_process'));
  exec("C:/WINDOWS/system32/notepad.exe C:/work/test.txt");
  next() 
});

// サーバ起動
const server = app.listen(process.env.PORT || 8080, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Listening at http://${host}:${port}`);
});

