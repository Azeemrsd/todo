import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/auth-guard.guard';
import { LoginComponent } from './layouts/login/login.component';
import { SignupComponent } from './layouts/signup/signup.component';
import { TodoListComponent } from './layouts/Todos/todo-list/todo-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'todos', component: TodoListComponent,canActivate: [AuthGuardGuard] },
  { path: '',pathMatch:'full',redirectTo:'login' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
