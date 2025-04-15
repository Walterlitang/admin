import request from "@/utils/request";

/**
 * 单列导出
 * @returns {Promise}
 */
export function exportSingleColumn() {
    return request({
        url: "/export/single-column",
        method: "GET",
        responseType: "blob" // 下载文件需要设置 responseType
    });
}

/**
 * 多列导出
 * @returns {Promise}
 */
export function exportMultiColumn() {
    return request({
        url: "/export/multi-column",
        method: "GET",
        responseType: "blob"
    });
}

/**
 * 行合并导出
 * @returns {Promise}
 */
export function exportRowMerge() {
    return request({
        url: "/export/row-merge",
        method: "GET",
        responseType: "blob"
    });
}

/**
 * 列合并导出
 * @returns {Promise}
 */
export function exportColumnMerge() {
    return request({
        url: "/export/column-merge",
        method: "GET",
        responseType: "blob"
    });
}

/**
 * 列合并导出
 * @returns {Promise}
 */
export function dynamicHead() {
    return request({
        url: "/export/dynamicHead",
        method: "GET",
        responseType: "blob"
    });
}
