requirejs.config({
	baseUrl: '/',
  paths: {
    text: 'test/lib/text/text',
    dtools: 'test/lib/dtools/tools-1.0.3.min',
    template: 'test/lib/template/template',
    jquery: 'test/lib/jquery/dist/jquery.min',
    popbox: 'popbox-0.1.0.min'
  }
});

require(['popbox'], function(popbox){
	// popbox.toast('正在加载中...', 3e3);

  popbox.confirm("test", function(){
    popbox.alert('aaa', function(){
      popbox.toast('<i class="ico ico-success"></i>正在加载中...', 3e3, function(){
        popbox.alert('加载完成', function(){
          popbox.toast('<i class="ico ico-success"></i>真的是加载完成了').hideLoader();
          setTimeout(function(){
            popbox.toast().hide();
          }, 20e3);
        });
      });
    });
  });
});