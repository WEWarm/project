var validateRegExp={
	decmal:"^([+-]?)\\d*\\.\\d+$",	//浮点数
	decmal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",	//正浮点数
	decmal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",	//负浮点数
	decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",	//浮点数
	decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",	//非负浮点数（正浮点数 + 0）
	decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",	//非正浮点数（负浮点数 + 0）
	intege: "^-?[1-9]\\d*$",	//整数
	intege1: "^[1-9]\\d*$",	//正整数
	intege2: "^-[1-9]\\d*$",	//负整数
	num: "^([+-]?)\\d*\\.?\\d+$",	//数字
	num1: "^[1-9]\\d*|0$",	//正数（正整数 + 0）e
	num2: "^-[1-9]\\d*|0$",	//负数（负整数 + 0）		
	ascii: "^[\\x00-\\xFF]+$",	//仅ACSII字符
	chinese: "^[\\u4e00-\\u9fa5]+$",	//仅中文
	date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",	//日期
	email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",
	idcard: "^[1-9]([0-9]{14}|[0-9]{17})$",	
	mobile: "^0?(13|14|17|15|18)[0-9]{9}$",	//手机
	notempty: "^\\S+$",	//非空
	password: "^[A-Za-z0-9_-]+$",	//密码
	picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",	//图片
	qq: "^[1-9]*[1-9][0-9]*$",	
	tel: "^[0-9\-()（）]{7,18}$",	
	url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//url
	username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$",	
	zipcode: "^\\d{6}$",	
	realname:"^[A-Za-z0-9\\u4e00-\\u9fa5]+$",
	date_time:"^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))$",
	address:"[\u4E00-\u9FA5]{10,}$",//最少10位中文
	
	Phone :"((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)",//区号3-4位，电话号码7-8位，只能包含”(“、“）”、“-”和数字 
	
	activityCode:"[^0-9a-zA-Z]" //包含MKT活动代码只能输入数字和字母
};

var validateRules={
	isNull:function(str){
		return (str==""||typeof str!="string");
	},
	betweenLength:function(str,_min,_max){
		return (str.length>=_min && str.length<=_max);
	},
	isUserid:function(str){
		return new RegExp(validateRegExp.username).test(str);
	},
	isPwd:function(str){
		return new RegExp(validateRegExp.password).test(str);
	},
	isPwd2:function(str1,str2){
		return (str1==str2);
	},
	isEmail:function(str){
		return new RegExp(validateRegExp.email).test(str);
	},
	isTel:function(str){
		return new RegExp(validateRegExp.tel).test(str);
	},
	isMobile:function(str){
		return new RegExp(validateRegExp.mobile).test(str);
	},
	checkType:function(element){
		return (element.attr("type")=="checkbox"||element.attr("type")=="radio"||element.attr("rel")=="select");
	},
	isChinese:function(str){
		return new RegExp(validateRegExp.chinese).test(str);
	},
	isRealName:function(str){
		return new RegExp(validateRegExp.realname).test(str);
	},
	isZipCode:function(str){
		return new RegExp(validateRegExp.zipcode).test(str);
	},
	isDate:function(str){
	    if (str.length < 8)
		    return false;

	    var year = str.substr(0,4);
	    var month = str.substr(4,2);
	    var day = str.substr(6,2);

	    if(!parseInt(month,10))
		    return false;

	    var date = new Date(Date.parse(year + "/" + month + "/" + day));
	    return (typeof(date) == "object" && year == date.getFullYear() && month == date.getMonth() + 1 && day == date.getDate());
	},
	
    isDateTime:function(str){
        return new RegExp(validateRegExp.date_time).test(str);
    },	
    isAddress:function(str){
        return new RegExp(validateRegExp.address).test(str);
    },	
    isMatch:function(pattern,value){
        return new RegExp(pattern,"gi").test(value);
    },
    
    isPhone:function(str){
		return new RegExp(validateRegExp.Phone).test(str);
	}
};
var validateOptions = {};
var validateSetting = {
    empty: {
        text_css: '',
        info_css: 'tipsBox tipsErr'
    },
    error: {
        text_css: '',
        info_css: 'tipsBox tipsErr'
    },
    success: {
        text_css: 'textOk',
        info_css: ''
    },
    focus: {
        text_css: '',
        info_css: 'tipsBox'
    }
};

