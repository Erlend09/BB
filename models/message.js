class Message {
    constructor(id, channelId, senderId, content, timestamp = new Date()) {
        this.id = id;
        this.channelId = channelId;
        this.senderId = senderId;
        this.content = content;
        this.timestamp = timestamp;
    }
}

module.exports = Message;

