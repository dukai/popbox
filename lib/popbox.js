define(function(require, exports, module){
	var $ = require('jquery');
	var _ = require('dtools');
	var Tmpl = require('template');

	var div = _.$c('div');

	var BASE_Z_INDEX = 900;

	var cover = $('.cover');
	if(cover.length == 0){
		cover = div.cloneNode();
		cover.className = 'cover';
		document.body.appendChild(cover);
		cover = $(cover);
		cover.hide();
	}

	var PopBox = function(options){
		this._initPopBox(options);
	};

	PopBox.prototype = {
		_initPopBox: function(options){
			_.EventEmitter.call(this);
			this.options = _.mix({
				title: '提醒',
				content: '',
				cancelTxt: '取消',
				confirmTxt: '兑换',
				onInit: function(){},
				onRender: function(){},
				template: null,
				customProperties: {},//模板自定义属性
				animateIn: 'zoom-in',//slide-in-up,slide-out-up,slide-in-down,slide-out-down,slide-in-left,slide-out-left,slide-in-right,slide-out-right,zoom-in,zoom-out
				animateOut: 'zoom-out',
				standaloneCover: false,
                autoshow: false 
			}, options);

			this.zindex = BASE_Z_INDEX++;
			BASE_Z_INDEX++;

			this.container = div.cloneNode();
			this.panel = $(this.container);
			this.initStatus = false;
			this.lockScroll = false;

			this.panel.hide();

			if(this.options.standaloneCover){
				this.cover = cover.get(0).cloneNode();
				document.body.appendChild(this.cover);
				this.cover = $(this.cover);
			}else{
				this.cover = cover;
			}

			//初始化模板
			if(this.options.template == null){
				this.options.template = PopBox.TEMPLATE;
			}
			this.container.innerHTML = this.options.template.render(_.mix({
				title: this.options.title,
				content: this.options.content,
				cancelTxt: this.options.cancelTxt,
				confirmTxt: this.options.confirmTxt
			}, this.options.customProperties));

			document.body.appendChild(this.container);
			this.cover.css({zIndex: this.zindex});
			this.panel.find('.popbox').css({zIndex: this.zindex + 1});
			
			this._initEvents();
			this.options.onInit.call(this);

			this.options.autoshow && this.show();
		},
		initOpitions: function(options){
			this.options = _.mix(this.options, options);
		},
		_initEvents: function(){
			var self = this;

			$(this.container).on('click', '.btn-close', function(){
				self.hide();
				self.options.closeCallback && self.options.closeCallback.call(self);
			});

		},

		show: function(options){

			this.showCover();

			if(arguments.length > 0){
				this.options = _.mix(this.options, options);
				this.container.innerHTML = this.options.template.render(_.mix({
					title: this.options.title,
					content: this.options.content,
					cancelTxt: this.options.cancelTxt,
					confirmTxt: this.options.confirmTxt
				}, this.options.customProperties));
				this.panel.find('popbox').css({zIndex: this.zindex});
			}

			this.options.onRender.call(this);

			this.panel.show();

			// add animete
			this.panel.find('.popbox').removeClass(this.options.animateOut).addClass(this.options.animateIn);

			this.lockScroll = true;
			
		},

		hide: function(){

			var self = this;

			this.hideCover();

			// add animate
			if(this.options.animateOut == ''){

				this.panel.hide();
				this.panel.find('.popbox').hide();

			}else{

				this.panel.find('.popbox').removeClass(this.options.animateIn).addClass(this.options.animateOut);

				this.panel.find('.popbox').one('animationend', function(){

					self.panel.hide();

				});
				
			}

			this.lockScroll = false;
		},

		showCover: function(){
			PopBox.SHOW_COVER && this.cover.show();
		},
		hideCover: function(){
			this.cover.hide();
		}
	};

	_.extend(PopBox, _.EventEmitter);


	PopBox.TEMPLATE = new Tmpl(require('text!./view/pc/popbox.tmpl'));
	PopBox.SHOW_COVER = true;

	module.exports = PopBox;

});
