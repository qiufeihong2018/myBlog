
export default function getName(data) {
    return request({
      url: '/api-get-my-service/v1/get-my-name',
      method: 'get',
      params: data
    })
  }