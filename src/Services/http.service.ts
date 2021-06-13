import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class HttpService {
    constructor(private httpClient:HttpClient) { }
    serverUrl="http://localhost:3000/"
    signup(payload:any) {
       return this.httpClient.post(`${this.serverUrl}auth/register`,payload)
    }
    login(payload:any) {
       return this.httpClient.post(`${this.serverUrl}auth/login`,payload)
    }
    isLoggedIn() {
        if (localStorage.getItem('authentication'))
            return true
        else return false
    }
    postTodo(payload:any) {
        return this.httpClient.post(`${this.serverUrl}post-todo`,payload)
    }
    fetchAllTodos() {
        return this.httpClient.get(`${this.serverUrl}fetch-all-todos`)
    }
    deleteTodo(todo:any) {
        return this.httpClient.post(`${this.serverUrl}delete-todo`,todo)
    }
    updateTodo(todo:any) {
        return this.httpClient.put(`${this.serverUrl}update-todo`,todo)
    }
    markComplete(todo:any) {
        return this.httpClient.put(`${this.serverUrl}mark-complete-todo`,todo)
    }
}