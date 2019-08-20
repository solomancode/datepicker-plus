import { IDateElement } from "./registerDate";
export declare type TagPredicate = (dateElement: IDateElement) => boolean;
export declare const tags: {
    today: TagPredicate;
    rangeStart: TagPredicate;
    rangeEnd: TagPredicate;
    connector: TagPredicate;
    tomorrow: TagPredicate;
    yesterday: TagPredicate;
    past: TagPredicate;
    future: TagPredicate;
};
