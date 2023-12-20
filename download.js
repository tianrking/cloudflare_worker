addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// Function to map MIME types to file extensions
function getExtensionFromMimeType(mimeType) {
  const mimeMap = {
    'application/pdf': '.pdf',
    'application/zip': '.zip',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'text/plain': '.txt',
    'text/html': '.html',
    // Add more mappings as needed
  }
  return mimeMap[mimeType] || ''
}

// Function to decode URL if needed
function decodeIfNeeded(urlStr) {
  if (urlStr.includes('%')) {
    return decodeURIComponent(urlStr);
  }
  return urlStr;
}

// Function to handle and correct various URL schemes
function correctUrlScheme(urlStr) {
  if (urlStr.startsWith('http://') || urlStr.startsWith('https://') || urlStr.startsWith('ftp://')) {
    return urlStr;
  }
  return 'https://' + urlStr;
}

// Function to extract a filename from the URL or generate one
function getFilenameFromUrl(urlStr, contentType) {
  const url = new URL(urlStr);
  let filename = url.pathname.split('/').pop();

  if (filename.includes('.')) {
    return filename; // Return the filename if it has an extension
  }

  const extension = getExtensionFromMimeType(contentType);
  if (extension) {
    return filename + extension; // Append extension based on MIME type
  }

  return 'download' + (extension || '.bin'); // Generic filename if no extension found
}

async function handleRequest(request) {
  const url = new URL(request.url)

  if (url.pathname.startsWith("/proxy/")) {
    let targetUrl = url.pathname.replace("/proxy/", "")
    targetUrl = correctUrlScheme(decodeIfNeeded(targetUrl))

    try {
      const response = await fetch(targetUrl, { method: 'GET' })

      if (!response.ok) {
        return new Response('Error fetching the content', { status: response.status })
      }

      const contentType = response.headers.get('content-type')
      const contentDisposition = response.headers.get('content-disposition')
      let filename = contentDisposition ? contentDisposition.split('filename=')[1] : getFilenameFromUrl(targetUrl, contentType);
      const headers = new Headers(response.headers)
      headers.set('Content-Disposition', `attachment; filename="${filename}"`)
      
      return new Response(response.body, { headers })
    } catch (error) {
      return new Response('Error fetching the content: ' + error.message, { status: 500 })
    }
  } else if (url.pathname === "/") {
    // Serve the HTML for the main page
    const htmlUI = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Proxy Downloader</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: #f4f7f6;
                color: #333;
            }
            .container {
                text-align: center;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                background: white;
                max-width: 400px;
            }
            h1 {
                color: #4CAF50;
            }
            input[type="text"] {
                width: 90%;
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            button {
                padding: 10px 20px;
                cursor: pointer;
                background-color: #4CAF50;
                border: none;
                border-radius: 5px;
                color: white;
                font-size: 16px;
                transition: background-color 0.3s;
            }
            button:hover {
                background-color: #45a049;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Proxy Downloader</h1>
            <input type="text" id="urlInput" placeholder="Enter URL to download">
            <button onclick="download()">Download</button>
        </div>

        <script>
            function download() {
                const url = document.getElementById('urlInput').value;
                if (url) {
                    const workerURL = '/proxy/';
                    window.open(workerURL + encodeURIComponent(url), '_blank');
                }
            }
        </script>
    </body>
    </html>
  `;

    return new Response(htmlUI, {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  return new Response("Cloudflare Worker Proxy", { status: 200 })
}
