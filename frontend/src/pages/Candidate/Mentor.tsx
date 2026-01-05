import { Facebook, Mail, MessageCircle } from "lucide-react";
import type { MentorshipType } from "~/types/team.types";
const Mentor = ({ data }: { data: MentorshipType | undefined }) => {
    return (
        <section className="col-span-16 xl:col-span-4">
            <div
                className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs transition-all lg:sticky lg:top-28"
                id="mentor"
            >
                <div className="border-b border-gray-200/70 bg-gradient-to-br from-gray-50/80 to-white px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div>
                            <span className="text-xs font-medium tracking-wide text-gray-500 uppercase">Mentor</span>
                            <h3 className="mt-1 text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                                {data?.mentor?.fullName || "Chưa cập nhật"}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="px-2 py-2">
                    <div className="group flex items-start gap-3.5 rounded-lg p-3 transition-colors hover:bg-gray-50/50">
                        <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors">
                            <Facebook className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-gray-500">Facebook</p>
                            <a
                                href={data?.facebook || ""}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 mt-1.5 block text-sm font-medium transition-colors"
                            >
                                {data?.mentor.fullName || "Chưa cập nhật"}
                            </a>
                        </div>
                    </div>
                    <div className="group flex items-start gap-3.5 rounded-lg p-3 transition-colors hover:bg-gray-50/50">
                        <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors">
                            <Mail className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-gray-500">Zalo</p>
                            <a
                                target="_blank"
                                href={`https://zalo.me/${data?.phone || ""}`}
                                className="text-primary hover:text-primary/80 mt-1.5 block text-sm font-medium break-all transition-colors"
                            >
                                {data?.phone || "Chưa cập nhật"}
                            </a>
                        </div>
                    </div>

                    <div className="group flex items-start gap-3.5 rounded-lg p-3 transition-colors hover:bg-gray-50/50">
                        <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors">
                            <MessageCircle className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-gray-500">Discord</p>
                            <span
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 mt-1.5 block text-sm font-medium transition-colors"
                            >
                                {data?.discord || "Chưa cập nhật"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200/70 bg-gradient-to-br from-red-50/50 to-white px-5 py-4 sm:px-6">
                    <p className="text-xs leading-relaxed text-red-600">
                        <span className="font-semibold">Lưu ý:</span> Vui lòng add mentor của bạn vào nhóm của bạn.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Mentor;
