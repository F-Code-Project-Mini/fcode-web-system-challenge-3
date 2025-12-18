import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import useIsMobile from "~/hooks/useIsMobile";

export function ShowTopic() {
    const isMobile = useIsMobile();
    return (
        <Dialog>
            {isMobile ? (
                <Link target="_blank" to={"https://drive.google.com/file/d/11ieDInC9nrjGitd-5wPnwDeY3RKDh92N/preview"}>
                    <Button
                        variant="secondary"
                        className="bg-primary hover:bg-primary/90 mx-auto text-sm text-white sm:text-base"
                        id="topic"
                    >
                        Xem đề tài của nhóm
                    </Button>
                </Link>
            ) : (
                <DialogTrigger asChild>
                    <Button
                        variant="secondary"
                        className="bg-primary hover:bg-primary/90 mx-auto text-sm text-white sm:text-base"
                        id="topic"
                    >
                        Xem đề tài của nhóm
                    </Button>
                </DialogTrigger>
            )}

            <DialogContent className="min-h-[80%] min-w-[95%] bg-white sm:min-w-[80%]">
                <div className="gap-4 px-2 sm:px-3">
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
