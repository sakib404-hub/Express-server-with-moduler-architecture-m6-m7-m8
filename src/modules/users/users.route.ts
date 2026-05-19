import { Router } from "express";
import usersController from "./users.controller";


const router = Router();

router.post('/', usersController.createUser)
router.get('/', usersController.getAllUser)


export const usersRoute = router;

