import React, { useEffect, useState } from "react";


const Task = () => {
    
    const [task, setTask] = useState('');
    const [todo, setTodo] = useState([]);
    const [user, setUser] = useState('');

    useEffect(() => {
      getTodo()
    }, [])

    useEffect(() => {
        if(user.name) {
            fetch(`https://playground.4geeks.com/todo/users/${user.name}`)
            .then(resp => resp.json())
            .then(respJson => {
                console.log(respJson)
                console.log(respJson.todos)
                const serverTodos = respJson.todos;
                setTodo(serverTodos);
            })
            
        }
    }, [user])

    useEffect(() => {
        fetch(`https://playground.4geeks.com/todo/users/Miranda`,
            {method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
               
            }
        )
        .then(resp => {
            if(resp.ok) {
                getTodo()
            }
            resp.json()})
        .then(data => console.log(data))
        .catch(() => {
            setUser({ name: 'Miranda'})
        })
    })

    const getTodo = () => {
        fetch('https://playground.4geeks.com/todo/users/Miranda')
        .then(resp => resp.json())
        .then(respJson => {
            console.log(respJson)
            console.log(respJson.todos)
            const serverTodos = respJson.todos;
            setTodo(serverTodos);
        })
        .catch (error => console.log(error))
    }

    const createTodo = (task) => {
        fetch('https://playground.4geeks.com/todo/todos/Miranda',
            {method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify ({
                    label: task,
                    is_done: false
                  })
            }
        )
        .then(resp => {
            if(resp.ok) {
                getTodo()
            }
            resp.json()})
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }


    const handleInputChange = (e) => {
        setTask(e.target.value);
    };
    
    const handleKeyPress =(e) => {
        if (e.key === 'Enter' && task.trim() !== '') {
            createTodo(task)
            setTask('');
            createUser(user)
        };
    };

    const deleteTask = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`,
            {method: 'DELETE',
                headers: {
                    'Content-Type':'application/json'
                },
               
            }
        )
        .then(resp => {
            if(resp.ok) {
                getTodo()
            }
            resp.json()})
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    const deleteUser = () =>{
        fetch(`https://playground.4geeks.com/todo/users/Miranda`, {
           method: 'DELETE',
           headers: {
               'content-type': 'application/json' 
           }
       })
       setTask([]);
       createUser();
   }; 


  return (
    <div className="container">
        <h1 className="title mt-2"> To Do A List</h1>
        <input 
        type="text"  
        className="input mb-3" 
        placeholder="Add new Task" 
        value={task} 
        onChange={handleInputChange} 
        onKeyPress={handleKeyPress}
        />

        <ul className="task">
            {todo?.map((task) => (
                <li className="index" key={task.id}>

                    <span>{task.label}</span>

                    <button 
                    className="delete" 
                    onClick={() => deleteTask(task.id)}>
                        <i className="fa-solid fa-x"/>
                    </button>

                </li>
            ))}
           <button 
             onClick={() => deleteUser()}>
                <i className="fa-solid fa-x"/>
                </button>
        </ul>
        <p className="mt-3">On Going: {todo.length}</p>
    </div>
  );
}

 export default Task;