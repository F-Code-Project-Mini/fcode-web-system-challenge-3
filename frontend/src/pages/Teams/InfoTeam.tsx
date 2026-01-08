import { BookOpen, User } from "lucide-react";
import React from "react";
import type { TeamType } from "~/types/team.types";

const TopicTeam = ({ team }: { team: TeamType }) => {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs transition-all">
            <div className="border-b border-gray-200/70 bg-gradient-to-br from-gray-50/80 to-white px-5 py-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <BookOpen className="text-primary h-4 w-4" />
                    Thông tin nhóm
                </h3>
            </div>
            <div className="space-y-3 px-5 py-4">
                <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                        <BookOpen className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500">Đề tài</p>
                        <p className="text-primary mt-0.5 text-sm leading-relaxed font-semibold">
                            {team.topic?.title || "Chưa có đề tài"}
                        </p>
                        {team.topic?.filePath && (
                            <a
                                href={team.topic.filePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary mt-1 inline-block text-xs font-medium hover:underline"
                            >
                                Xem chi tiết đề tài →
                            </a>
                        )}
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                        <User className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500">Mentor</p>
                        <p className="text-primary mt-0.5 text-sm font-semibold">
                            {team.mentorship?.mentor?.fullName || "Chưa có mentor"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicTeam;
