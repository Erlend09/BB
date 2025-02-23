class Group {
    constructor(id, name, ownerId, members = []) {
        this.id = id;
        this.name = name;
        this.ownerId = ownerId;
        this.members = members; // Liste over bruker-IDer
    }
}

module.exports = Group;
