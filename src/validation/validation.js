let validation = {};

validation.checkPhone = (phone) => {
    let pattern = /^1[34578]\d{9}$/;
    if (!phone) {
        return '请输入手机号码！';
    } else if (!pattern.test(phone)) {
        return '手机号码有误！';
    } else {
        return false;
    }
}
validation.checkIdCard = (idcard) => {
    let pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!idcard) {
        return '请输入身份证号！';
    } else if (!pattern.test(idcard)) {
        return '身份证号码有误！';
    } else {
        return false;
    }
}

validation.checkMaxNum = (val, name) => {
    let pattern = /^[1-9]\d{0,7}$/;
    if (!val) {
        return '请输入' + name + '数量'
    } else if (!pattern.test(val)) {
        return name + '需为8位以内正整数'
    } else {
        return false;
    }
}
validation.checkPrice = (val, name) => {
    let pattern = /^[1-9]\d{0,6}([.][0-9]{1}){0,1}$/;
    if (!val) {
        return '请输入' + name
    } else if (!pattern.test(val)) {
        return name + '格式不对'
    } else {
        return false
    }
}
validation.checkLook = (look) => {
    //let pattern = /[\ud83c\udc00-\ud83c\udfff]|[\ud83d\udc00-\ud83d\udfff]|[\u2600-\u27ff]/
    let pattern = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
    if (pattern.test(look)) {
        return '不可以输入表情'
    } else {
        return false
    }
}
validation.checkMinNumber = (password) => {
    let pattern = /^[a-zA-Z0-9]{6,16}$/
    if (!pattern.test(password)) {
        return '密码必须为6~16位数字或字母'
    } else {
        return false
    }
}


validation.checkPhoneTrue = (phone) => {
    let pattern = /^1[34578]\d{9}$/;
    if (!pattern.test(phone) || phone == '') {
        return '手机号码有误'
    } else {
        return false;
    }
}
validation.checkNameTrue = (name) => {
    let pattern = /^[A-Za-z\u4e00-\u9fa5]+$/;
    if (!pattern.test(name) || name == '') {
        return '姓名请输入汉字或字母！'
    } else {
        return false;
    }
}
validation.checkCode = (code, confirmCode) => {
    console.log(code)
    console.log(confirmCode)
    if (!code) {
        return '请输入验证码！';
    } else if (code != confirmCode) {
        return '验证码有误！';
    } else {
        return false;
    }
}

validation.checkNull = (param, show) => {
    if (!param) {
        return show;
    } else {
        return false;
    }
}

validation.checkCommon = (newName, oldName) => {
    if (newName !== oldName) {
        return '新密码不一致'
    } else {
        return false;
    }
}
validation.checkNumber = (value) => {
    if (parseInt(value)) {
        return true
    } else {
        return false
    }
}
validation.checkSoleNum = (value) =>{
    let pattern = /^[0-9]*[1-9][0-9]*$/;
    if (!pattern.test(value) || value == '') {
        return '输入数量有误！'
    }
}
validation.checkNums = (value, max) => {
    let pattern = /^[0-9]*[1-9][0-9]*$/;
    if (!pattern.test(value) || value == '') {
        return '输入数量有误！'
    } else {
        if (value > max) {
            return '数量超出库存！'
        }
    }
}
validation.checkDifferent = (newName, oldName) => {
    if (newName == oldName) {
        return '与原密码不能相同'
    } else {
        return false;
    }
}
validation.checkArr = (arr) => {
    //console.log(arr.length)
    for (var i = 0; i < arr.length; i++) {
        if (!arr[i]) {
            return '照片上传不完整！'
        }
    }
}
module.exports = validation;
