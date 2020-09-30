import React, { Component } from 'react';
import { useRouter } from 'next/router';

const Admin = (props) => {
    const router = useRouter();
    
    const handleSubmit = (event) =>{
        event.preventDefault()
        const un = event.target["username"].value
        const pw = event.target["password"].value
        const url = router.pathname.slice(1)
      
        fetch(`http://localhost:3000/api/preview/?secret=${pw}&eventUrl=${url}`)
        .then(data => router.push(data.url))
        .then(router.reload)
    }
  
        return (
            <div>
            <h1>Hello</h1>
              <form onSubmit={handleSubmit}>
            <input type="text"name="username"placeholder="Username" />
            <input type="text"name="password"placeholder="password" />
            <button  type="submit" >Log In</button>
            </form>  
            </div>
        );
    
}



export default Admin;