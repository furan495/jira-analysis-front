export async function request(uri, options) {
    const response = await fetch(uri, {
        method: options?.method ?? 'GET',
        body: JSON.stringify(options?.body),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}