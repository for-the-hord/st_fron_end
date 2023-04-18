export const types = {
    1: "管理用户",
    2: "运营用户"
}
export function getTime(item_date) {
    let date = new Date(parseInt(item_date) * 1000);
    let YY = date.getFullYear() + "-";
    let MM =
        (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1) + "-";
    let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    let mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
    let ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return YY + MM + DD + " " + hh + mm + ss;

}


export function getTime_lds(nS) {
    var date = new Date(parseInt(nS) * 1000);
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    if (mon.toString().length == 1) {
        mon = "0" + mon;
    } else {
        mon = mon;
    }
    if (day.toString().length == 1) {
        day = "0" + day;
    } else {
        day = day;
    }
    return year + "-" + mon + "-" + day + " ";
}