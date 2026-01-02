import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import useIsMobile from "~/hooks/useIsMobile";

export function ShowTopic({ urlPdf }: { urlPdf: string }) {
    const isMobile = useIsMobile();
    
    return (
        <Dialog>
            {isMobile ? (
                <Link target="_blank" to={urlPdf}>
                    <Button
                        variant="secondary"
                        className="bg-primary hover:bg-primary/90 mx-auto text-sm text-white shadow-md transition-all hover:shadow-lg sm:text-base"
                        id="topic"
                    >
                        Xem đề tài của nhóm
                    </Button>
                </Link>
            ) : (
                <DialogTrigger asChild>
                    <Button
                        variant="secondary"
                        className="bg-primary hover:bg-primary/90 text-sm text-white shadow-md transition-all hover:shadow-lg"
                        id="topic"
                    >
                        Xem đề tài của nhóm
                    </Button>
                </DialogTrigger>
            )}

            <DialogContent className="min-h-[98%] min-w-[96%] bg-white 2xl:min-h-[98%] 2xl:min-w-[95%]">
                <div className="gap-4 px-2 sm:px-3">
                    <iframe
                        src={urlPdf}
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
