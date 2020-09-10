import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { DataService } from './data.service';
import { handleHttpError } from './utilities';

@Injectable()
export class DataUpdatex {
    private DS: DataService

    constructor(
        private http: HttpClient
    ) { }

    setDataService(ds: DataService) {
        this.DS = ds;
    }

    /**
     * Updatex a front end object's values into the database
     * @param model The interface / class to construct the query against and build response objects from
     * @param objToUpdatex The front end object to be updatexd in the DB
     */
    updatex<T>(model: T | any, objToUpdatex: T | any,param: T|any) {
        this.DS.loadingMap[model.tableName] = true;

        if (this.DS.isOptimistic) {
            this.cacheAndNotifyUpdatexd(model, objToUpdatex);
        }
        let str = '';
        Object.keys(param).map((key,index)=>{
            if(index==0){
                str=`?${key}=${param[key]}`;
            }
            str+=`&${key}=${param[key]}`;
        })
        const url = `${this.DS.endpoint}${model.tableName}${str}`;
        this.http.patch(url, objToUpdatex, this.DS.httpOptions).subscribe(
            res => {
                if (!this.DS.isOptimistic) {
                    this.cacheAndNotifyUpdatexd(model, objToUpdatex);
                }
                this.DS.loadingMap[model.tableName] = false;
            },
            err => {
                handleHttpError(err);
                this.DS.loadingMap[model.tableName] = false;
            }
        );
    }

    updatexObs<T>(model: T | any, objToUpdatex: T | any,param: T|any): Observable<T[]> {
        let str = '';
        Object.keys(param).map((key,index)=>{
            if(index==0){
                str=`?${key}=${param[key]}`;
            }
            else{
                str+=`&${key}=${param[key]}`;
            }
        })
        const url = `${this.DS.endpoint}${model.tableName}${str}`;
        return this.http.patch<T[]>(url, objToUpdatex, this.DS.httpOptions)
            .pipe(
                catchError(handleHttpError),
                tap((res: T[]) => {
                    this.cacheAndNotifyUpdatexd(model, objToUpdatex);
                })
            );
    }

    async updatexPromise<T>(model: T | any, objToUpdatex: T | any,param: T|any): Promise<T | any> {
        let str = '';
        Object.keys(param).map((key,index)=>{
            if(index==0){
                str=`?${key}=${param[key]}`;
            }
            str+=`&${key}=${param[key]}`;
        })
        const url = `${this.DS.endpoint}${model.tableName}${str}`;
        try {
            const res = await fetch(url, {
                method: 'PATCH',
                body: JSON.stringify(objToUpdatex),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const resJson = await res.json();
            this.cacheAndNotifyUpdatexd(model, objToUpdatex);
            return resJson;
        }
        catch (err) {
            handleHttpError(err);
        }
    }

    private cacheAndNotifyUpdatexd<T>(model: T | any, objToUpdatex: T | any) {
        // Find the front end object to updatex in the cache
        const localObjToUpdatex: T | any = this.DS.cache[model.tableName].find(el => el.key === objToUpdatex.key);
        if (!localObjToUpdatex) {
            return;
        }
        let copyObjToUpdatex = Object.assign({}, localObjToUpdatex);
        copyObjToUpdatex = Object.assign(copyObjToUpdatex, objToUpdatex);

        // Copy the new object into the local object reference using Object.assign
        Object.assign(localObjToUpdatex, objToUpdatex);

        // Optimistic Updatex Frontend
        this.DS.subjectMap[model.tableName].many.next(this.DS.cache[model.tableName]);
        this.DS.subjectMap[model.tableName].one.next(localObjToUpdatex);
    }

    // TODO: 
    // UPDATEBULK
}
