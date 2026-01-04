export interface Partition {
    code: string;
    criteria: string;
    description: string;
    maxScore: number;
    scoreCurrent: number;
    note: string;
}

export interface BaremResultItem {
    target: string;
    partitions: Partition[];
}
