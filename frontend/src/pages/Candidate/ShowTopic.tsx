import { FileText } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import useIsMobile from "~/hooks/useIsMobile";

export function ShowTopic({ urlPdf, name }: { urlPdf: string; name: string }) {
    const isMobile = useIsMobile();

    return (
        <Dialog>
            {isMobile ? (
                <Link target="_blank" to={urlPdf}>
                    <Button
                        variant="secondary"
                        className="bg-primary hover:bg-primary/90 group relative mx-auto flex items-center gap-2.5 overflow-hidden text-sm text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:text-base"
                        id="topic"
                    >
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <FileText className="h-4.5 w-4.5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
                        <span className="font-medium">Xem đề tài của nhóm</span>
                    </Button>
                </Link>
            ) : (
                <DialogTrigger asChild>
                    <Button
                        variant="secondary"
                        className="bg-primary hover:bg-primary/90 group relative flex items-center gap-2.5 overflow-hidden text-sm text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                        id="topic"
                    >
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <FileText className="h-4.5 w-4.5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
                        <span className="font-medium">Xem đề tài của nhóm</span>
                    </Button>
                </DialogTrigger>
            )}

            <DialogContent className="min-h-[98%] min-w-[96%] rounded-lg border border-gray-200/70 bg-white shadow-lg 2xl:min-h-[98%] 2xl:min-w-[95%]">
                <div className="flex h-full flex-col gap-0">
                    <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6">
                        <h3 className="text-base font-semibold tracking-tight text-gray-900 uppercase sm:text-lg">
                            Đề tài: <span className="text-primary">{name || "Tên đề tài"}</span>
                        </h3>
                        <div className="mt-1.5 space-y-1">
                            <div className="flex items-start gap-2 text-xs text-gray-600 sm:text-sm">
                                <span className="font-medium text-gray-500">Phát triển đề:</span>
                                <span className="text-primary font-medium">Technical Leader Recruitment</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden py-4">
                        <div className="h-full overflow-hidden rounded-lg border border-gray-200/50 shadow-sm">
                            <iframe
                                src={urlPdf}
                                title="PDF Viewer"
                                className="h-full w-full"
                                style={{ border: "none" }}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
