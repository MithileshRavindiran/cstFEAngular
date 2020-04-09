export class Transactions {
    constructor(
        public reference: string,
        public accountNumber: string,
        public description: string,
        public startBalance: number ,
        public mutation: number,
        public endBalance:  number,
        public isInvalidRecord: boolean,
        public reason: string
    ) {}
}