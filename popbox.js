define(function(require, exports, module){
    var PopBox = require('./lib/popbox');
    var Alert = require('./lib/alert');
    var Toast = require('./lib/toast');
    var Confirm = require('./lib/confirm');

    exports.PopBox = PopBox;
    exports.Alert = Alert;
    exports.Toast = Toast;
    exports.Confirm = Confirm;

    // require('text!app/view/popbox/popbox.tmpl');


    exports.setTemplate = function(list){
        if("popbox" in list){
            PopBox.TEMPLATE = list.popbox;
        }
    };


    var STATIC_TOAST = null;
    /**
     * toast
     * @param  {string} txt  要显示的内容
     * @param  {int} interval  可选项，为0或者不选时toast将不会自动消失
     * @return {Toast}          Toast
     */
    exports.toast = function(txt, interval){

        var options = {};
        if(txt){
            options.txt = txt;
        }

        if(arguments.length  == 1){
            interval = 0;
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
    /**
     * 模态框
     * @param  {string} txt 要显示的内容
     * @return {AlertBox}     AlertBox
     */
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