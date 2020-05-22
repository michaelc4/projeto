export function getParsedDate(date) {
    if (date == null || date == undefined) {
        date = new Date();
    }

    var dd = date.getDate();
    var mm = date.getMonth() + 1;

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let dateStr = dd + "/" + mm + "/" + yyyy;
    return dateStr.toString();
}

export function getParsedDateJson(date) {
    if (date == null || date == undefined) {
        date = new Date();
    }

    var dd = date.getDate();
    var mm = date.getMonth() + 1;

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let dateStr = yyyy + '-' + mm + "-" + dd;
    return dateStr.toString();
}

export function numberToString(number) {
    if (number == null || number == undefined || number == 0) {
        return "";
    }
    return "" + number.toString();
}