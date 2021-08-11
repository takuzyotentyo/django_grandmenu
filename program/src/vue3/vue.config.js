module.exports = {
  //ここで指定した場所で展開する
  outputDir: '../mysite/groundmenu_spa',
  // build時のベースとなるURL指定
  publicPath: '',
  //outputDir起点でindex.htmlを格納する場所を指定
  indexPath: './templates/index.html',
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