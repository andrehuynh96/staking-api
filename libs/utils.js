class Utils {

	static hex_to_ascii(str1){
		var hex  = str1.toString();
		var str = '';
		for (var n = 0; n < hex.length; n += 2) {
			str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
		}
		return str;
	}

	static ascii_to_hex(str){
		var arr1 = [];
		for (var n = 0, l = str.length; n < l; n ++) {
			var hex = Number(str.charCodeAt(n)).toString(16);
			arr1.push(hex);
		}
		return arr1.join('');
	}
	
	static searchObj(nameKey, myArray){
		for (var i=0; i < myArray.length; i++) {
				if (myArray[i].key === nameKey) {
						return myArray[i];
				}
		}
	}

	static pad_with_zeroes(number, length) {
		var my_string = '' + number;
		while (my_string.length < length) {
				my_string = '0' + my_string;
		}
		return my_string;
	}

	static isEmpty(obj) {
		for(var key in obj) {
				if(obj.hasOwnProperty(key))
						return false;
		}
		return true;
	}
}

module.exports = Utils;