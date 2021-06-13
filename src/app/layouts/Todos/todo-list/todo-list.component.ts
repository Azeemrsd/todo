import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/Services/http.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  allTodos: any;
  updateMode: boolean = false;
  todoToBeUpdated: any;
  updateTodoIndex: number = -1;
  constructor(private fb:FormBuilder, private toastr:ToastrService, private httpService:HttpService) { }
  todoForm: FormGroup = this.fb.group({
    todo:['',Validators.required]
  })

  ngOnInit(): void {
    this.httpService.fetchAllTodos().subscribe((res:any) => {
      this.allTodos = res.result
    }, err => {
      this.toastr.error(err.title,err.message);
      
    })
  }
  postTodo() {
    if (this.todoForm.status === 'INVALID') {
      this.toastr.error('Cannot add empty todo!', 'Please write a todo.')
      return 
    }
    this.httpService.postTodo(this.todoForm.value).subscribe((res: any) => {
      if(res.status) {
        this.allTodos = res.result;
        this.todoForm.reset()
      }
      this.toastr.success(res.title,res.message)
    }, err => {
      this.toastr.error(err.title,err.message)
    })
  }
  performUpdate() {
    const oldTodo = { ...this.todoToBeUpdated }
    //assigning new value to the old todo and passing it with old id
    oldTodo.todo = this.todoForm.value.todo;
    this.httpService.updateTodo(oldTodo).subscribe((res: any) => {
      if (res.status) {
        this.todoForm.reset()
        this.allTodos = res.result;
        this.updateMode = false
      }
      this.toastr.success(res.title,res.message);
    }, err => {
      this.toastr.error(err.title,err.message);
      
    })
  }
  updateTodo(index: number) {
    if (this.allTodos[index].isCompleted) {
      this.toastr.error('Cannot edit completed todo', 'Action is not allowed!');
      return;
    }
    this.updateMode = true;
    this.todoToBeUpdated = this.allTodos[index];
    this.updateTodoIndex = index
    this.todoForm.patchValue({
      todo: this.allTodos[index].todo
    });
    this.allTodos.splice(index, 1);
  }
}
