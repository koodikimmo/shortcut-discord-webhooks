const discord = require("./discord")

function parseEvent(eventData) {
	eventData.actions.forEach(action => {
		const actionType = action.action;

		if(actionType === "create") {
			_handleCreateAction(action);
		}

		else if(actionType === "update") {
			_handleUpdateAction(action);
		}

		else if(actionType === "delete") {
			_handleDeleteAction(action);
		}

		else {
			console.log("Unhandled action type: '" + actionType + "'");
		}
	});
}

function _handleCreateAction(action) {
    const msg = discord.getMessageBuilder()
        .setColor("#aabbcc")
        .setText("Story created")
        .addField("Name", action.name)
        .addField("URL", action.app_url)
        .setTime();

    discord.sendMessage(msg);
}

function _handleUpdateAction(action) {
	const entity_type = action.entity_type;

	if(entity_type != "story") {
		console.log("Updating something else than a story, skipping...")
		return;
	}

	// Get changes in this update
	const changes = action.changes;

	console.log("Updating a story, changes: ");
	console.log(changes);
}


function _handleDeleteAction(action) {

}


module.exports = {
    parseEvent
}