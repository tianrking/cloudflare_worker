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
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Open Sans', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: #eaeaea;
                color: #333;
            }
            .container {
                text-align: center;
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                background: white;
                max-width: 450px;
            }
            h1 {
                color: #4CAF50;
                font-weight: 600;
                margin-bottom: 20px;
            }
            input[type="text"] {
                width: 90%;
                padding: 12px;
                margin-bottom: 20px;
                border: 1px solid #ccc;
                border-radius: 8px;
            }
            button {
                padding: 10px 25px;
                cursor: pointer;
                background-color: #4CAF50;
                border: none;
                border-radius: 8px;
                color: white;
                font-size: 18px;
                transition: background-color 0.3s;
            }
            button:hover {
                background-color: #43a047;
            }
        </style>
        
    </head>
    <body>
    <div class="container">
        <h1>Proxy Downloader</h1>
        <input type="text" id="urlInput" placeholder="Enter URL to download">
        <button onclick="generateCurlCommand()">Download</button>
        <pre id="curlCommand" style="margin-top: 20px; background: #eaeaea; padding: 10px; border-radius: 5px;"></pre>
    </div>

    <script>
        function generateCurlCommand() {
            const url = document.getElementById('urlInput').value;
            const workerURL = '/proxy/';
            const fullUrl = window.location.origin + workerURL + encodeURIComponent(url);
            const curlCommand = 'curl "' + fullUrl + '" --output ' + url.split('/').pop();
            document.getElementById('curlCommand').textContent = curlCommand;

            // Optional: Automatically copy the command to clipboard
            navigator.clipboard.writeText(curlCommand);
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
