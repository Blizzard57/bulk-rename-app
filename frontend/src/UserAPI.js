export default{
    getUser: ()=>{
        return fetch('http://localhost:5000/user',{mode:'cors'})
        .then(res=> res.json())
        .then(data=> data);
    },
    deleteUser: (_id)=>{
        return fetch(`http://localhost:5000/user/${_id}`,
                    {mode:'cors',
                    method : 'delete'})
                    .then(res => res.json())
                    .then(data => data);
    },
    updateUser: (user)=>{
        return fetch(`http://localhost:5000/user/${user._id}`,
                    {mode:'cors',
                    method: 'put',
                     body: JSON.stringify(user),
                    headers:{
                        "Content-Type": "application/json"
                    }}).then(res => res.json())
                       .then(data => data);
    },
    createUser: (user)=>{
        return fetch(`http://localhost:5000/user`,
                    {mode:'cors',
                    method: 'post',
                     body: JSON.stringify(user),
                    headers:{
                        "Content-Type": "application/json"
                    }}).then(res => res.json())
                       .then(data => data);
    }
}