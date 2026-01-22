import { NextFunction, Request, Response } from "express";
import prisma from "~/configs/prisma";
import { judgeBaremOfficial } from "~/constants/barems/oficial";
import { judgeBaremTrial } from "~/constants/barems/trial";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ResponseClient } from "~/rules/response";
import judgeService from "~/services/judge.service";

const fetchBaremScore = async (judgeId: string, candidateId: string, codeBarem: string) => {
    return await prisma.baremScore.findFirst({
        where: {
            mentorId: judgeId,
            candidateId,
            codeBarem,
        },
    });
};

const enrichPartitionWithScore = async (partition: any, judgeId: string, candidateId: string) => {
    const score = await fetchBaremScore(judgeId, candidateId, partition.code);
    return {
        ...partition,
        scoreCurrent: score?.score ?? "",
        note: score?.note ?? "",
    };
};

const processNestedPartitions = async (partitions: any[], judgeId: string, candidateId: string) => {
    return await Promise.all(
        partitions.map((nestedPartition) => enrichPartitionWithScore(nestedPartition, judgeId, candidateId)),
    );
};

const processPartition = async (partition: any, judgeId: string, candidateId: string) => {
    if (partition.partitions && Array.isArray(partition.partitions)) {
        const nestedPartitions = await processNestedPartitions(partition.partitions, judgeId, candidateId);
        return {
            ...partition,
            partitions: nestedPartitions,
        };
    }
    return await enrichPartitionWithScore(partition, judgeId, candidateId);
};

const processBaremItem = async (item: any, judgeId: string, candidateId: string) => {
    const partitions = await Promise.all(
        item.partitions.map((partition: any) => processPartition(partition, judgeId, candidateId)),
    );
    return {
        ...item,
        partitions,
    };
};

export const getJudgeRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId!;
        const result = await judgeService.getJudgeRooms(userId);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ result }));
    } catch (error) {
        return next(error);
    }
};

export const getTeamsByRoom = async (req: Request<{ roomId: string }>, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId!;
        const { roomId } = req.params;
        const result = await judgeService.getTeamsByRoom(userId, roomId);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ result }));
    } catch (error) {
        return next(error);
    }
};

export const getBarem = async (
    req: Request<{ candidateId: string; roomId: string }>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { candidateId, roomId = "" } = req.params;
        const judgeId = req.userId!;
        const room = await judgeService.getDetailRoom(roomId);
        const barem = room?.modePresent === "ONLINE" ? judgeBaremTrial : judgeBaremOfficial;
        const result = await Promise.all(barem.map((item) => processBaremItem(item, judgeId, candidateId)));
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ result }));
    } catch (error) {
        return next(error);
    }
};
