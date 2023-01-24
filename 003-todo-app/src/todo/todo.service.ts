import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {


  private todos:Todo[] = [
    { id:1,description:'Todo #1', done : false },
    { id:2,description:'Todo #2', done : false },
    { id:3,description:'Todo #3', done : true },
  ]

  create(createTodoDto: CreateTodoDto) {

    const todo = new Todo()
    todo.id = Math.max(...this.todos.map(todo => todo.id),0) + 1
    todo.description = createTodoDto.description
    this.todos.push( todo )
    return todo;
  }

  findAll() {
    if(!this.todos.length) throw new NotFoundException('No existen productos')
    return this.todos;
  }

  findOne(id: number) {
    const todo = this.todos.find(todo => todo.id === id)
    if(!todo) throw new NotFoundException(`Todo with #${id} not found`)
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    this.findOne(id)
    this.todos = this.todos.map(todo=>todo.id === id ?{ ...todo,...updateTodoDto,id }:todo)
    return this.findOne(id);
  }

  remove(id: number) {
    this.findOne(id)
    this.todos = this.todos.filter(todo=>todo.id !== id)
  }
}
