

import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import Todo from './Todo';
import axios from 'axios'



const TodoInput =()=> {

  const [onChange, setOnChange] = useState('')
  const [addTask, setAddTask] = useState([])
  const ApiEndPoint = 'http://congdinh88.pythonanywhere.com/todoApp/'

  useEffect(()=>{
    const getDataSync =async ()=>{
      let dataJson = await axios.get(ApiEndPoint)
      return dataJson.data
    }
  
    getDataSync().then((value)=>{
      setAddTask(value)
    })
  },[])
  

  const postData = async()=>{
    let dataJson = await axios.post(ApiEndPoint,{
      name: onChange
    })
    return dataJson.data
  }
  const onHandClick =(e)=>{
      e.preventDefault()
      postData().then(function(res){
    })
    setOnChange('')
  }
  

  const OnHandChange =(e)=>{
    setOnChange(e.target.value)
  }
  
  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Thêm việc cần làm"
          value={onChange}
          onChange={OnHandChange}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={onHandClick} disabled={!onChange? true:false}>
          <AddOutlinedIcon />
        </IconButton>
      </Paper>
      <Todo/>
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    </>
  );
}

export default TodoInput