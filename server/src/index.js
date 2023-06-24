const http = require('http');
const fs = require('fs');
const statesDistricts = require('../data/statesDistricts.json');
let json;

try{
    json = require('../data/students.json');
}catch(err){
    fs.readFileSync('./data/students.json', (err, data) => {
        if(err) throw err;
        try{
            json = JSON.parse(data);
        }catch(err){
            console.log('students.json file is not a valid json file. Creating a new one.')
            fs.writeFileSync('../data/students.json', JSON.stringify([]));
        }
    })
}



let students = json || {};

const HOST = 'localhost';
const PORT = 2080;

const server = http.createServer(async (req, res) => {
    console.log('\n');
    console.log("Request on server received :  " + req.method + " : " + req.url);

    const headers = [
        'Content-Type', 'application/json',
        'Accept', 'application/json',
        'Access-Control-Allow-Origin', '*',   // important - * defines everyone can access it.
        'Access-Control-Allow-Credentials', 'true',
        'Access-Control-Allow-Headers', 'Content-Type, Accept'
    ]
    
    res.writeHead(200, '', headers)

    if(req.method==='POST'){
        let body='';
        req.on('data', chunk => body+=chunk.toString())
        req.on('end', () => {
            body=JSON.parse(body);
            console.log('request for: '+body.requestFor)
            
            // for numerous queries

            if(body.requestFor === 'studentsList'){
                res.end(JSON.stringify(students));
                console.log('studentsList sent');
            }else if(body.requestFor === 'addStudents'){
                try{
                    students = {...students, ...body.students};
                    fs.writeFile('./data/students.json', JSON.stringify(students), e => console.log("Students added to file."));
                    res.end(JSON.stringify({message: 'Students added successfully.', done: true}));
                }catch(err){
                    res.end(JSON.stringify({message: 'Student could not be added.', done: false}));
                }
            }else if(body.requestFor === 'statesDistricts'){
                res.end(JSON.stringify(statesDistricts));
                console.log('statesDistricts sent')
            }else if(body.requestFor === 'saveRawJSON'){        //Saving Raw JSON File
                fs.writeFile('../data/saveRawJSON.json', JSON.stringify(body.json), e => console.log("Raw JSON saved."));
                res.end(JSON.stringify({message: 'Raw JSON saved successfully.', done: true}));
            }else if(body.requestFor === 'student'){
                res.end(JSON.stringify(students[body.rollNo]));
                console.log('student sent')
            }
            else{
                res.destroy()
            }


        })
    }else if(req.method==='GET'){
        res.end(JSON.stringify({message: 'This is my server listening.'}));            // replace by something useful if needed
    }
});

server.listen(PORT, HOST, undefined, e => console.log('server listening on '+HOST+' at '+PORT));