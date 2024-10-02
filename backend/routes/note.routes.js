// IMPORT PACKAGES
import express from "express";

// IMPORT CONTROLLERS
import {
  CreateNote,
  DeleteNote,
  EditNote,
  GetAllNote,
  IsPinnedNote,
} from "../controllers/note.controller.js";

// IMPORT MIDDLEWARE
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

// CREATE NOTE ROUTE
router.post("/create-note", protectRoute, CreateNote);

// EDIT NOTE ROUTE
router.put("/edit-note/:noteId", protectRoute, EditNote);

// GET ALL NOTE ROUTE
router.get("/get-all-notes", protectRoute, GetAllNote);

// DELETE NOTE ROUTE
router.delete("/delete-note/:noteId", protectRoute, DeleteNote);

// IS PINNED ROUTE
router.put("/is-pinned-note/:noteId", protectRoute, IsPinnedNote);

// EXPORT ROUTER
export default router;
