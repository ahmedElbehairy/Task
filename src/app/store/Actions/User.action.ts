
export const SUCCESS = '[User] success'
export const FATLED = '[User] failed'
export const LOAD = '[User] load'

export class loadUserAction {
    type: string = LOAD
}

export class SuccessAction {
    type: string = SUCCESS
    payload: any 
    constructor(payloead:any ) {
        this.payload = payloead
    }
}
export class erorrAction {
    type: string = FATLED
    payload:any
    constructor(payloead:any ) {
        this.payload = payloead
    }
}