addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>AI工具導航</title>
    <style>
        body, html { 
            margin: 0; 
            padding: 0; 
            font-family: Arial, sans-serif; 
            text-align: center; 
            background-image: url('YOUR_UPLOADED_IMAGE_URL'); 
            background-size: cover; 
        }
        .category { 
            transition: opacity 1s ease-in-out; 
            opacity: 0.3; 
            will-change: opacity; 
        }
        .category-title { 
            font-size: 24px; 
            margin: 20px 0; 
            transition: font-weight 0.3s ease, color 0.3s ease; 
        }
        .category-title:hover {
            font-weight: bold; 
            color: #555; 
        }
        .links { 
            display: flex; 
            flex-wrap: wrap; 
            justify-content: center; 
        }
        .link-block { 
            margin: 10px; 
            padding: 20px; 
            border-radius: 8px; 
            width: calc(20% - 20px); 
            background-color: rgba(255, 255, 255, 0.8); 
            transition: transform 0.3s ease, background-color 0.3s ease; 
        }
        .link-block a { 
            color: #333; 
            text-decoration: none; 
            font-weight: bold; 
        }
        .link-block:hover {
            transform: scale(1.05); 
            background-color: rgba(255, 255, 255, 0.9);
        }
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', (event) => {
            const categories = document.querySelectorAll('.category');
            const checkVisibility = () => {
                categories.forEach(category => {
                    const categoryTop = category.getBoundingClientRect().top;
                    const categoryBottom = category.getBoundingClientRect().bottom;
                    if (categoryTop < window.innerHeight && categoryBottom > 0) {
                        category.style.opacity = 1; 
                    } else {
                        category.style.opacity = 0.3; 
                    }
                });
            };
            checkVisibility(); 
            window.addEventListener('scroll', checkVisibility);
        });
    </script>