(function($) {
    $.fn.bindForm = function(option) {
    };
    $.fn.validate = function(option, callback) {
        //option = $( { } , option || {} );
        var element = this;
        var id = element.attr('id');
        var type = element.attr('type');
        var rel = element.attr('rel');
        var rule = validateOptions[id];
        if (rule) {
            if (!element.attr('defClass'))
                element.attr('defClass', element.attr('class'));
            var value = $.trim(getInputValue(element));
            
            if (rule.filterValue && jQuery.isFunction(rule.filterValue))
                value = rule.filterValue(value);

            var defValue = $.trim(element.attr('defValue'));
            if (value == defValue)
                value = '';

            if (rule.require && value.length == 0) {
                element.attr('state', 'empty');
                showMessageBox(element, value, rule, rule.tips.empty || '', 'empty');
                return false;
            }

            if (value.length > 0 && rule.datatype && !rule.datatype(value)) {
                element.attr('state', 'error');
                showMessageBox(element, value, rule, rule.tips.error || '', 'error');
                return false;
            }

            if (value.length > 0 && rule.pattern) {
                var re = new RegExp(rule.pattern, "gi");
                if (!re.test(value)) {
                    element.attr('state', 'error');
                    showMessageBox(element, value, rule, rule.tips.error || '', 'error');
                    return false;
                }
            }
            if (value.length > 0) {
                element.attr('state', 'success');
                showMessageBox(element, value, rule, rule.tips.success || '', 'success');
            }
            return true;
        }
        //        element.bind('focus',function(){
        //            alert(1);
        //            showMessageBox(obj, message_container,  '','focus');
        //        });
    }
})(jQuery);
function validate_focus(obj) {
    var element = $(obj);
    var id = element.attr('id');
    var value = element.val();

    
    var rule = validateOptions[id];
    if (rule) {
        if (!element.attr('defClass'))        
            element.attr('defClass', element.attr('class'));
        showMessageBox(element, value, rule, rule.tips.focus || '', 'focus');
    }
}
function getInputValue(element){
    return element.filter(function(){
                    return (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password|search/i.test(this.type));
                })
           .map(function(i, elem){
                    var val = jQuery(this).val();
                    return val == null ? null :
                    jQuery.isArray(val) ?
                        jQuery.map( val, function(val, i){
                            return val;
                        }) :
                        val;
                  }).get();
                      
}
function showMessageBox(element,value, rule, msg, state) {
    var id = element.attr('id');
    var type = element.attr('type');
    var rel = element.attr('rel');
    var message_container = rule.container || id + "_info";
    var setting = validateSetting[state];
    switch (element.get(0).tagName.toLowerCase()) {
        case "select":
            showMessageTips(element, message_container, setting.info_css, msg ,state);
            break;
        case "input":
            switch (type) {
                case "checkbox":
                case "radio":
                    showMessageTips(element, message_container, setting.info_css, msg, state);
                    break;
                case "text":
                case "password":
                    element.removeClass().addClass(element.attr('defClass'));

                    if (!rule.c || (rule.c && value.length > 0)) {
                        element.addClass(setting.text_css)
                    } else {
                        setting.text_css || element.removeClass(setting.text_css)
                    }
                    showMessageTips(element, message_container, setting.info_css, msg, state);
                    break;
            }
            break;
            
    }
 }function getMessageBox(){}function showMessageTips(element,messageId,className,msg ,state){          
    var validateControlId = $(element).attr('id') || $(element).attr('name');
    var info = $("#" + messageId);
    
    if (info.size() < 1)
    {
       info = $("<span />").attr('id',messageId).attr('validateControlId',validateControlId);
       $(element).after(info);    }
    else{
        if ( typeof($(info).attr('validateControlId')) != "undefined" && $(info).attr('validateControlId') != validateControlId){
            return;
        }
    }
    info.attr('class',className);
    if (state != 'success'){
        $(info).attr('validateControlId',validateControlId);
    }
    else{
        $(info).removeAttr('validateControlId');
    }
    info.html(msg);
    info.css('display',msg ? "" : "none");
}