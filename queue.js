const Queues = [];
const Players = [];
const RepeatMode = [];

function checkRepeat(queue) {
    return RepeatMode[queue] || false;
}

module.exports = {
    initQueue: function (queue) {
        Queues[queue] = [];
    },
    removeQueue: function (queue) {
        delete Queues[queue];
    },
    addSong: function (song, queue) {
        // add queue to queues, if queue doesn't exist, create it
        if (!Queues[queue]) {
            Queues[queue] = [];
        }
        Queues[queue].push(song);
    },
    removeSong: function (song, queue) {
        queue.splice(queue.indexOf(song), 1);
    },
    nextSong: function (queue) {
        if (checkRepeat(Queues[queue])) {
            return Queues[queue][0];
        }
        return Queues[queue]?.shift() || false;
    },
    addToRepeat: function (queue) {
        RepeatMode[queue] = true;
    },
    getQueue: function (queue) {
        return Queues[queue];
    },
    addPlayer: function (player, queue) {
        Players[queue] = player;
    },
    getPlayer: function (id) {
        return Players[id];
    },
    removePlayer: function (id) {
        delete Players[id];
    },
    skipQueue: function (queue, i = 1) {
        if (Queues[queue] && Queues[queue].length > 0) {
            Queues[queue] = Queues[queue].slice(i - 1);
            Players[queue].stop();
        } else if (Players[queue]) {
            Players[queue].stop();
        }
    },
}
