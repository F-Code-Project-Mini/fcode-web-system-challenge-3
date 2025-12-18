import { Facebook, Mail } from "lucide-react";

const Mentor = () => {
    return (
        <section className="col-span-1 lg:col-span-4" id="mentor">
            <div className="rounded-lg border border-gray-200 bg-white shadow-2xs lg:sticky lg:top-24">
                <div className="from-gray-100/60/60 border-b border-gray-100 bg-gradient-to-br to-white px-4 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
                            {/* <User className="h-6 w-6" strokeWidth={2.2} /> */}
                            <img
                                src="https://i.ibb.co/DfQd5Qr5/594972376-1542715670398830-6245042482448236020-n.jpg"
                                alt="Mentor"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <span className="text-xs font-medium tracking-wide text-gray-500 uppercase">Mentor</span>
                            <h3 className="mt-0.5 text-base font-semibold text-gray-900 sm:text-lg">Phạm Hoàng Tuấn</h3>
                        </div>
                    </div>
                </div>
                <div className="space-y-4 px-4 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg">
                            <Mail className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-gray-500">Email</p>
                            <a
                                href="mailto:huyngfx@gmail.com"
                                className="text-primary hover:text-primary/80 mt-1 block text-sm break-all transition-colors"
                            >
                                huyngfx@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                            <Facebook className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-gray-500">Facebook</p>
                            <a
                                href="https://facebook.com/nguyengiahuy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 mt-1 block text-sm transition-colors"
                            >
                                fb.com/nguyengiahuy
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                    <p className="text-xs text-red-600 italic">Vui lòng add mentor của bạn vào nhóm của bạn.</p>
                </div>
            </div>
        </section>
    );
};

export default Mentor;
