define(function(require, exports, module){
    var PopBox = require('./lib/popbox');
    var Alert = require('./lib/alert');
    var Toast = require('./lib/toast');
    var Confirm = require('./lib/confirm');
    var Tmpl = require('template');

    exports.PopBox = PopBox;
    exports.Alert = Alert;
    exports.Toast = Toast;
    exports.Confirm = Confirm;

    // require('text!app/view/popbox/popbox.tmpl');


    var setTemplate = exports.setTemplate = function(list){
        if("popbox" in list){
            PopBox.TEMPLATE = new Tmpl(list.popbox);
        }
        if("alert" in list){
            Alert.TEMPLATE = new Tmpl(list.alert);
        }
        if("confirm" in list){
            Confirm.TEMPLATE = new Tmpl(list.confirm);
        }
        if("toast" in list){
            Toast.TEMPLATE = new Tmpl(list.toast);
        }
    };


    exports.setMobileDefault = function () {
        setTemplate({
            popbox: require('text!./lib/view/m/popbox.tmpl'),
            alert: require('text!./lib/view/m/alert.tmpl'),
            confirm: require('text!./lib/view/m/confirm.tmpl'),
            toast: require('text!./lib/view/m/toast.tmpl')
        })
    }

    exports.setDesktopDefault = function () {
        setTemplate({
            popbox: require('text!./lib/view/pc/popbox.tmpl'),
            alert: require('text!./lib/view/pc/alert.tmpl'),
            confirm: require('text!./lib/view/pc/confirm.tmpl'),
            toast: require('text!./lib/view/pc/toast.tmpl')
        })
    }


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