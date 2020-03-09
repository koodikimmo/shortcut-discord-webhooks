const webhook = require("webhook-discord");
const config = require("config");

function getMessageBuilder() {
	let msg = new webhook.MessageBuilder();

	// Set message sender name
	const senderName = config.get("discord.sender-name");
	msg.setName(senderName);

	return msg;
}

function sendMessage(msg) {
    const discordWebhookUrl = config.get("discord.discord-webhook")
    const hook = new webhook.Webhook(discordWebhookUrl);
	hook.send(msg);	
}

module.exports = {
    getMessageBuilder,
    sendMessage
}