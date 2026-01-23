import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import JudgeApi from "~/api-requests/judge.requests";
import TeamApi from "~/api-requests/team.requests";
import { useParams } from "react-router";
import { socket } from "~/utils/socket";
import useAuth from "~/hooks/useAuth";
import type { CandidateType } from "~/types/team.types";

import { ShowCandidates } from "./ShowCandidates";
import BaremTeam from "./Team";
import ChoiceBarem from "./ChoiceBarem";
import PersonalBarem from "./Personal";
import Notification from "./Notification";

type ParamsBarem = {
    id: string;
    roomId: string;
    candidateId?: string;
};

const JudgeBaremPage = () => {
    const params = useParams<ParamsBarem>();
    const { user } = useAuth();
    const [barem, setBarem] = useState<"personal" | "team">("personal");

    const [scaleBarem, setScaleBarem] = useState(false);
    const [scores, setScores] = useState<{ [key: string]: number }>({});
    const [notes, setNotes] = useState<{ [key: string]: string }>({});
    const isDataInitialized = useRef(false);

    // State riêng cho Team Barem
    const [scoresTeam, setScoresTeam] = useState<{ [key: string]: number }>({});
    const [notesTeam, setNotesTeam] = useState<{ [key: string]: string }>({});
    const isDataInitializedTeam = useRef(false);

    const debounceMapRef = useRef<Record<string, number>>({});
    const debounceNoteMapRef = useRef<Record<string, number>>({});

    // Debounce refs riêng cho Team
    const debounceMapTeamRef = useRef<Record<string, number>>({});
    const debounceNoteTeamMapRef = useRef<Record<string, number>>({});

    const { data: candidates } = useQuery({
        queryKey: ["judge", "get-team", params.id],
        queryFn: async () => {
            const res = await TeamApi.getTeamById(params.id || "");
            return res.result;
        },
        enabled: !!params.id,
    });
    const isLeader = params?.candidateId === candidates?.leader?.id;

    const [candidateActive, setcandidateActive] = useState<CandidateType | undefined>(undefined);

    useEffect(() => {
        if (!candidateActive && candidates?.candidates?.length) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setcandidateActive(
                candidates.candidates.find((c) => c.id === params.candidateId) || candidates.candidates[0],
            );
        }
        // Reset flag khi chuyển candidate
        isDataInitialized.current = false;
    }, [candidates, candidateActive, params.candidateId]);

    const { data: baremJudgePersonal } = useQuery({
        queryKey: ["judge-barem", candidateActive, params.candidateId, params.roomId],
        queryFn: async () => {
            const res = await JudgeApi.getBarem(candidateActive?.id || "", params.roomId || "");
            return res.result;
        },
        enabled: !!candidateActive,
    });

    const { data: baremJudgeTeam } = useQuery({
        queryKey: ["judge-barem-team", params.id, params.roomId],
        queryFn: async () => {
            const res = await JudgeApi.getBaremTeam(params.candidateId || "");
            return res.result;
        },
        enabled: !!params.id,
    });
    // const { data: roomDetail } = useQuery({
    //     queryKey: ["judge-barem-room-detail", params.roomId],
    //     queryFn: async () => {
    //         const res = await JudgeApi.getDetailRoom(params.roomId || "");
    //         return res.result;
    //     },
    //     enabled: !!params.roomId,
    // });
    const leaderId = candidates?.leader?.id || "";

    // Reset lại data (k reset chuyển cái khác nó vẫn giữ lại data cũ của ứng viên khác)
    useEffect(() => {
        if (!baremJudgePersonal) return;

        const newScores: { [key: string]: number } = {};
        const newNotes: { [key: string]: string } = {};
        baremJudgePersonal.forEach((item) => {
            item.partitions.forEach((partition, partitionIndex) => {
                partition.partitions?.forEach((subPart, subIndex) => {
                    const scoreKey = `${item.target}-${partitionIndex}-${subIndex}`;
                    if (subPart.scoreCurrent !== undefined && subPart.scoreCurrent !== null) {
                        newScores[scoreKey] = subPart.scoreCurrent;
                    }

                    if (subPart.note !== undefined && subPart.note !== null) {
                        newNotes[scoreKey] = subPart.note;
                    }
                });
            });
        });

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setScores(newScores);
        setNotes(newNotes);

        // Đánh dấu data đã được initialized để tránh emit socket không cần thiết
        setTimeout(() => {
            isDataInitialized.current = true;
        }, 100);
    }, [baremJudgePersonal]);

    // Reset lại data cho Team Barem (không phụ thuộc vào candidateActive)
    useEffect(() => {
        if (!baremJudgeTeam) return;

        const newScoresTeam: { [key: string]: number } = {};
        const newNotesTeam: { [key: string]: string } = {};
        baremJudgeTeam.forEach((item) => {
            item.partitions.forEach((partition, partitionIndex) => {
                partition.partitions?.forEach((subPart, subIndex) => {
                    const scoreKey = `team-${item.target}-${partitionIndex}-${subIndex}`;
                    if (subPart.scoreCurrent !== undefined && subPart.scoreCurrent !== null) {
                        newScoresTeam[scoreKey] = subPart.scoreCurrent;
                    }

                    if (subPart.note !== undefined && subPart.note !== null) {
                        newNotesTeam[scoreKey] = subPart.note;
                    }
                });
            });
        });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setScoresTeam(newScoresTeam);
        setNotesTeam(newNotesTeam);

        // Đánh dấu data đã được initialized để tránh emit socket không cần thiết
        setTimeout(() => {
            isDataInitializedTeam.current = true;
        }, 100);
    }, [baremJudgeTeam]);

    const totalMaxScore =
        baremJudgePersonal?.reduce((sum, item) => {
            if (!isLeader && item.target == "Leader") {
                return sum;
            }
            return (
                sum +
                item.partitions.reduce((partSum, partition) => {
                    return (
                        partSum + (partition.partitions?.reduce((subSum, subPart) => subSum + subPart.maxScore, 0) || 0)
                    );
                }, 0)
            );
        }, 0) ?? 0;

    const totalCurrentScore = Object.values(scores).reduce((sum, score) => sum + (score || 0), 0);

    // Tính tổng điểm cho Team
    const totalMaxScoreTeam =
        baremJudgeTeam?.reduce((sum, item) => {
            return (
                sum +
                item.partitions.reduce((partSum, partition) => {
                    return (
                        partSum + (partition.partitions?.reduce((subSum, subPart) => subSum + subPart.maxScore, 0) || 0)
                    );
                }, 0)
            );
        }, 0) ?? 0;

    const totalCurrentScoreTeam = Object.values(scoresTeam).reduce((sum, score) => sum + (score || 0), 0);

    const handleScoreChange = (key: string, value: string) => {
        const num = parseFloat(value);

        setScores((prev) => ({
            ...prev,
            [key]: isNaN(num) ? 0 : num,
        }));
    };

    const handleNoteChange = useCallback((key: string, note: string) => {
        setNotes((prev) => ({
            ...prev,
            [key]: note,
        }));
    }, []);

    // Handlers riêng cho Team
    const handleScoreChangeTeam = (key: string, value: string) => {
        const num = parseFloat(value);

        setScoresTeam((prev) => ({
            ...prev,
            [key]: isNaN(num) ? 0 : num,
        }));
    };

    const handleNoteChangeTeam = useCallback((key: string, note: string) => {
        setNotesTeam((prev) => ({
            ...prev,
            [key]: note,
        }));
    }, []);

    useEffect(() => {
        if (!socket.connected) socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);

    // useEffect riêng cho scores
    useEffect(() => {
        if (!baremJudgePersonal || !candidateActive || !isDataInitialized.current) return;

        Object.entries(scores).forEach(([key, score]) => {
            const [target, partitionIndex, subIndex] = key.split("-");
            const partition = baremJudgePersonal?.find((item) => item.target === target)?.partitions[
                Number(partitionIndex)
            ];
            const subPart = partition?.partitions?.[Number(subIndex)];

            if (!subPart) return;

            if (debounceMapRef.current[subPart.code]) {
                clearTimeout(debounceMapRef.current[subPart.code]);
            }

            debounceMapRef.current[subPart.code] = setTimeout(() => {
                socket.emit("SAVE_SCORE", {
                    role: "JUDGE",
                    type: "OFFICIAL_PRESENTATION",
                    mentorId: user.id,
                    candidateId: candidateActive.id,
                    codeBarem: subPart.code,
                    score,
                    note: notes[key] || "",
                });
            }, 500);
        });
    }, [scores, baremJudgePersonal, candidateActive, user.id, notes]);

    // useEffect riêng cho notes
    useEffect(() => {
        if (!baremJudgePersonal || !candidateActive || !isDataInitialized.current) return;

        Object.entries(notes).forEach(([key, note]) => {
            const [target, partitionIndex, subIndex] = key.split("-");
            const partition = baremJudgePersonal?.find((item) => item.target === target)?.partitions[
                Number(partitionIndex)
            ];
            const subPart = partition?.partitions?.[Number(subIndex)];

            if (!subPart) return;

            if (debounceNoteMapRef.current[subPart.code]) {
                clearTimeout(debounceNoteMapRef.current[subPart.code]);
            }

            debounceNoteMapRef.current[subPart.code] = setTimeout(() => {
                socket.emit("SAVE_SCORE", {
                    role: "JUDGE",
                    type: "OFFICIAL_PRESENTATION",
                    mentorId: user.id,
                    candidateId: candidateActive.id,
                    codeBarem: subPart.code,
                    score: scores[key] || 0,
                    note: note,
                });
            }, 500);
        });
    }, [notes, baremJudgePersonal, candidateActive, user.id, scores]);

    // useEffect riêng cho scores Team
    useEffect(() => {
        if (!baremJudgeTeam || !isDataInitializedTeam.current) return;

        Object.entries(scoresTeam).forEach(([key, score]) => {
            const keyWithoutPrefix = key.replace("team-", "");
            const keyParts = keyWithoutPrefix.split("-");

            const subIndex = keyParts[keyParts.length - 1];
            const partitionIndex = keyParts[keyParts.length - 2];
            const target = keyParts.slice(0, -2).join("-");

            console.log("Team Score Change:", { key, target, partitionIndex, subIndex });

            const partition = baremJudgeTeam?.find((item) => item.target === target)?.partitions[
                Number(partitionIndex)
            ];
            const subPart = partition?.partitions?.[Number(subIndex)];

            if (!subPart) {
                console.warn("SubPart not found for team key:", key);
                return;
            }

            if (debounceMapTeamRef.current[subPart.code]) {
                clearTimeout(debounceMapTeamRef.current[subPart.code]);
            }

            debounceMapTeamRef.current[subPart.code] = setTimeout(() => {
                console.log("Emitting SAVE_SCORE for team:", {
                    codeBarem: subPart.code,
                    score,
                    teamId: params.id,
                });
                socket.emit("SAVE_SCORE", {
                    role: "JUDGE",
                    type: "OFFICIAL_PRESENTATION",
                    mentorId: user.id,
                    candidateId: leaderId,
                    codeBarem: subPart.code,
                    score,
                    note: notesTeam[key] || "",
                });
            }, 500);
        });
    }, [scoresTeam, baremJudgeTeam, user.id, notesTeam, params.id]);

    // useEffect riêng cho notes Team
    useEffect(() => {
        if (!baremJudgeTeam || !isDataInitializedTeam.current) return;

        Object.entries(notesTeam).forEach(([key, note]) => {
            const keyWithoutPrefix = key.replace("team-", "");
            const keyParts = keyWithoutPrefix.split("-");

            const subIndex = keyParts[keyParts.length - 1];
            const partitionIndex = keyParts[keyParts.length - 2];

            const target = keyParts.slice(0, -2).join("-");

            const partition = baremJudgeTeam?.find((item) => item.target === target)?.partitions[
                Number(partitionIndex)
            ];
            const subPart = partition?.partitions?.[Number(subIndex)];

            if (!subPart) return;

            if (debounceNoteTeamMapRef.current[subPart.code]) {
                clearTimeout(debounceNoteTeamMapRef.current[subPart.code]);
            }

            debounceNoteTeamMapRef.current[subPart.code] = setTimeout(() => {
                console.log("Emitting SAVE_SCORE for team note:", {
                    codeBarem: subPart.code,
                    note,
                    teamId: params.id,
                });
                socket.emit("SAVE_SCORE", {
                    role: "JUDGE",
                    type: "OFFICIAL_PRESENTATION",
                    mentorId: user.id,
                    teamId: params.id,
                    codeBarem: subPart.code,
                    score: scoresTeam[key] || 0,
                    note: note,
                });
            }, 500);
        });
    }, [notesTeam, baremJudgeTeam, user.id, scoresTeam, params.id]);

    return (
        <section className="px-4 sm:px-0">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Chấm điểm Present</h1>
                <p className="mt-2 text-sm text-gray-600">Vui lòng chọn ứng viên và điền điểm cho từng tiêu chí</p>
            </div>
            <Notification />

            <ShowCandidates
                candidates={candidates}
                candidateActive={candidateActive}
                setcandidateActive={setcandidateActive}
            />
            <ChoiceBarem barem={barem} setBarem={setBarem} />

            {barem === "team" ? (
                <BaremTeam
                    scaleBarem={scaleBarem}
                    setScaleBarem={setScaleBarem}
                    baremJudge={baremJudgeTeam}
                    scores={scoresTeam}
                    handleScoreChange={handleScoreChangeTeam}
                    notes={notesTeam}
                    handleNoteChange={handleNoteChangeTeam}
                    totalCurrentScore={totalCurrentScoreTeam}
                    totalMaxScore={totalMaxScoreTeam}
                    teamId={params.id || ""}
                    reportLink={candidates?.reportLink || ""}
                />
            ) : (
                <PersonalBarem
                    scaleBarem={scaleBarem}
                    setScaleBarem={setScaleBarem}
                    baremJudge={baremJudgePersonal}
                    scores={scores}
                    handleScoreChange={handleScoreChange}
                    notes={notes}
                    handleNoteChange={handleNoteChange}
                    totalCurrentScore={totalCurrentScore}
                    totalMaxScore={totalMaxScore}
                    candidateActive={candidateActive}
                    isLeader={isLeader}
                />
            )}
        </section>
    );
};

export default JudgeBaremPage;
