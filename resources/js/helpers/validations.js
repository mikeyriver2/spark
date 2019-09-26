/**
 * @var value - actual value
 * @var type - type of numeric validation
 */

export function validateIsNumeric(value, type = null){
    return !isNaN(value);
}


export function validateIsEmail(value, type = null){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}