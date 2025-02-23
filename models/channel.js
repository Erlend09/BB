class Channel {
    constructor(id, name, groupId, type = "text") {
        this.id = id;
        this.name = name;
        this.groupId = groupId;
        this.type = type; // "text" eller "voice"
    }
}

module.exports = Channel;

