import { Router } from "express";
import usersController from "./users.controller";


const router = Router();

router.post('/', usersController.createUser);
router.get('/', usersController.getAllUser);
router.get('/:id',usersController.getSingleUser)


export const usersRoute = router;

