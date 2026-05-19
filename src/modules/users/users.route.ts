import { Router } from "express";
import usersController from "./users.controller";


const router = Router();

router.post('/', usersController.createUser);
router.get('/', usersController.getAllUser);
router.get('/:id',usersController.getSingleUser);
router.put('/:id', usersController.updateUserInformationn);
router.delete('/:id', usersController.deleteUserInformation)


export const usersRoute = router;

