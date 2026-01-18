import { House, InfoIcon } from "lucide-react";
import { Link } from "react-router";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
type BreadcrumbPageProps = {
    name: string;
    url: string;
};
export function BreadcrumbPages({ urls }: { urls: BreadcrumbPageProps[] }) {
    const count = urls.length;
    const indexLast = count - 1;

    return (
        <div className="border-primary/20 from-primary/5 rounded-lg border bg-gradient-to-r to-white px-4 py-3 shadow-xs">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/" className="flex items-center gap-1.5">
                                <House size={15} />
                                Home
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {count > 2 && (
                        <>
                            <BreadcrumbItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="hover:bg-primary/10 hover:text-primary flex items-center gap-1 rounded-md px-2 py-1 text-gray-600 transition-colors">
                                        <BreadcrumbEllipsis className="size-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className="min-w-[200px]">
                                        {count > 2 &&
                                            urls.slice(0, indexLast - 1).map((url, index) => (
                                                <DropdownMenuItem key={index} asChild>
                                                    <Link
                                                        to={url.url}
                                                        className="hover:text-primary cursor-pointer font-medium text-gray-700"
                                                    >
                                                        {url.name}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </BreadcrumbItem>
                        </>
                    )}
                    {count >= 2 && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to={urls[indexLast - 1].url}>{urls[indexLast - 1].name}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </>
                    )}

                    <BreadcrumbItem>
                        <BreadcrumbPage className="flex items-center gap-1.5">
                            <InfoIcon size={15} />
                            {urls[indexLast].name}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
