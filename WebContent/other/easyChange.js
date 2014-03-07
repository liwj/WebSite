// JavaScript Document
/*
 * 将一个字符串转码后转出<br/>
 * 转码后是一系列的数字和字符
 */
function _join(str) {
	var array = str.split("");// 拆分字符串
	/*
	 * 获取随机字母
	 */
	var getRandom = function() {
		var num = parseInt(Math.random() * 2);
		var temp = num == 1 ? 'a' : 'A';
		return String.fromCharCode(parseInt(Math.random() * 26)
				+ temp.charCodeAt(0));
	};
	/*
	 * 转换字母的Unicode码
	 */
	var toUnicode = function(i) {
		return i.charCodeAt(0);
	};
	/*
	 * 循环数组,转换字符为数字和字符组合方式
	 */
	var returnStr = "";
	for (var i = 0; i < array.length; i++) {
		var r = getRandom();
		returnStr += (toUnicode(array[i]) ^ toUnicode(r)) + r;
	}
	return returnStr;
}

/*
 * 还原字符串
 */
function _out(str) {
	var res = "";// 返回的字符串
	var array = str.split("");// 拆分数组
	/*
	 * 判断是否是一个数字
	 */
	var judge = function(i) {
		return !isNaN(parseInt(i));
	};
	/*
	 * 转换编码
	 */
	var change = function(_number, _char) {
		var _num = parseInt(_number);
		var _str = _char.charCodeAt(0);
		return String.fromCharCode(_str ^ _num);
	};

	var _number = "";// 拆分的数字部分
	var _char = "";// 拆分的字符部分
	/*
	 * 循环数组，调用转换方法，还原字符串
	 */
	for (var i = 0; i < array.length; i++) {
		if (judge(array[i]))
			_number += array[i];
		else {
			if (_number.length != 0) {
				_char = array[i];
				res += change(_number, _char);// 调用转码方法
			}
			_number = "";// 清空数字部分
			_char = "";// 清空字符部分
		}
	}
	return res;
}