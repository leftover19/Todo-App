import { Button, Card, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { desState, titleState, todoState } from './RecoilAtoms/atomStates';
import axios from 'axios'
export default function Todo() {
    const { username } = useParams();

    function TodoTitle() {

        const setTodoTitle = useSetRecoilState(titleState);
        return <RecoilRoot>

            <TextField id="outlined-basic" label="Title" fullWidth={true} variant="outlined"
                onChange={(e) => {
                    setTodoTitle(e.target.value);
                }}
            />
        </RecoilRoot>
    }

    function TodoDes() {
        const setTodoDes = useSetRecoilState(desState);
        return <RecoilRoot>
            <TextField id='outlined-basic' fullWidth={true} label='Description' variant='outlined'
                onChange={(e) => {
                    setTodoDes(e.target.value);
                }}
            />
        </RecoilRoot>
    }

    function AddTodo() {
        const [todoTitle] = useRecoilState(titleState);
        const [todoDes] = useRecoilState(desState);
        // const setTodos = useSetRecoilState(todoState);
        const [todos, setTodos] = useRecoilState(todoState);

        return <RecoilRoot>

            <Button variant='contained' size='large'
                onClick={async () => {
                    try {
                        setTodos([...todos, { title: todoTitle, description: todoDes }]);
                        const response = await axios.put('http://54.196.215.241:3001/saveTodo', {
                            username,
                            todoTitle,
                            todoDes,
                        },
                            {
                                headers: {
                                    "Authorization": localStorage.getItem('token')
                                }
                            });
                        const data = await response.json();
                        console.log(data);
                    } catch (err) {
                        console.error("Error saving todo: ", err);
                    }
                }}
            >Add</Button>
        </RecoilRoot>
    }

    function RenderTodo() {
        const [todos] = useRecoilState(todoState);
        return <RecoilRoot>
            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: 20, padding: 20 }}>
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
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 25 }} >
                <Card variant='elevation' style={{ minWidth: 500, padding: 25 }}  >
                    <div >
                        <TodoTitle />
                        <br /> <br />
                        <TodoDes />
                    </div>
                    <br /> <br />
                    <AddTodo />
                </Card>
            </div>


            <Typography variant='h5' style={{ marginTop: 20 }} > Todo List </Typography>
            {/* <div> {localStorage.getItem('token')} </div> */}
            <RenderTodo />
        </RecoilRoot>
    );
}
