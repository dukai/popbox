requirejs.config({
	baseUrl: '/test',
  paths: {
    text: './lib/text/text',
    dtools: './lib/dtools/tools-1.0.3.min',
    template: './lib/template/template',
    jquery: './lib/jquery/dist/jquery.min',
    popbox: '../popbox.min'
  }
});

require(['popbox'], function(popbox){
	popbox.toast('正在加载中...', 3e3);
	popbox.alert('aaa');
});