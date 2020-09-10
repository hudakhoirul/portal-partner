import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IDocumentFile extends IDatabaseObj{
    desc: string;
    imageData: string;
    imageHeight: string;
    imageWidth: string;
    status: string;
}

// export interface IdocuDentFileData extends IDatabaseObj{
//     bankCode: string;
//     bankId: string;
//     bankName: string;
//     isDelete: boolean;
//     statusDescription: string;

// }

export class DocumentFile implements IDocumentFile{
    static tableName: string = TableMap.DocumentFiles; 
    desc: string;
    imageData: string;
    imageHeight: string;
    imageWidth: string;
    status: string;
    

    constructor(props: IDocumentFile) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
