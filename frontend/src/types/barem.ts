export interface Partition {
    code: string;
    criteria: string;
    partitions: {
        code: string;
        description: string;
        maxScore: number;
        scoreCurrent: number;
    }[];
    description: string;
    maxScore: number;
    scoreCurrent: number;
    note: string;
}

export interface BaremResultItem {
    target: string;
    partitions: Partition[];
}
