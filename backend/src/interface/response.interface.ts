/*
 * @Author: along 
 * @Date: 2021-11-03 01:15:41 
 * @Last Modified by: along
 * @Last Modified time: 2021-11-16 23:13:04
 * @description 返回报文格式
 */
export interface IResponse {
    code: number,
    errMsg?: any,
    data?: any
}