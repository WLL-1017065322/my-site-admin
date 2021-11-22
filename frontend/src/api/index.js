import {get, post, del, put } from '../utils/request'


const queryBlogList = (data) => get('/articles/list', data)
const queryBlogDetail = (data) => get('/articles/detail', data)
const delBlog = (data) => del('/articles', data)
const modifyBlog = (data) => put('/articles', data)
const addBlog = (data) => post('/articles', data)


const queryUserList = (data) => get('/users/list', data)
const queryUserDetail = (data) => get('/users/detail', data)
const delUser = (data) => del('/users', data)
const modifyUser = (data) => put('/users', data)
const addUser = (data) => post('/users', data)




const login = (data) => post('/auth/login', data)


export { queryBlogList, queryBlogDetail, delBlog, modifyBlog, addBlog, login }