import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useAddNewNote from "@/hooks/UseAddNewNote";
import { Textarea } from "../ui/textarea";

const AddNewNote = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { addNewNote, loading } = useAddNewNote();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Inputs before adding new note:", inputs);

    await addNewNote(inputs);
  };
  return (
    <div>
      <div
        className="p-10 border-dashed border-2 rounded-lg hover:cursor-pointer hover:scale-105 hover:shadow-md transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-xl font-semibold text-center">+ Add New Note</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              Add New Note
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {/* Moved the form out of DialogDescription to avoid nesting issues */}
            <form onSubmit={handleSubmit}>
              <div className="my-2 mt-7 space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Ex: Join GYM"
                  type="text"
                  required
                  value={inputs.title}
                  onChange={(e) =>
                    setInputs({ ...inputs, title: e.target.value })
                  }
                />
              </div>

              <div className="my-2 mt-5 space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Ex: Join GYM and start your fitness journey"
                  type="text"
                  required
                  value={inputs.content}
                  onChange={(e) =>
                    setInputs({ ...inputs, content: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-5 justify-end mt-5">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="default"
                  loading={loading}
                  disabled={loading}
                  onClick={() => setOpenDialog(false)}
                >
                  {loading ? (
                    <span className="loader animate-spin"></span>
                  ) : (
                    "Add Note"
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewNote;
