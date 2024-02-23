import Configuration from '@/app.config.js';

import { useAuthStore } from '../stores/auth.store.js';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
}

function request(method) {
  return (url, body, contentType = 'application/json') => {
    const requestOptions = {
      method,
      headers: authHeader(url)
    }

    if (body) {
      if (contentType == 'application/json') {
        requestOptions.headers['Content-Type'] = 'application/json'
        requestOptions.body = JSON.stringify(body)
      } else {
        requestOptions.headers['Content-Type'] = contentType
        requestOptions.body = body
      }
    }

    return fetch(url, requestOptions).then(handleResponse)
  }
}

function authHeader(url) {
  const { user } = useAuthStore()
  const isLoggedIn = !!user?.access_token
  const isApiUrl = url.startsWith(Configuration.value('baseURL'))
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.access_token}` }
  } else {
    return {}
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)

    if (!response.ok) {
      const { user, logout } = useAuthStore()
      if ([401, 403].includes(response.status) && user) {
        logout()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
