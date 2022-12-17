import * as tuitsDao from '../tuits/tuits-dao.js'

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
const createTuit = async (req, res) => {
    const newTuit = req.body;
    newTuit.likes = 0;
    newTuit.liked = false;
    const insertedTuit = await tuitsDao
        .createTuit(newTuit);
    res.json(insertedTuit);
}


const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits()
    res.json(tuits);
}
const updateTuit = async (req, res) => {
    const tuitdIdToUpdate = req.params.tid;     // get ID of tuit to update from path
    const updates = req.body;                   // get updates from HTTP body
    const status = await tuitsDao
        .updateTuit(tuitdIdToUpdate,
            updates);     // merging/updating old tuit with updates
    res.json(status);                        // respond with success
}

const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.tid;  // retrieve the ID of the tuit we want to remove
    const status = await tuitsDao
        .deleteTuit(tuitdIdToDelete);
    res.json(status);                    // respond with success
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}