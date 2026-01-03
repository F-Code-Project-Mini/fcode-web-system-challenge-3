export interface Partition {
    criteria: string;
    description: string;
    maxScore: number;
}

export interface BaremResultItem {
    target: string;
    partitions: Partition[];
}
