import prisma from "~/configs/prisma";
import Topic from "~/schemas/topic.schema";
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

    create = async (data: { title: string; filePath: string }) => {
        return prisma.topic.create({
            data: new Topic(data),
        });
    };

    update = async (id: string, data: { title: string; filePath: string }) => {
        return prisma.topic.update({
            where: { id },
            data: {
                title: data.title,
                filePath: data.filePath,
            },
        });
    };

    deleteById = async (id: string) => {
        return prisma.topic.delete({
            where: { id },
        });
    };

    hasTeams = async (topicId: string) => {
        const count = await prisma.team.count({
            where: { topicId },
        });
        return count > 0;
    };

    findById = async (id: string) => {
        return prisma.topic.findUnique({
            where: { id },
        });
    };

    candidateHasTopic = async ({ topicId, candidateId }: { topicId: string; candidateId: string }) => {
        const team = await prisma.team.findFirst({
            where: {
                topicId,
                candidates: {
                    some: {
                        id: candidateId,
                    },
                },
            },
            select: { id: true },
        });
        return !!team;
    };
}

const topicRepository = new TopicRepository();
export default topicRepository;
