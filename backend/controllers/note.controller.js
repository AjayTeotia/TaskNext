// IMPORT PACKAGES
import httpStatus from "http-status";

// IMPORT MODELS
import Note from "../models/note.model.js";

// CREATE NOTE ROUTE
export const CreateNote = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        error: "REQUEST BODY IS EMPTY",
      });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        error: "ALL FIELDS ARE REQUIRED",
      });
    }

    // Check if req.user is populated
    if (!req.user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        error: "UNAUTHORIZED - USER NOT FOUND",
      });
    }

    const newNote = await Note.create({
      title,
      content,
      userId: req.user._id,
    });

    return res.status(httpStatus.CREATED).json(newNote);
  } catch (err) {
    console.error(`ERROR WHILE CREATING NOTE: ${err}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "INTERNAL SERVER ERROR",
    });
  }
};

// EDIT NOTE ROUTE
export const EditNote = async (req, res) => {
  try {
    // CHECK IF REQUEST BODY IS EMPTY
    if (!req.body) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        error: "REQUEST BODY IS EMPTY",
      });
    }

    const { title, content, isPinned } = req.body;
    const { noteId } = req.params;

    // CHECK IF NOTE EXISTS
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        error: "NOTE NOT FOUND",
      });
    }

    // Check if the user is authorized to edit this note
    if (note.userId.toString() !== req.user._id.toString()) {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        error: "FORBIDDEN - USER NOT AUTHORIZED TO EDIT THIS NOTE",
      });
    }

    // Update fields if they are provided
    if (title) {
      note.title = title;
    }

    if (content) {
      note.content = content;
    }

    if (isPinned !== undefined) {
      // Allow for toggling isPinned
      note.isPinned = isPinned;
    }

    await note.save();

    return res.status(httpStatus.OK).json(note);
  } catch (err) {
    console.error(`ERROR WHILE EDITING NOTE: ${err}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "INTERNAL SERVER ERROR",
    });
  }
};

export const GetAllNote = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req?.user._id }).sort({
      isPinned: -1,
    });

    // CHECK IF NOTES EXISTS
    if (!notes) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        error: "NO NOTES FOUND",
      });
    }

    return res.status(httpStatus.OK).json({notes});
  } catch (err) {
    console.log(`ERROR WHILE GETTING ALL NOTES: ${err}`);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "INTERNAL SERVER ERROR",
    });
  }
};

// DELETE NOTE ROUTE
export const DeleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);
    // CHECK IF NOTE EXISTS
    if (!note) {
      return res.status(httpStatus.Not_FOUND).json({
        success: false,
        error: "NOTE NOT FOUND",
      });
    }

    // Check if the user is authorized to delete this note
    if (note.userId.toString() != req.user._id.toString()) {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        error: "FORBIDDEN - USER NOT AUTHORIZED TO DELETE THIS NOTE",
      });
    }

    await Note.findByIdAndDelete(noteId);

    return res.status(httpStatus.OK).json(note);
  } catch (err) {
    console.log(`ERROR WHILE DELETING NOTE: ${err}`);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "INTERNAL SERVER ERROR",
    });
  }
};

// IS PINNED ROUTE
export const IsPinnedNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { isPinned } = req.body;

    const note = await Note.findById(noteId);

    // CHECK IF NOTE EXISTS
    if (!note) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        error: "NOTE NOT FOUND",
      });
    }

    if (note.userId.toString() != req.user._id.toString()) {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        error: "FORBIDDEN - USER NOT AUTHORIZED TO DELETE THIS NOTE",
      });
    }

    if (isPinned) {
      note.isPinned = true;
    }

    if (!isPinned) {
      note.isPinned = false;
    }

    await note.save();

    return res.status(httpStatus.OK).json(note);
  } catch (err) {
    console.log(`ERROR WHILE IS PINNED NOTE: ${err}`);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "INTERNAL SERVER ERROR",
    });
  }
};
