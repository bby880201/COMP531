// import fetch from 'isomorphic-fetch'
// this fetch is for test use
// import fetch, { mock } from 'mock-fetch'


// handle all server endpoints access
// default server url is the dummy server
// const url = 'https://webdev-dummy.herokuapp.com'
const url = 'http://localhost:3000'

const resource = (method, endpoint, payload) => {
	const options =  {
		method,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	}
	if (payload) options.body = JSON.stringify(payload)

	return fetch(`${url}/${endpoint}`, options)
		.then(r => {
			if (r.status === 200) {
				if (r.headers.get('Content-Type').indexOf('json') > 0) {
					return r.json()
				} else {
					return r.text()
				}
			} else {
			// useful for debugging, but remove in production
			console.dir(r)
			console.error(`${method} ${endpoint} ${r.statusText}`)
			const msg = r.body.error || r.statusText
			throw new Error(msg)
		}
	})
}

// resource only for img payload
const resourceForImg = (method, endpoint, payload) => {
	const options =  {
		method,
		credentials: 'include',
		body: payload
	}

	return fetch(`${url}/${endpoint}`, options)
		.then(r => {
			if (r.status === 200) {
				if (r.headers.get('Content-Type').indexOf('json') > 0) {
					return r.json()
				} else {
					return r.text()
				}
			} else {
			// useful for debugging, but remove in production
			console.dir(r)
			console.error(`${method} ${endpoint} ${r.statusText}`)
			const msg = r.body.error || r.statusText
			throw new Error(msg)
		}
	})
}

export {url, resource, resourceForImg}