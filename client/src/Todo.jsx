import { Button, Card, TextField, Typography } from '@mui/material';
// import  { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { desState, titleState, todoState } from './RecoilAtoms/atomStates';
export default function Todo () {
const {username} = useParams();
// const [todoTitle, setTodoTitle] = useState('');
// const [todoDes , setTodoDes] = useState('');
// const [todos , setTodos] = useState([])

  function TodoTitle() {

    const setTodoTitle = useSetRecoilState(titleState);
    return <RecoilRoot>

      <TextField id="outlined-basic" label="Title" fullWidth={true} variant="outlined"
        onChange={(e) =>{
          setTodoTitle(e.target.value);
        }}
      /> 
    </RecoilRoot>
  }

  function TodoDes () {
    const setTodoDes = useSetRecoilState(desState);
    return <RecoilRoot>
      <TextField id = 'outlined-basic' fullWidth={true} label='Description' variant='outlined'
        onChange={(e) =>{
          setTodoDes(e.target.value);
        }}
      />
    </RecoilRoot>
  }

  function AddTodo () {
    const [todoTitle] = useRecoilState(titleState);
    const [todoDes] = useRecoilState(desState);
    // const setTodos = useSetRecoilState(todoState);
    const [todos , setTodos] = useRecoilState(todoState);
    
    return <RecoilRoot>

      <Button variant='contained' size='large'
        onClick={() =>{
          setTodos([...todos , {title: todoTitle , description : todoDes}]);
          function callback2(data) {
            console.log({data});
          }
          function callback1(res){
            res.json({msg : 'send save todo data'}).then(callback2);
          }
          fetch('http://localhost:3001/saveTodo' , {
            method: 'PUT',
            headers : {
              'Authorization' :  localStorage.getItem("token"),
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              username,
              todoTitle, 
              todoDes, 
            })
          }).then(callback1)
        }}
      >Add</Button>
    </RecoilRoot>
  }
  
  function RenderTodo () {
    const [todos] = useRecoilState(todoState);
    return <RecoilRoot>
      <div style={{ display : 'flex' , justifyContent : 'flex-start' , margin : 20, padding: 20}}>
        <ol>
          {todos.map((todo) => (
            <li>
              <Typography key={todo.id} variant='h5'>
                {todo.title}
              </Typography>
              <Typography >
                {todo.description}
              </Typography>
            </li>
          ))}
        </ol>
      </div>

    </RecoilRoot>
  }

  return (
    <RecoilRoot >
      <Typography variant='h4' > {username}'s Todo </Typography>
      <div  style={{display:'flex' , justifyContent:'flex-start' , marginTop :25}} >
        <Card variant='elevation'style = {{ minWidth : 500 , padding: 25}}  >

          <div >
            <TodoTitle />
            <br /> <br />
            <TodoDes />
          </div>
          <br /> <br />
          <AddTodo />
        </Card>
      </div>


      <Typography variant='h5' style={{marginTop: 20  }} > Todo List </Typography>
      {/* <div> {localStorage.getItem('token')} </div> */}
      <RenderTodo />
    </RecoilRoot>
  );
}
