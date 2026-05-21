import { Router } from "express";
import profileController from "./profile.controller";

const router = Router();

router.post('/', profileController.createProfile);
router.get('/', profileController.getAllProfile);
router.get('/:id', profileController.getSingleProfile)

export const profileRouter = router;