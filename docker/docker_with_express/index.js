const express = require('express');
const Docker=require('dockerode');
const fs = require('fs');
const {exec} = require('child_process');

console.log(__dirname)
const app=express();

app.use(express.urlencoded({extended:true}));
//we will maintain a list of the repos being handled by a container
//at some given time
//maybe keep that in a database

//we also need to remove the container after it is empty
app.get('/:id',async (req,res)=>{
    //we will create a new docker container on receiving a get request
    //let's give a unique env variable to the container
    const docker=new Docker();
    const containerOptions={
        Image:'express-test-net:latest',//we need to mention the built image in this
        Tty:true,
        OpenStdin:true,
        Env:['UNIQUE_ID='+req.params.id],
        HostConfig:{
            AutoRemove:true,
            //Binds:['./received:/app/send']
            Binds:[__dirname+'/received:/app/send']
        },
        //Cmd:['python','test.py']
        //Cmd:['tree'],
        Cmd: ['python','test.py'],
        Cmd:["git","clone","https://github.com/nishad-dhuri-05/HiveLink.git"],
        Cmd: ['tail', '-f', '/dev/null'],
    }
    //we will run the container and then remove it after it is done
    //we will also mount the volume to the container
    //we will also pass the id of the repo to the container

      docker.createContainer(containerOptions, function (err, container) {
        if (err) {
          console.error('Error creating container:', err);
          return;
        }
        //container.inspect //maybe can be used to get the
        //info on the container,
        //maybe we can set the folder name on the basis of that
        // Start the container
        container.start(function (err, data) {
          if (err) {
            console.error('Error starting container:', err);
            return;
          }  
          console.log('Container started successfully:', data);
        });
      });
    // const command=['docker-compose','-f','/containers/compose.yaml','up'];
    // docker.run('express-test', command,process.stdout,(err,data,container)=>{
    //     if(err){
    //         console.error('Error executing compose: ',err);
    //         return;
    //     }
    //     console.log('Docker Compose output:', data.toString());
    //     //it is the stdout of the process
    //     // Cleanup the container after execution (optional)
    //     container.remove(function (err, data) {
    //       if (err) {
    //         console.error('Error removing container:', err);
    //       } else {
    //         console.log('Container removed successfully');
    //       }
    //     });
    // })

    // const command ='docker compose -f ./containers/compose.yaml up';
    // const child=exec(command,(err,stdout,stderr)=>{
    //     if(err){
    //         console.error('Error executing compose: ',err);
    //         return;
    //     }
    //     console.log('Docker Compose output:', stdout);
    // })
    // docker.createContainer(containerOptions).then((container)=>{
    //     container.start();
    //     res.send('Container is created and running');
    // }).catch((err)=>{
    //     console.log(err);
    //     res.send('Error in creating container');
    // })
    const filePath = 'containers/received/word_count.json';
    var jsonObject={};
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading JSON file:', err);
          return;
        }
        try {
          // Parse the JSON data into a JavaScript object
          jsonObject = JSON.parse(data);
          // Now you can use the jsonObject in your application
          console.log('Parsed JSON object:', jsonObject);
        } catch (error) {
          console.error('Error parsing JSON data:', error);
        }
      });
    return res.send(jsonObject);
})

app.listen(3001,()=>{
    console.log('Server is running on port 3000');
})