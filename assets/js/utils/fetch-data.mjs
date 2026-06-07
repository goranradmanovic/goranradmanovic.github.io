export default async function fetchData(url) {
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(res.status)
        return await res.json()
    } catch (err) {
        console.error('Fetch error:', err)
        return []
    }
}