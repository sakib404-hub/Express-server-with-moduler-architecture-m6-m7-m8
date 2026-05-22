import { Router, type NextFunction, type Request } from "express";
import usersController from "./users.controller";
import auth from "../../middleware/auth.middleware";
import { USER_ROLE } from "../../types/types";


const router = Router();



router.post('/', usersController.createUser);
router.get('/', auth(USER_ROLE.admin, USER_ROLE.moderator),  usersController.getAllUser);
router.get('/:id',usersController.getSingleUser);
router.put('/:id', usersController.updateUserInformationn);
router.delete('/:id', usersController.deleteUserInformation)


export const usersRoute = router;

