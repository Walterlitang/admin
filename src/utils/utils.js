export function getCurrentTime(fields = 's',time=null) {
    const date =time? new Date(time):new Date();
    let str = '';
    let y = date.getFullYear().toString();
    let m = (date.getMonth() + 1).toString();
    m = m.length === 1 ? '0' + m : m
    let d = date.getDate().toString();
    d = d.length === 1 ? '0' + d : d
    let h = date.getHours().toString();
    h = h.length === 1 ? '0' + h : h
    let i = date.getMinutes().toString();
    i = i.length === 1 ? '0' + i : i
    let s = date.getSeconds().toString();
    s = s.length === 1 ? '0' + s : s
    if (fields === 'y') {
        str = y;
    }
    if (fields === 'm') {
        str = y + '-' + m
    }
    if (fields === 'd') {
        str = y + '-' + m + '-' + d
    }
    if (fields === 'h') {
        str = y + '-' + m + '-' + d + ' ' + h
    }
    if (fields === 'i') {
        str = y + '-' + m + '-' + d + ' ' + h + ':' + i
    }
    if (fields === 's') {
        str = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s
    }
    return str;
}
export function utcToTime(utc,fields = 's') {
    const date = new Date(utc);
    let str = '';
    let y = date.getFullYear().toString();
    let m = (date.getMonth() + 1).toString();
    m = m.length === 1 ? '0' + m : m
    let d = date.getDate().toString();
    d = d.length === 1 ? '0' + d : d
    let h = date.getHours().toString();
    h = h.length === 1 ? '0' + h : h
    let i = date.getMinutes().toString();
    i = i.length === 1 ? '0' + i : i
    let s = date.getSeconds().toString();
    s = s.length === 1 ? '0' + s : s
    if (fields === 'y') {
        str = y;
    }
    if (fields === 'm') {
        str = y + '-' + m
    }
    if (fields === 'd') {
        str = y + '-' + m + '-' + d
    }
    if (fields === 'h') {
        str = y + '-' + m + '-' + d + ' ' + h
    }
    if (fields === 'i') {
        str = y + '-' + m + '-' + d + ' ' + h + ':' + i
    }
    if (fields === 's') {
        str = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s
    }
    return str;
}
export function getForm(from,to){
    Object.keys(to).forEach(item=>{
        to[item]=from[item];
    })
}

export function hasChild(data,child='childList',field='hasChild'){
    data.forEach(item=>{
        let text='';
        switch (item.menu_type){
            case 'M':
                text='顶级菜单';
                break;
            case 'C':
                text='次级菜单';
                break;
            case 'A':
                text='操作';
                break;
        }
        item.menu_type_text=text;
        if(item[child]&&item[child].length){
            item[field]=true;
            item[child]=hasChild(item[child]);
        }else{
            item[field]=false
        }
    })
    return data;
}
