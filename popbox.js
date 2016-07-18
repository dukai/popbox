define(function(require, exports, module){
    var Popbox = require('./lib/popbox');
    var Alert = require('./lib/alert');
    var Toast = require('./lib/toast');
    var Confirm = require('./lib/confirm');


    var STATIC_TOAST = null;
    /**
     * toast
     * @param  {string} txt      content to display
     * @param  {int} interval show time by second
     * @return {Toast}          Toast
     */
    exports.toast = function(txt, interval){

        var options = {};
        if(txt){
            options.txt = txt;
        }

        if(interval !== undefined && interval !== null){
            if(interval == 0){
                options.autoHide = false;
            }else{
                options.interval = interval;
            }
        }

        if(STATIC_TOAST == null){
            STATIC_TOAST = new Toast(options);
        }else{
            STATIC_TOAST.initOpitions(options);
            STATIC_TOAST.show();
        }
        return STATIC_TOAST;
    };


    var STATIC_ALERT = null;

    exports.alert = function(txt){
        if(STATIC_ALERT === null){
            STATIC_ALERT = new Alert({
                title: '提醒',
                confirmTxt: '确定',
                confirmCallback: null,
                content: txt,
                autoshow: true
            });
        }else{
            STATIC_ALERT.initOpitions({
                content: txt
            });
        }

        STATIC_ALERT.show();

        return STATIC_ALERT;
    }

});