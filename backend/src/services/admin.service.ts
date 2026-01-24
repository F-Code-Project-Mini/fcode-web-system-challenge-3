import { judgeRooms } from "./../seeders/data-raw/rooms";
import { RoleType } from "~/constants/enums";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ErrorWithStatus } from "~/rules/error";
import adminRepository from "~/repositories/admin.repository";
import userRepository from "~/repositories/user.repository";
import prisma from "~/configs/prisma";

class AdminService {
    public getAllUsers = async () => {
        const users = await adminRepository.getAllUsers();
        return users;
    };

    public getUserById = async (userId: string) => {
        const user = await adminRepository.getUserById(userId);

        if (!user) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Người dùng không tồn tại!",
            });
        }

        return {
            ...user,
            judgeRooms: user.judgeRooms?.map((jr) => jr.room),
        };
    };

    public createUser = async (email: string, fullName: string, role: number[]) => {
        const user = await adminRepository.createUser(email, fullName, role);

        return {
            ...user,
            password: undefined,
        };
    };

    public addRoleToUser = async (userId: string, roleName: RoleType) => {
        const user = await adminRepository.getUserById(userId);
        if (!user) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Người dùng không tồn tại!",
            });
        }

        const roleId = await adminRepository.getRoleIdByName(roleName);
        if (!roleId) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Role không tồn tại!",
            });
        }

        const existingRole = user.userRoles.some((ur) => ur.role.role === roleName);
        if (existingRole) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: "User đã có role này rồi!",
            });
        }

        await adminRepository.addRoleToUser(userId, roleId);

        return { message: "Thêm role thành công!" };
    };

    public removeRoleFromUser = async (userId: string, roleId: number) => {
        const user = await adminRepository.getUserById(userId);
        if (!user) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Người dùng không tồn tại!",
            });
        }

        await adminRepository.removeRoleFromUser(userId, roleId);

        return { message: "Xóa role thành công!" };
    };

    public getAllRooms = async () => {
        const rooms = await adminRepository.getAllRooms();

        // Thêm điểm cho mỗi phòng (không trả về judgeRooms)
        const roomsWithScores = await Promise.all(
            rooms.map(async (room) => {
                if (!room.team || !room.judgeRooms || room.judgeRooms.length === 0) {
                    return {
                        id: room.id,
                        roomNumber: room.roomNumber,
                        presentPhase: room.presentPhase,
                        modePresent: room.modePresent,
                        startTime: room.startTime,
                        endTime: room.endTime,
                        team: room.team,
                        _count: room._count,
                        teamScore: 200,
                    };
                }

                // Lấy điểm từ tất cả judges
                const judgeScores = await Promise.all(
                    room.judgeRooms.map(async (jr) => {
                        const candidateScores = await Promise.all(
                            room.team!.candidates.map(async (candidate) => {
                                const score = await userRepository.getScoreJudge(jr.judge.id, candidate.id);
                                return score || 0;
                            }),
                        );
                        return candidateScores.reduce((sum, s) => sum + s, 0);
                    }),
                );

                // Tính teamScore: TRIAL = tổng, OFFICIAL = trung bình
                let teamScore = 200;
                const scoredJudges = judgeScores.filter((s) => s > 0);
                if (scoredJudges.length > 0) {
                    if (room.presentPhase === "TRIAL") {
                        // TRIAL: chỉ lấy tổng điểm của judge duy nhất (không tính TB)
                        teamScore = scoredJudges[0];
                    } else {
                        // OFFICIAL: tính trung bình
                        teamScore = scoredJudges.reduce((sum, s) => sum + s, 0) / scoredJudges.length;
                    }
                }

                return {
                    id: room.id,
                    roomNumber: room.roomNumber,
                    presentPhase: room.presentPhase,
                    modePresent: room.modePresent,
                    startTime: room.startTime,
                    endTime: room.endTime,
                    team: room.team,
                    _count: room._count,
                    teamScore,
                };
            }),
        );

        return roomsWithScores;
    };

    public getRoomDetail = async (roomId: string) => {
        const room = await adminRepository.getRoomDetail(roomId);
        if (!room) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Phòng chấm không tồn tại!",
            });
        }

        if (!room.team) {
            return room;
        }

        // Xác định type dựa vào present_phase
        const scoreType = room.presentPhase === "TRIAL" ? "TRIAL_PRESENTATION" : "OFFICIAL_PRESENTATION";

        // Tính điểm cho từng judge
        const judgesWithScores = await Promise.all(
            room.judgeRooms.map(async (jr) => {
                // Lấy điểm của judge này cho tất cả candidates trong team
                const candidateScores = await Promise.all(
                    room.team!.candidates.map(async (candidate) => {
                        const score = await userRepository.getScoreJudge(
                            jr.judge.id,
                            candidate.id,
                            "OFFICIAL_PRESENTATION",
                        );
                        return {
                            candidateId: candidate.id,
                            candidateName: candidate.user?.fullName,
                            score: score || 0,
                        };
                    }),
                );

                const totalScore = candidateScores.reduce((sum, c) => sum + c.score, 0);

                return {
                    id: jr.id,
                    judge: jr.judge,
                    totalScore: totalScore,
                    candidateScores,
                    hasScored: totalScore > 0,
                };
            }),
        );

        return {
            ...room,
            judgeRooms: judgesWithScores,
        };
    };

    public addJudgeToRoom = async (judgeIds: string[], roomId: string) => {
        let addedCount = 0;
        const errors: string[] = [];

        for (const judgeId of judgeIds) {
            try {
                const user = await adminRepository.getUserById(judgeId);
                if (!user) {
                    errors.push(`Judge với ID ${judgeId} không tồn tại`);
                    continue;
                }

                const hasJudgeRole = await userRepository.hasRole(user.id, RoleType.JUDGE);
                if (!hasJudgeRole) {
                    errors.push(`${user.fullName} không có role JUDGE`);
                    continue;
                }

                const isAlreadyInRoom = await adminRepository.isJudgeInRoom(judgeId, roomId);
                if (isAlreadyInRoom) {
                    errors.push(`${user.fullName} đã được thêm vào phòng này rồi`);
                    continue;
                }

                await adminRepository.addJudgeToRoom(judgeId, roomId);
                addedCount++;
            } catch (error) {
                errors.push(`Lỗi khi thêm judge ${judgeId}`);
            }
        }

        if (addedCount === 0) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: errors.length > 0 ? errors.join(", ") : "Không thể thêm judge nào!",
            });
        }

        return {
            message: `Thêm ${addedCount} judge(s) vào phòng thành công!`,
            added: addedCount,
            errors: errors.length > 0 ? errors : undefined,
        };
    };

    public removeJudgeFromRoom = async (judgeRoomId: string) => {
        await adminRepository.removeJudgeFromRoom(judgeRoomId);

        return { message: "Xóa judge khỏi phòng thành công!" };
    };

    public getJudgeUsers = async () => {
        return await adminRepository.getJudgeUsers();
    };

    public getAllTeams = async () => {
        const teams = await adminRepository.getAllTeams();

        const teamsWithScores = await Promise.all(
            teams.map(async (team) => {
                const candidatesWithScores = await Promise.all(
                    team.candidates.map(async (candidate) => {
                        const scoreMentor = await userRepository.getScoreMentor(team.mentorship.mentorId, candidate.id);

                        const scoreJudge = await userRepository.getScoreJudge(
                            "",
                            candidate.id,
                            "OFFICIAL_PRESENTATION",
                        );

                        return {
                            ...candidate,
                            scoreMentor: scoreMentor || null,
                            scoreJudge,
                        };
                    }),
                );

                const teamScore = await this.getTeamScore(team.id);

                return {
                    ...team,
                    candidates: candidatesWithScores,
                    teamScore,
                };
            }),
        );

        return teamsWithScores;
    };

    private getTeamScore = async (teamId: string): Promise<number | null> => {
        const team = await adminRepository.getAllTeams().then((teams) => teams.find((t) => t.id === teamId));
        if (!team || team.candidates.length === 0) {
            return null;
        }

        const representativeCandidate = team.candidates[0];

        const teamBaremScores = await prisma.baremScore.findMany({
            where: {
                candidateId: representativeCandidate.id,
                role: "JUDGE",
                codeBarem: {
                    startsWith: "#judge_official_team_",
                },
            },
            select: {
                mentorId: true,
                score: true,
                codeBarem: true,
            },
        });

        console.log("Team ID:", teamId);
        console.log("Representative Candidate ID:", representativeCandidate.id);
        console.log("Team Barem Scores:", teamBaremScores);

        if (teamBaremScores.length === 0) {
            return null;
        }

        const judgeScores = new Map<string, number>();
        teamBaremScores.forEach((scoreRecord) => {
            const currentScore = judgeScores.get(scoreRecord.mentorId) || 0;
            judgeScores.set(scoreRecord.mentorId, currentScore + scoreRecord.score);
        });

        console.log("Judge Scores Map:", Array.from(judgeScores.entries()));

        const judges = Array.from(judgeScores.values());
        if (judges.length === 0) {
            return null;
        }

        const totalScore = judges.reduce((sum, score) => sum + score, 0);
        const averageScore = totalScore / judges.length;

        console.log("Total Score:", totalScore, "Average Score:", averageScore);

        return Number(averageScore.toFixed(2));
    };

    private getJudgeScoresForCandidate = async (teamId: string, candidateId: string): Promise<number | null> => {
        // Lấy tất cả judges của team thông qua room
        const rooms = await adminRepository.getAllRooms();
        const teamRoom = rooms.find((room) => room.team?.id === teamId && room.presentPhase === "OFFICIAL");

        if (!teamRoom) {
            return null;
        }

        // Lấy chi tiết phòng để có judges
        const roomDetail = await adminRepository.getRoomDetail(teamRoom.id);
        if (!roomDetail || !roomDetail.judgeRooms || roomDetail.judgeRooms.length === 0) {
            return null;
        }

        // Xác định type dựa vào present_phase: TRIAL hoặc OFFICIAL
        const scoreType = roomDetail.presentPhase === "TRIAL" ? "TRIAL_PRESENTATION" : "OFFICIAL_PRESENTATION";

        // Lấy điểm từ từng judge và tính trung bình
        const scores = await Promise.all(
            roomDetail.judgeRooms.map(async (jr) => {
                const score = await userRepository.getScoreMentor(jr.judge.id, candidateId);
                return score || 0;
            }),
        );

        // Tính điểm trung bình
        const totalScore = scores.reduce((sum, s) => sum + s, 0);
        return scores.length > 0 ? totalScore / scores.length : null;
    };
}

const adminService = new AdminService();
export default adminService;
