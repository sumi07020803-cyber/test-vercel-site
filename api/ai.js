<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>心情AI小助手 · 温柔陪伴</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: "Microsoft YaHei", sans-serif;
      background: linear-gradient(120deg, #e8f4f8, #fef6f9);
      min-height: 100vh;
      padding: 60px 20px;
    }

    .container {
      width: 1440px;
      margin: 0 auto;
    }

    .title {
      text-align: center;
      font-size: 36px;
      color: #5a8ca8;
      margin-bottom: 40px;
    }

    .card {
      background: rgba(255,255,255,0.9);
      border-radius: 24px;
      padding: 50px 60px;
      box-shadow: 0 10px 40px rgba(90,140,168,0.15);
    }

    .chat-box {
      margin-bottom: 30px;
    }

    label {
      font-size: 18px;
      color: #667885;
      margin-bottom: 12px;
      display: block;
    }

    #moodInput {
      width: 100%;
      height: 130px;
      border: 1px solid #d8e6ee;
      border-radius: 16px;
      padding: 20px;
      font-size: 16px;
      background: #fafcfe;
      outline: none;
      resize: none;
    }

    #sendBtn {
      padding: 14px 36px;
      background: #87b8d8;
      color: #fff;
      border: none;
      border-radius: 30px;
      font-size: 17px;
      cursor: pointer;
      transition: 0.3s;
    }

    #sendBtn:hover {
      background: #69a2c7;
    }

    .answer-box {
      margin-top: 35px;
      padding: 25px;
      background: #f5f9fc;
      border-radius: 18px;
      border-left: 5px solid #87b8d8;
    }

    .answer-title {
      font-size: 16px;
      color: #7a8fa0;
      margin-bottom: 10px;
    }

    #aiAnswer {
      font-size: 18px;
      color: #4a6577;
      line-height: 1.8;
    }

    @media (max-width: 1440px) {
      .container { width: 100%; }
    }
  </style>
</head>

<body>
  <div class="container">
    <h2 class="title">💬 AI 心情陪伴助手</h2>

    <div class="card">
      <div class="chat-box">
        <label>告诉我你今天的心情：</label>
        <textarea id="moodInput" placeholder="例如：我今天有点难过、我很开心、我有点焦虑…"></textarea>
      </div>

      <button id="sendBtn" onclick="askAI()">发送给AI分析</button>

      <div class="answer-box">
        <div class="answer-title">🧩 AI 分析结果：</div>
        <div id="aiAnswer">请输入你的心情，AI会为你分析～</div>
      </div>
    </div>
  </div>

  <script>
    async function askAI() {
      const text = document.getElementById("moodInput").value.trim();
      const aiAnswer = document.getElementById("aiAnswer");

      if (!text) {
        aiAnswer.innerText = "请先输入你的心情哦～";
        return;
      }

      aiAnswer.innerText = "AI正在思考中...";

      try {
        // 只调用自己Vercel后端，不再用公共AI
        const response = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text })
        });

        const data = await response.json();
        aiAnswer.innerText = data.result;

      } catch (err) {
        aiAnswer.innerText = "AI暂时休息啦，你可以再试一次～";
      }
    }
  </script>
</body>
</html>