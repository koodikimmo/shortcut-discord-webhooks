const config = require("config");

const discord = require("./discord")

const DEFAULT_COLOR = "#aabbcc";

function sendStoryCreatedMsg(story, owner_ids) {
	const msg = discord.getMessageBuilder()
        .setColor(_getFirstOwnerColor(owner_ids))
        .setText("Story created")
        .addField("Name", story.name)
        .addField("Owner", _getPlainTextOwnerIds(owner_ids))
        .addField("URL", story.app_url)
        .setTime();

    discord.sendMessage(msg);
}

function sendStoryAssignedMsg(story, owner_ids) {
	const msg = discord.getMessageBuilder()
        .setColor(_getFirstOwnerColor(owner_ids))
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
		nameStr += _findPlainTextName(owner_ids[i]);;
	}

	return nameStr;
}

function _findPlainTextName(owner_id) {
	let nameToUse = owner_id;

	const configNameLocator = "clubhouse-users." + owner_id + ".name";
	if(config.has(configNameLocator)) {
		// Use a better name if we have one
		nameToUse = config.get(configNameLocator);
	}

	return nameToUse;
}

function _getFirstOwnerColor(owner_ids) {
	if(owner_ids == null || owner_ids.length === 0) {
		return DEFAULT_COLOR;
	}

	return _findUserColor(owner_ids[0]);
}

function _findUserColor(owner_id) {
	let colorToUse = DEFAULT_COLOR;

	const configColorLocator = "clubhouse-users." + owner_id + ".color";
	if(config.has(configColorLocator)) {
		// Use a better color if we have one
		colorToUse = config.get(configColorLocator);
	}

	return colorToUse;
}

module.exports = {
    sendStoryCreatedMsg,
    sendStoryAssignedMsg
}