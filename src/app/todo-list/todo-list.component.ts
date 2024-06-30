import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import axios from 'axios';
import { Note } from '../model/Note';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  ngOnInit(): void{
    this.listAll()
  }

  formulario = new FormGroup({
    note: new FormControl('', Validators.required),
    concluded: new FormControl(false)
  })

  notes:Note[];

  async create(request:FormGroup){
    await axios.post('https://localhost:7041/api/todo', request.value);
    this.formulario.reset();
    this.listAll();
  }

  async listAll(){ 
    try {
      let response = await axios.get('https://localhost:7041/api/todo');
      this.notes = Object.values(response.data);   
    } catch (error) {
      console.log(error);      
    }    
  }
    
  async update(id:number, note:string, concluded:boolean){   
    let json:Partial<Note> = {note, concluded: !concluded}
    let response = await axios.put(`https://localhost:7041/api/todo/${id}`, json);
    this.listAll();
  }

  async delete(id:number){
    try {
      await axios.delete(`https://localhost:7041/api/todo/${id}`);
      this.listAll();
    } catch (error) {
      console.log(error);      
    }    
  }
}
