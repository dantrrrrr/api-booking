import express from "express";
const router = express.Router();


router.post('/', create)
//delete
router.delete('/:id', deleteX)
//update
router.put('/:id', update)
//get one by id
router.get('/find/:id', get)
//get alll
router.get('/', gets)

export default router;
