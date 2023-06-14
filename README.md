# Telegram post

![Version of EditorJS that the plugin is compatible with](https://badgen.net/badge/Editor.js/v2.0/blue)

Provides Telegram post widget for the [Editor.js](https://ifmo.su/editor).

## Installation

### Install via NPM

Get the package

```shell
npm i --save editorjs-telegram-post
```

Include module at your application

```javascript
import TelegramPost from 'editorjs-telegram-post';
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    telegramPost: TelegramPost,
  },

  ...
});
```

## Output data

| Field | Type     | Description                            |
| ----- | -------- |----------------------------------------|
| channelName  | `string` | telegram channel name                  |
| messageId | `number` | message id of post in telegram channel |

```json
{
  "type": "telegramPost",
  "data": {
    "channelName": "telegram",
    "messageId": 236
  }
}
```