import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/Services/http.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(private httpService: HttpService,
  private toastr:ToastrService) { }
  @Input() allTodos: any;
  @Output() updateTodo = new EventEmitter<number>();
  ngOnInit(): void {
  }
  edit(i:number) {
    this.updateTodo.emit(i)
  }
  complete(i: number) {
    if (this.allTodos[i].isCompleted === true) {
      this.toastr.error('Todo already completed', 'Cannot perform action');
      return
    }
    this.httpService.markComplete(this.allTodos[i]).subscribe((res: any) => {
      if (res.status) {
        this.allTodos[i].isCompleted = true;
      }
      this.toastr.success(res.title,res.message)
    }, err => {
      this.toastr.error(err.title,err.message)
    })
  }
  delete(i:number) {
    this.httpService.deleteTodo(this.allTodos[i]).subscribe((res:any) => {
      if (res.status) {
        this.allTodos.splice(i, 1);
      }
      this.toastr.success(res.title,res.message)
    }, err => {
      this.toastr.error(err.title,err.message)
    })
  }
}
