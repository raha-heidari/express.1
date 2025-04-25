import express from "express";

const app=express();
app.use(express.json());

let mockUsers=[
    {id:1, username:"anson",displayName:"anson"},
    {id:2, username:"jack",displayName:"jack"},
    {id:3, username:"adam",displayName:"adam"},
]

const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
};

app.use(loggingMiddleware);
app.get("/",(request,response)=>{

// response.send("Hello,World")
response.status(201).send({msg:"Hell!"});
});




app.get("/api/users",(request,response)=>{

   console.log(request.query);
   const{query:{filter,value}}=request;


   if (!filter && !value) {
    return response.send(mockUsers)
   }



   if (filter && value) {
    return response.send(mockUsers.filter((user)=>user[filter].includes(value)))
   }

    });
    







    
app.get("/api/products",(request,response)=>{

   
    response.send([
        {id:1, name:"chicken",price:12.99},
        
    ]);
    });
    




    app.get("/api/users:id",(request,response)=>{
       console.log(request.params);
       const parsedId=parseInt(request.params.id);
       if(isNaN(parsedId)){
       return response.status(400).send({msg:"Bad Request."});
       }
   const findUser=mockUsers.find(user=>user.id===parsedId);
   if(!findUser){
    return response.sendStatus(404);
   }
      return response.send(findUser);
        });
        


  app.post("/api/users", (request, response) => {
            const { body  } = request;
            const newUser  = { id: mockUsers[ mockUsers.length - 1].id + 1, ...body };
            mockUsers.push(newUser);
            return   response.status(201).send(newUser);
  });


  app.put("/api/users/:id", ( request, response) => {
         const {
        body,
        params: { id },
    } = request;
         const parsedId = parseInt (id);
    if (isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex =mockUsers.findIndex((user) => user.id===parsedId);
    if (findUserIndex === -1) return response.sendStatus(404);
    mockUsers[findUserIndex] ={ id: parsedId, ...body };
    return response.sendStatus(200);
});





app.patch("/api/users/:id", (request,  response) => {
    const {
        body,
        params: { id },
    } = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id===parsedId);
    if (findUserIndex===-1) return response.sendStatus(404);
    mockUsers[findUserIndex] ={ ...mockUsers[findUserIndex], ...body };
    return response.sendStatus(200);
});
//////////////////////////////////////////////////////////

app.delete("/api/users/:id", ( request , response) => {
    const {
        params: { id },
    } = request;
    const parsedId=parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex=mockUsers.findIndex((user) =>user.id ===parsedId);
    if (findUserInde ===-1) return response.sendStatus(404);
    mockUsers.splice(findUserIndex,1);
    return response.sendStatus(200);
});
//////////////////////////////////////////////////////////////////




const resolveIndexByUserId= (request,response,next) => {
    const {
    params: { id },
    } = request;
    const parsedId=parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex=mockUsers.findIndex((user)=>user.id===parsedId);
    if(findUserIndex===-1) return response.sendStatus(404);
    request.findUserIndex=findUserIndex;
    next();
};

////////////////
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{

    console.log(`Running on ${PORT}`);
    
});