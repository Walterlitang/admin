export function createParams(content,params){
    Object.keys(params).forEach(item=>{
        content[item]=params[item]
    })
}
//处理多选数组
export function multipleChoiceChange(arr, value, max = -1) {
    if (!arr.includes(value)) {
        if (max == -1 || arr.length < max) {
            arr.push(value)
        } else {
            this.$message.success('最多只能选择${max}个')
        }
    } else {
        const index = arr.indexOf(value)
        arr.splice(index, 1)
    }
    return arr;
}
//处理多选对象
export function multipleChoiceChangeObj(targetName, value, vm, max = -1){
    const data=vm[targetName]
    if(!data[value.id]){
        if (max == -1 || Object.keys(data).length < max) {
            vm.$set(vm[targetName],value.id,value)
        } else {
            this.$message.success('最多只能选择${max}个')
        }
    }else{
        vm.$delete(vm[targetName],value.id)
    }
}
export default {
    createParams,
}
export function getCurrentTime(fields = 's', time = null) {
    const date = time ? new Date(time) : new Date()
    let str = ''
    let y = date.getFullYear().toString()
    let m = (date.getMonth() + 1).toString()
    m = m.length == 1 ? '0' + m : m
    let d = date.getDate().toString()
    d = d.length == 1 ? '0' + d : d
    let h = date.getHours().toString()
    h = h.length == 1 ? '0' + h : h
    let i = date.getMinutes().toString()
    i = i.length == 1 ? '0' + i : i
    let s = date.getSeconds().toString()
    s = s.length == 1 ? '0' + s : s
    if (fields == 'y') {
        str = y
    }
    if (fields == 'm') {
        str = y + '-' + m
    }
    if (fields == 'd') {
        str = y + '-' + m + '-' + d
    }
    if (fields == 'h') {
        str = y + '-' + m + '-' + d + ' ' + h
    }
    if (fields == 'i') {
        str = y + '-' + m + '-' + d + ' ' + h + ':' + i
    }
    if (fields == 's') {
        str = y + '_' + m + '_' + d + '_' + h + i + s
    }
    return str
}