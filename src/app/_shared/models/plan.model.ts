import { ProgressModel } from '.';
// import { ProgressModel } from '@models';

export interface PlanModel {
    topic: string;
    tags: string[];
    summary: string;
    projectedFinishDate: Date;
    progress: ProgressModel[];
}