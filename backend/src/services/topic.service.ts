import { RoleType } from "~/constants/enums";
import { HTTP_STATUS } from "~/constants/httpStatus";
import topicRepository from "~/repositories/topic.repository";
import { ErrorWithStatus } from "~/rules/error";

class TopicService {
    async getAll({ page, limit }: { page?: number; limit?: number}) {
        const { topics, total } = await topicRepository.findWithPagination({ page: page, limit: limit });
        return {
            data: topics.map((topic) => ({
                id: topic.id,
                title: topic.title,
                file_path: topic.filePath,
                created_at: topic.createdAt,
                updated_at: topic.updatedAt,
            })),
            pagination: { total, page: page, limit: limit },
        };
    }

    async getDetail(params: { id: string; role?: RoleType; candidateId?: string }) {
        const { id, role, candidateId } = params;

        if (role === RoleType.CANDIDATE) {
            if (!candidateId) {
                throw new ErrorWithStatus({
                    status: HTTP_STATUS.NOT_FOUND,
                    message: "Topic này không tồn tại trên hệ thống.",
                });
            }

            const canView = await topicRepository.candidateHasTopic({ topicId: id, candidateId });
            if (!canView) {
                throw new ErrorWithStatus({
                    status: HTTP_STATUS.NOT_FOUND,
                    message: "Topic này không tồn tại trên hệ thống.",
                });
            }
        }

        const topic = await topicRepository.findById(id);
        if (!topic) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Topic này không tồn tại trên hệ thống.",
            });
        }

        return {
            id: topic.id,
            title: topic.title,
            file_path: topic.filePath,
            created_at: topic.createdAt,
            updated_at: topic.updatedAt,
        };
    }

    async create(body: { title: string; file_path: string }) {
        const { title, file_path } = body;
        await topicRepository.create({ title: title, filePath: file_path });
    }

    async update(id: string, body: { title: string; file_path: string }) {
        const existed = await topicRepository.findById(id);
        if (!existed) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Topic này không tồn tại trên hệ thống.",
            });
        }

        const updated = await topicRepository.update(id, {
            title: body.title,
            filePath: body.file_path,
        });

        return {
            id: updated.id,
            title: updated.title,
            file_path: updated.filePath,
            updated_at: updated.updatedAt,
        };
    }

    async delete(id: string) {
        const existed = await topicRepository.findById(id);
        if (!existed) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Topic này không tồn tại trên hệ thống.",
            });
        }

        const hasTeams = await topicRepository.hasTeams(id);
        if (hasTeams) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.CONFLICT,
                message: "Không thể xóa topic đang được gán cho team.",
            });
        }

        await topicRepository.deleteById(id);
    }
}

const topicService = new TopicService();
export default topicService;