</head>
<body>
    <h1>AI工具導航</h1>

    <div class="category">
        <div class="category-title">Productivity</div>
        <div class="links">
            <div class="link-block" style="background-color: rgba(255, 204, 204, 0.8);"><a href="https://wadeandwendy.ai">Wade</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 204, 0.8);"><a href="https://www.josh.ai">Josh</a></div>
            <div class="link-block" style="background-color: rgba(204, 204, 255, 0.8);"><a href="https://pocket.ai">Wallet.ai</a></div>
            <div class="link-block" style="background-color: rgba(255, 255, 204, 0.8);"><a href="https://formulabot.com">Excelformulabot</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 255, 0.8);"><a href="https://www.brain.fm">Brain.fm</a></div>
            <div class="link-block" style="background-color: rgba(255, 204, 255, 0.8);"><a href="https://www.rewind.ai">Rewind</a></div>
            <div class="link-block" style="background-color: rgba(255, 204, 204, 0.8);"><a href="https://www.futurenda.com">Futurenda</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 204, 0.8);"><a href="https://tripnotes.ai">Tripnotes.ai</a></div>
            <div class="link-block" style="background-color: rgba(204, 204, 255, 0.8);"><a href="https://thankyounote.app">Write a Thank You</a></div>
            <div class="link-block" style="background-color: rgba(255, 255, 204, 0.8);"><a href="https://www.gymbuddy.ai">GymBuddy</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 255, 0.8);"><a href="https://letsfoodie.com">Let's Foodie</a></div>
            <div class="link-block" style="background-color: rgba(255, 204, 255, 0.8);"><a href="https://styledna.ai">Style DNA</a></div>
            <div class="link-block" style="background-color: rgba(255, 204, 204, 0.8);"><a href="https://www.wysa.com">Wysa</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 204, 0.8);"><a href="https://www.cfspark.com">CF Spark</a></div>
            <div class="link-block" style="background-color: rgba(204, 204, 255, 0.8);"><a href="https://www.bing.com">Microsoft Bing</a></div>
            <div class="link-block" style="background-color: rgba(255, 255, 204, 0.8);"><a href="https://www.fingerprintforsuccess.com">Fingerprint for success</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 255, 0.8);"><a href="https://otter.ai">Otter</a></div>
            <div class="link-block" style="background-color: rgba(255, 204, 255, 0.8);"><a href="https://www.summari.com">Summari</a></div>
            <!-- ... 更多連結 ... -->
        </div>
    </div>

    <div class="category">
        <div class="category-title">Education</div>
        <div class="links">
            <div class="link-block" style="background-color: rgba(204, 255, 204, 0.8);"><a href="https://otter.ai">Otter</a></div>
            <div class="link-block" style="background-color: rgba(204, 204, 255, 0.8);"><a href="https://www.summari.com">Summari</a></div>
            <div class="link-block" style="background-color: rgba(255, 255, 204, 0.8);"><a href="https://www.gradescope.com">Gradescope</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 255, 0.8);"><a href="https://www.knowji.com">Knowji</a></div>
            <div class="link-block" style="background-color: rgba(255, 204, 255, 0.8);"><a href="https://www.hellohistory.ai">Hello History</a></div>
            <div class="link-block" style="background-color: rgba(255, 204, 204, 0.8);"><a href="https://artflow.ai">Artflow.ai</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 204, 0.8);"><a href="https://replika.ai">Replika</a></div>
            <div class="link-block" style="background-color: rgba(204, 204, 255, 0.8);"><a href="https://crypko.ai">Crypko</a></div>
            <div class="link-block" style="background-color: rgba(255, 255, 204, 0.8);"><a href="https://wonderdynamics.com">Wonder Studio</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 255, 0.8);"><a href="https://www.soulmachines.com">Digital People</a></div>
            <div class="link-block" style="background-color: rgba(255, 204, 255, 0.8);"><a href="https://www.digitalhumans.com">Digital Humans</a></div>
            <!-- ... 更多連結 ... -->
        </div>
    </div>

    <div class="category">
        <div class="category-title">Character Generators</div>
        <div class="links">
            <div class="link-block" style="background-color: rgba(255, 204, 204, 0.8);"><a href="https://artflow.ai">Artflow.ai</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 204, 0.8);"><a href="https://replika.ai">Replika</a></div>
            <div class="link-block" style="background-color: rgba(204, 204, 255, 0.8);"><a href="https://crypko.ai">Crypko</a></div>
            <div class="link-block" style="background-color: rgba(255, 255, 204, 0.8);"><a href="https://wonderdynamics.com">Wonder Studio</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 255, 0.8);"><a href="https://www.soulmachines.com">Digital People</a></div>
            <div class="link-block" style="background-color: rgba(255, 204, 255, 0.8);"><a href="https://www.digitalhumans.com">Digital Humans</a></div>
        </div>
    </div>

    <div class="category">
        <div class="category-title">Creative Tools</div>
        <div class="links">
            <div class="link-block" style="background-color: rgba(255, 204, 204, 0.8);"><a href="https://wonderdynamics.com">Wonder Studio</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 204, 0.8);"><a href="https://www.soulmachines.com">Digital People</a></div>
            <div class="link-block" style="background-color: rgba(204, 204, 255, 0.8);"><a href="https://www.digitalhumans.com">Digital Humans</a></div>
            <div class="link-block" style="background-color: rgba(255, 255, 204, 0.8);"><a href="https://www.cfspark.com">CF Spark</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 255, 0.8);"><a href="https://www.bing.com">Microsoft Bing</a></div>
            <div class="link-block" style="background-color: rgba(255, 204, 255, 0.8);"><a href="https://www.fingerprintforsuccess.com">Fingerprint for success</a></div>
            <div class="link-block" style="background-color: rgba(255, 204, 204, 0.8);"><a href="https://otter.ai">Otter</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 204, 0.8);"><a href="https://www.summari.com">Summari</a></div>
            <div class="link-block" style="background-color: rgba(204, 204, 255, 0.8);"><a href="https://www.gradescope.com">Gradescope</a></div>
            <div class="link-block" style="background-color: rgba(255, 255, 204, 0.8);"><a href="https://www.knowji.com">Knowji</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 255, 0.8);"><a href="https://www.hellohistory.ai">Hello History</a></div>
            <div class="link-block" style="background-color: rgba(255, 204, 255, 0.8);"><a href="https://artflow.ai">Artflow.ai</a></div>
            <div class="link-block" style="background-color: rgba(255, 204, 204, 0.8);"><a href="https://replika.ai">Replika</a></div>
            <div class="link-block" style="background-color: rgba(204, 255, 204, 0.8);"><a href="https://crypko.ai">Crypko</a></div>
        </div>
    </div>

    <div class="category">
    <div class="category-title">Language Models</div>
    <div class="links">
        <div class="link-block" style="background-color: rgba(255, 204, 204, 0.8);"><a href="https://chat.openai.com">ChatGPT</a></div>
        <div class="link-block" style="background-color: rgba(204, 255, 204, 0.8);"><a href="https://blog.google">Gemini</a></div>
        <div class="link-block" style="background-color: rgba(204, 204, 255, 0.8);"><a href="https://bard.google.com">Bard</a></div>
        <div class="link-block" style="background-color: rgba(255, 255, 204, 0.8);"><a href="https://ai-grok.net/zh-tw">Grok</a></div>
        <div class="link-block" style="background-color: rgba(204, 255, 255, 0.8);"><a href="https://claude.ai">Claude</a></div>
    </div>
</div>

</body>
</html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=UTF-8' }
  });
}
