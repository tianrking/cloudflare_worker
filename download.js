addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// 函數用於將 MIME 類型映射到文件擴展名
function getExtensionFromMimeType(mimeType) {
  const mimeMap = {
    'application/pdf': '.pdf',
    'application/zip': '.zip',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'text/plain': '.txt',
    'text/html': '.html',
    // 根據需要添加更多映射
  }
  return mimeMap[mimeType] || ''
}

// 處理和校正不同的 URL 方案
function correctUrlScheme(urlStr) {
  if (urlStr.startsWith('http://') || urlStr.startsWith('https://') || urlStr.startsWith('ftp://')) {
    return urlStr;
  }
  return 'https://' + urlStr;
}

async function handleRequest(request) {
  const url = new URL(request.url)

  // 檢查請求 URL 路徑是否以 "/proxy/" 開頭
  if (url.pathname.startsWith("/proxy/")) {
    // 從請求路徑中提取實際的 URL 進行下載
    let targetUrl = url.pathname.replace("/proxy/", "")
    targetUrl = correctUrlScheme(targetUrl)

    try {
      // 從目標 URL 獲取內容
      const response = await fetch(targetUrl, {
        method: 'GET', // 強制使用 GET 方法進行下載
      })

      // 檢查響應是否正常
      if (!response.ok) {
        return new Response('Error fetching the content', { status: response.status })
      }

      // 從響應中獲取 MIME 類型
      const contentType = response.headers.get('content-type')
      // 根據 MIME 類型確定文件擴展名
      const extension = getExtensionFromMimeType(contentType)

      // 為下載設置適當擴展名的文件名
      const headers = new Headers(response.headers)
      const disposition = 'attachment; filename="download' + extension + '"'
      headers.set('Content-Disposition', disposition)

      return new Response(response.body, { headers })
    } catch (error) {
      // 處理在獲取過程中出現的任何錯誤
      return new Response('Error fetching the content: ' + error.message, { status: 500 })
    }
  }

  // 如果路徑不是以 "/proxy/" 開頭，則返回一個簡單的信息
  return new Response("Cloudflare Worker Proxy", { status: 200 })
}
