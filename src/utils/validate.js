import Vue from "vue";

export function validate(form, rules) {
	let res = true;
	try {
		Object.keys(form).forEach((keyName) => {
			if(rules[keyName]){
				if (rules[keyName].required) {
					const value = form[keyName];
					if (!value || (typeof value == "string" && value.trim().length === 0) || (typeof value =="number" && value === 0)|| (typeof value =="object" && Object.keys(value).length === 0)) {
						Vue.prototype.$message.error(`${rules[keyName].name}不能为空！`);
						throw Error();
					}
				}
				if (rules[keyName].validator) {
					rules[keyName].validator(form[keyName],form, function(msg = '') {
						if (msg.trim().length > 0) {
							Vue.prototype.$message.error(msg);
							throw Error();
						}
					})
				}
			}
		})
	} catch (e) {
		res = false;
	}
	return res;
}
