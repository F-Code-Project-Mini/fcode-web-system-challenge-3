import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

export function ShowTopic() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="bg-primary hover:bg-primary/90 mx-auto text-white">
                    Xem đề tài của nhóm
                </Button>
            </DialogTrigger>
            <DialogContent className="min-h-[80%] min-w-[80%] bg-white">
                <div className="gap-4 px-3">
                    <iframe
                        src={"https://drive.google.com/file/d/11ieDInC9nrjGitd-5wPnwDeY3RKDh92N/preview"}
                        title="PDF Viewer"
                        width="100%"
                        height="100%"
                        style={{ border: "none" }}
                    />{" "}
                </div>
            </DialogContent>
        </Dialog>
    );
}
