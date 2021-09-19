# General info
This is simple server implementation that listens for webhook calls from [Shortcut](https://shortcut.com/) – a project management tool (also formerly known as Clubhouse). Once a webhook call is received, this server passes the information to Discord instant messaging platform. This can be used to create message feeds for Discord channels that keep you up to date regarding changes in stories/tickets created in the project management tool.
	
# Technologies
Project is created with:
* Vanilla JS 
* Express
* "webhook-discord" library to hook into Discord

# Setup



## Config
Copy `config/config-sample.yml` as `config/default.yml` and define the following info:


1. Communication settings for Clubhouse => Express communication
```
server:
  clubhouse-api-endpoint: "clubhouse"
  port: 33000
```

You need this information when configuring the webhook endpoint in Clubhouse.


2. Communication settings for This tool => Discord. 

```
discord:
  discord-webhook: "https://discordapp.com/api/webhooks/XXXXX/YYYYY"
  sender-name: "Clubhouse"
```

You get the URL from the Discord servers' "Settings > Integrations > New Webhook" tab. Sender name can be anything you wish, this is the name that is displayed in the channel when webhook messages are received.

3. Define user colors for convenience

```
clubhouse-users:
  clubhouse-user-id-1: 
    name: "Username"
    color: "#AABBCC"
```

The user ID is a UUID string you get from Clubhouse. These are a quality of life feature that colors the posts for Discord so that the assignee of the ticket/story is highlighted in the Discord feed.


## Server setup
The server needs to be running in a server than can be reached from the outside world. The port can be configured in the `config/default.yml` file.

A process manager like [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) is highly suggested. 
