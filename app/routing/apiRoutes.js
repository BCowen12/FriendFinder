var friends = require("../data/friends");


module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });


    app.post("/api/friends", function (req, res) {
        let user = req.body;
        let totalDifference = 50;
        let best = 0;
        for (let i = 0; i < friends.length; i++) {
            let total = 0;
            let score = 0;
            for (let x = 0; x < user.scores.length; x++) {
                score = Math.abs(friends[i].scores[x] - user.scores[x]);
                if (score > 0) total += score;
            }
            if (total < totalDifference) {
                totalDifference = total;
                best = i;
            }
        }
        console.log(friends[best].name + " and " + user.name + "'s score difference is " + totalDifference);
        friends.push(user);
        res.json(friends[best]);
    });
};