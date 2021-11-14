import {get, post, del, put } from '../utils/request'


const queryBlogList = (data) => get('/articles/list', data)
const queryBlogDetail = (data) => get('/articles/detail', data)
const delBlog = (data) => del('/articles', data)
const modifyBlog = (data) => put('/articles', data)
const addBlog = (data) => post('/articles', data)

export { queryBlogList, queryBlogDetail, delBlog, modifyBlog, addBlog }