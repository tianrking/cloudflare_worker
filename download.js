addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // 檢查請求 URL 路徑是否以 "/proxy/" 開頭
  if (url.pathname.startsWith("/proxy/")) {
    // 從請求路徑中提取實際的 URL 進行下載
    const targetUrl = url.pathname.replace("/proxy/", "http://")

    try {
      // 從目標 URL 獲取內容
      const response = await fetch(targetUrl, {
        method: 'GET', // 強制使用 GET 方法進行下載
      })

      // 檢查響應是否正常
      if (!response.ok) {
        return new Response('Error fetching the content', { status: response.status })
      }

      // 將獲取的內容作為可下載文件返回
      const headers = new Headers(response.headers)
      headers.set('Content-Disposition', 'attachment')
      return new Response(response.body, { headers })
    } catch (error) {
      // 處理在獲取過程中出現的任何錯誤
      return new Response('Error fetching the content: ' + error.message, { status: 500 })
    }
  }

  // 如果路徑不是以 "/proxy/" 開頭，則返回一個簡單的信息
  return new Response("Cloudflare Worker Proxy", { status: 200 })
}
