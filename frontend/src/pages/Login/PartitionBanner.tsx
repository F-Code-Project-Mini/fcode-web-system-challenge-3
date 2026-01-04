const PartitionBanner = () => {
    return (
        <section className="relative hidden h-full w-full overflow-hidden sm:block">
            <img
                src="https://i.ibb.co/twx6NCbq/banner.jpg"
                alt="F-Code Banner"
                className="h-full w-full rounded-l-lg object-cover object-center transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-gray-500/30 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-8">
                <div className="space-y-2">
                    <h2 className="text-xl leading-tight font-bold sm:text-2xl">Ban chủ nhiệm CLB F-Code</h2>
                    <p className="text-xs text-white/80 sm:text-sm">Lãnh đạo tối cao!!!</p>
                </div>
            </div>
            <div className="bg-primary/20 absolute top-0 right-0 h-40 w-40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"></div>
        </section>
    );
};

export default PartitionBanner;
