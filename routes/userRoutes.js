import express from "express"
import protectedRoute from "../middleWare/protectedRoute.js"
import { getUserForSidebar } from "../controllers/userController.js";

const router = express.Router()

router.get("/", protectedRoute,getUserForSidebar )

export default router;