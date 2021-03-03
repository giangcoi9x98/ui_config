const express = require('express')
const fs = require('fs')
const app = express()
const port = 3005
app.use(express.static('public'))

app.get('/getData', (req, res) => {
  let user = JSON.parse(fs.readFileSync('members/' + req.query.user + ".json"));
  res.send({
      enable: user.enable,
      CONFIG: user.CONFIG
  })
})
app.get('/saveData', function (req, res) {
    let config = JSON.parse(req.query.config)
    let user = JSON.parse(fs.readFileSync('members/' + req.query.user + ".json"));
    user.CONFIG = config;
    user.CONFIG.CLOSE_TARGET = config.CLOSE_TARGET === 'true';
    user.CONFIG.LTAKE_PROFIT = config.LTAKE_PROFIT === 'true';
    user.CONFIG.STAKE_PROFIT = config.STAKE_PROFIT === 'true';
    user.CONFIG.STOPLOSS = config.STOPLOSS === 'true';
    user.enable = (req.query.enable === 'true');
    fs.writeFile('members/' + req.query.user + ".json", JSON.stringify(user, null, 1), (err) => {
        if (err) {
            throw err;
        }
        res.send(true)
    }, (error) => {
        res.send(error)
    });

})
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
