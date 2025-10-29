export async function sendDiscordWebhook(content: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
}
