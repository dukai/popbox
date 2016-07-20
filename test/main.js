requirejs.config({
	baseUrl: '/',
  paths: {
    text: 'test/lib/text/text',
    dtools: 'test/lib/dtools/tools-1.0.3.min',
    template: 'test/lib/template/template',
    jquery: 'test/lib/jquery/dist/jquery.min',
    popbox: 'popbox'
  }
});

require(['popbox'], function(popbox){
	popbox.toast('正在加载中...', 3e3);
	popbox.alert('aaa');
});