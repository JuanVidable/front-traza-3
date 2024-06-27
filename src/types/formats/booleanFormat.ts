

const formatBoolean = (value: boolean): string => {
    var res: string = "NO";
    if(value) res = "SI";
    return res;
}

export default formatBoolean;