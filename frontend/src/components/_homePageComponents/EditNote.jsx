import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { PencilIcon } from "lucide-react";
  import { useState, useEffect } from "react"; 
  import { Label } from "../ui/label";
  import { Input } from "../ui/input";
  import { Button } from "../ui/button";
  import { Textarea } from "../ui/textarea";
import useEditNote from "@/hooks/UseEditNote";
  
  const EditNote = ({ note, triggerRefresh }) => { // Accept triggerRefresh as a prop
    const [openDialog, setOpenDialog] = useState(false);
    const { editNote, loading } = useEditNote();
  
    const [inputs, setInputs] = useState({
      title: note.title || "",
      content: note.content || "", 
    });
  
    useEffect(() => {
      if (note) {
        setInputs({
          title: note.title || "",
          content: note.content || "",
        });
      }
    }, [note]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Inputs before editing note:", inputs);
      const success = await editNote(note._id, inputs.title, inputs.content);
      if (success) {
        triggerRefresh(); // Call the triggerRefresh function to refresh data
      }
      setOpenDialog(false);
    };
  
    return (
      <div>
        <div onClick={() => setOpenDialog(true)}>
          <PencilIcon className="hover:text-green-500 hover:cursor-pointer hover:scale-110" />
        </div>
  
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">
                Edit Note
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <div className="my-2 mt-7 space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder={note.title}
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
                    placeholder={note.content}
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
                  >
                    {loading ? (
                      <span className="loader animate-spin"></span>
                    ) : (
                      "Save Changes"
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
  
  export default EditNote;
  