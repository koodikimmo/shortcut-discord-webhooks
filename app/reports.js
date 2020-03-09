const discord = require("./discord")

function sendStoryCreatedMsg(story, owner_ids) {
	const msg = discord.getMessageBuilder()
        .setColor("#aabbcc")
        .setText("Story created")
        .addField("Name", story.name)
        .addField("Owner", _getPlainTextOwnerIds(owner_ids))
        .addField("URL", story.app_url)
        .setTime();

    discord.sendMessage(msg);
}

function sendStoryAssignedMsg(story, owner_ids) {
	const msg = discord.getMessageBuilder()
        .setColor("#aabbcc")
        .setText("Story assigned")
        .addField("Name", story.name)
        .addField("Owner", _getPlainTextOwnerIds(owner_ids))
        .addField("URL", story.app_url)
        .setTime();

    discord.sendMessage(msg);
}

function _getPlainTextOwnerIds(owner_ids) {
	console.log(owner_ids);
	if(owner_ids == null || owner_ids.length === 0) {
		return "<nobody>"
	}

	let nameStr = "";
	for(var i = 0; i < owner_ids.length; i++) {
		// Separate multi user names
		if(i > 0) {
			nameStr += ", ";
		}

		// Add name
		nameStr += owner_ids[i];
	}

	return nameStr;
}


module.exports = {
    sendStoryCreatedMsg,
    sendStoryAssignedMsg
}