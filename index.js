const app = require('./src/app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Express app for airports is listening on port ' + port);
});
