# popbox [![Build Status](https://secure.travis-ci.org/dukai/popbox.png?branch=master)](http://travis-ci.org/dukai/popbox)

popbox components.

## Getting Started
Install the module with: `npm install dukai/popbox`

```javascript
var popbox = require('popbox');

var pb = new popbox.PopBox({
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
    });

pb.show();

popbox.confirm('your content', function(){
   //confirm callback
   //TODO: do something
   return true;//auto close 
});


```

## Documentation

### PopBox

options 

````javascript
{
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
}
````

### Confirm

options 

````javascript
{
    title: '确认',
    content: '',
    cancelTxt: '取消',
    confirmTxt: '确定',
    cancelCallback: null,
    confirmCallback: null,
    template: ConfirmBox.TEMPLATE
}
````
### Alert

options 

````javascript
{
    title: '兑换失败，请稍后再试。',
    confirmTxt: '我知道了',
    confirmCallback: null,
    template: AlertBox.TEMPLATE,
    autoshow: true
}
````

### Toast

options 

````javascript
{
    txt: '正在加载...',
    interval: 2000,
    autoHide: true,
    template: Toast.TEMPLATE,
    showLoader: true
}
````

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2016 dukai  
Licensed under the MIT license.
