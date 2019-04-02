import fetch from 'utils/fetch';
/*与后端服务对接的接口*/
export function page(query) {
return fetch({
url: '/api/admin/baseDict/page',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/admin/baseDict',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/admin/baseDict/' + id,
method: 'get'
})
}

export function delObj(id) {
return fetch({
url: '/api/admin/baseDict/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/admin/baseDict/' + id,
method: 'put',
data: obj
})
}
