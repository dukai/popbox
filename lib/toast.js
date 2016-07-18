define(function(require, exports, module){

	var tools = require('dtools');
	var Tmpl = require('template');

	var tmpl = new Tmpl(require('text!./view/toast.tmpl'));

	var div = document.createElement('div');

	var Toast = function(options){
		this._initToast(options);
	};

	Toast.prototype = {
		_initToast: function(options){
			this.options = tools.mix({
				txt: '正在加载...',
				interval: 2000,
				autoHide: true
			}, options);

			this.container = div.cloneNode();
			this.timer = null;
			this.initStatus = false;

			document.body.appendChild(this.container);
			this.show();
		},

		hide: function(){
			this.container.style.display = 'none';
			clearTimeout(self.timer);
		},

		show: function(txt){
			var self = this;
			if(this.initStatus){
				if(txt){
					this.container.innerHTML = tmpl.render({
						text: txt
					});
				}
				this.container.style.display = 'block';
			}else{
				this.initStatus = true;
				this.container.innerHTML = tmpl.render({
					text: this.options.txt
				});
			}
			if(this.options.autoHide){
				this.timer = setTimeout(function(){
					self.hide();
					self.timer = null;
				}, this.options.interval);

			}
		}
	};


	


	module.exports = Toast;
});