import posts from "./tuits.js";
let tuits = posts;

const currentUser = {
    "userName": "NASA",
    "handle": "@nasa",
    "image": "images/nasa.jpg",
};

const templateTuit = {
    ...currentUser,
    "topic": "Space",
    "time": "2h",
    "liked": false,
    "replies": 0,
    "retuits": 0,
    "likes": 0,
    "disliked": false,
    "dislikes": 0
}

const createTuit = (req, res) => {
    // const newTuit = req.body;
    const newTuit = {
        ...templateTuit,
        ...req.body
    };
    newTuit._id = (new Date()).getTime()+'';    // add _id field as a time stamp
    tuits.push(newTuit);                        // append new tuit to tuits array
    res.json(newTuit);                          // respond with new tuit
}

const findTuits = (req, res) =>
    res.json(tuits);

const updateTuit = (req, res) => {
    const tuitdIdToUpdate = req.params.tid;     // get ID of tuit to update from path
    const updates = req.body;                   // get updates from HTTP body
    const tuitIndex = tuits.findIndex(          // find index of tuit to update
        (t) =>  t._id.toString() === tuitdIdToUpdate)   // in the tuits array
    tuits[tuitIndex] =                          // update the element in tuits array
        {...tuits[tuitIndex], ...updates};      // merging/updating old tuit with updates
    res.sendStatus(200);                        // respond with success
}

const deleteTuit = (req, res) => {
    const tuitdIdToDelete = req.params.tid;  // retrieve the ID of the tuit we want to remove
    tuits = tuits.filter((t) =>         // filter out the tuit from the tuits array
        t._id.toString() !== tuitdIdToDelete);
    res.sendStatus(200);                    // respond with success
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}