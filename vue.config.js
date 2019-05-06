module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api/v1/web/': {
        target: 'http://bc.shequ1024.club'
      }
    }
  }
}
