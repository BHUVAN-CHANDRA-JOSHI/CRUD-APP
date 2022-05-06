import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import NavBar from '../layout/Navbar';
import { Link } from "react-router-dom";
import axios from 'axios';
import { LocalLaundryService } from '@material-ui/icons';
//import { getUsers, deleteUser } from '../Service/api';

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    }
})


const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const classes = useStyles();
    // useEffect(() => {

    //     loadUsers();  /* loadUsers call */    
    //     },[]);

   

    // const deleteUserData = async (id) => {
    //     await deleteUser(id);
    //     getAllUsers();
    // }

    
    

    const getAllUsers = async () => {

        
        const response = await fetch('http://18.223.0.104:5000/alluserdata/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        console.log(data)

        if (data.status === 200) {
            setUsers(data.udata);
        }
    }
    
    const deleteUser= async id=>{
        alert("do you confirm to delete it")
        await axios.delete(`http://18.223.0.104:5000/userdata/${id}`);
        
       

    };
    useEffect(() => {
        getAllUsers(); 
                //here getallusers function call 
    }, [deleteUser]);




    return (
        <>
            <NavBar />
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.thead}>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user,i) => (                // we use i for index through which can we change the id
                        <TableRow className={classes.row} key={user.id}>
                            <TableCell>{i+1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>{user.address}</TableCell>
                            <TableCell>
                            <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/edituser/${user.userid}`}>Edit</Button>
                             <Button color="secondary" variant="contained" onClick={()=>deleteUser(user.userid)}>Delete</Button>  
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default AllUsers;