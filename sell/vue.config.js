const appData = require('./mock/data.json')

module.exports = {
  devServer: {
    port: 4000,
    before (app) {
      app.get('/api/seller', (req, res, next) => {
        res.json(appData.seller)
      })
      app.get('/api/goods', (req, res, next) => {
        res.json(appData.goods)
      })
      app.get('/api/ratings', (req, res, next) => {
        res.json(appData.ratings)
      })
    }
  }
}
