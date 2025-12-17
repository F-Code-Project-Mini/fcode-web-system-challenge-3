import prisma from "~/configs/prisma";
import { paginate } from "~/utils/pagination";

class TopicRepository {
    findWithPagination = async ({
        page,
        limit,
        select,
        where,
        orderBy,
        include,
        distinct,
    }: {
        page?: number;
        limit?: number;
        select?: Record<string, any>;
        where?: Record<string, any>;
        orderBy?: Record<string, any> | Record<string, any>[];
        include?: Record<string, any>;
        distinct?: any;
    }) => {
        const { data, meta } = await paginate<any>(prisma.topic, {
            page,
            limit,
            where,
            orderBy: orderBy ?? { createdAt: "desc" },
            select,
            include,
            distinct,
        });

        return {
            topics: data,
            total: meta.total,
            meta,
        };
    };
}

const topicRepository = new TopicRepository();
export default topicRepository;
