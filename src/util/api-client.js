export function client(endpoint, { body, baseUrl, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const url = baseUrl ? `${baseUrl}${endpoint}` : `${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`;

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: { ...headers, ...customConfig.headers },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(url, config).then(async response => {
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      const error = new Error('An error occurred while fetching data.');
      error.info = data;
      error.status = response.status;

      return Promise.reject(data);
    }
  });
}
