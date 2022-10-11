

import React, {useState, useEffect} from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from 'axios'
import FormDialog from './DialogPut';

const  Todo =()=>{
    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(false)
    const [onChange, setOnChange] = useState('')
    const [id, setId] = useState('')

    const ApiEndPoint = 'http://congdinh88.pythonanywhere.com/todoApp/'

    const onHandleChange =(e)=>{
        setOnChange(e.target.value)
    }

    const onHandleOpen =(post)=>{
        setOpen(true)
        setId(post.id)
        setOnChange(post.name)
    }
    
    const onHandleClose =()=>{
        setOpen(false)
    }

    useEffect(()=>{
        const getPosts = async ()=>{
            let {data:res} = await axios.get(ApiEndPoint)
            setPosts(res)
        }
        getPosts()
    },[])

    const handleUpdate = async (post)=>{
        const complete = {complete: post.complete? false: true}
        await axios.patch(ApiEndPoint + post.id +'/', complete)
    }
    
    const onHandleUpdate = async ()=>{
        const name = {name: onChange}
        await axios.patch(ApiEndPoint + id +'/', name)
        setOpen(false)
    }

    const handleDelete =async (post)=>{
        await axios.delete(ApiEndPoint + post.id +'/')
        setPosts(posts.filter((p)=> p.id !== post.id))
    }

    return(
        <>
            {   
                posts.map((post=>{
                    return (
                        <div className='Todo' key={post.id}>
                            
                            <FormDialog open={open} cancel={onHandleClose} update={onHandleUpdate}
                            onChange={onChange} onHandleChange={onHandleChange}/>

                            <p className={post.complete? 'isComplete': ''}>{post.name}</p>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton onClick={()=>onHandleOpen(post)}>
                                <EditOutlinedIcon/>
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <Checkbox checked={post.complete} onClick={()=>{handleUpdate(post)}}/>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton onClick={()=>{handleDelete(post)}}>
                                <DeleteOutlineOutlinedIcon/>
                            </IconButton>
                        </div>
                    )
                }))
            }
            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        </>
    )
}
export default Todo