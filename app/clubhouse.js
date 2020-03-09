const reports = require("./reports")

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
    reports.sendStoryCreatedMsg(action, action.owner_ids || []);
}

function _handleUpdateAction(action) {
	const entity_type = action.entity_type;

	if(entity_type != "story") {
		console.log("Updating something else than a story, skipping...")
		return;
	}

	_handleStoryChange(action);
}

function _handleStoryChange(action) {
	// Get changes in this update
	const changes = action.changes;

	console.log("Updating a story, changes: ");
	console.log(changes);

	const ownerChanges = changes.owner_ids;
	if(ownerChanges == null) {
		console.log("Currently we are just interested in owner changes, skipping...");
		return;
	}

	const addedOwners = ownerChanges.adds;
	if(addedOwners != null) {
		reports.sendStoryAssignedMsg(action, addedOwners);
	}

}

function _handleDeleteAction(action) {

}


module.exports = {
    parseEvent
}