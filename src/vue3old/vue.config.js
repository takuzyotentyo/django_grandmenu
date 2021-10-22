module.exports = {
  //ここで指定した場所で展開する
  outputDir: '../mysite',
  // build時のベースとなるURL指定
  publicPath: '',
  //outputDir起点でindex.htmlを格納する場所を指定
  indexPath: './templates/grandmenu_spa/index.html',
  //outputDir起点でstaticファイルを格納する場所を指定
  assetsDir: 'static',
  // sassローダーが最初に読みに行くファイルの設定
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/prepends.scss";',
      }
    }
  }
};