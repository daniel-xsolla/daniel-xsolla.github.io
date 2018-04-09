//공통메시지에 정의된 메시지를 리턴
function getMsg(msgId, paramArray) {
    return new coMessage().getMsg(msgId, paramArray);
}
//메시지를 관리하는 객체
function coMessage() {
    this.getMsg = coMessage_getMsg;
}
//공통메시지에 정의된 메시지를 치환하여 리턴
function coMessage_getMsg(message, paramArray) {
    if (isNull(message.trim())) {
        return null;
    }
    var index = 0;
    var re = /@/g;
    var count = 0;
    if (paramArray == null) {
        return message;
    }
    while ((index = message.indexOf("@", index)) != -1) {
        if (paramArray[count] == null) {
            paramArray[count] = "";
        }
        message = message.substr(0, index) + String(paramArray[count]) + message.substring(index + 1);
        index = index + String(paramArray[count++]).length;
    }
    return message;
}
//null체크
function isNull(argValue) {
    if (argValue == null || (typeof (argValue) == "string" && argValue.trim() == "")) {
        return true;
    }
    return false;
}
//공백제거
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s$)/g, "");
}