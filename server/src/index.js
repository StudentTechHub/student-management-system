// NOTE: remember to start the server from the server directory and not from the src or any other directory. It is because the server is using the data from the ./server/data directory and not from the ./src/data directory. So, if you start the server from the src directory, it will not be able to find the data directory and will throw an error, because no data directory exists in the src directory. So, start the server from the server directory only.

require('dotenv').config();
const http = require('http');
const fs = require('fs');
const statesDistricts = require('../data/statesDistricts.json');
let students, resources, teachers, announcements;

function isValid(name, elseData){
    try{
        return require('../data/'+name);
    }catch{
        console.log(name+' file is not a valid json file. Creating a new one.');
        fs.writeFileSync('./data/'+name, JSON.stringify(elseData), e => {console.log('file created.')});
    }
    return elseValue
}

students = isValid('students.json', {});
resources = isValid('resources.json', []);
teachers = isValid('teachers.json', {});
announcements = isValid('announcements.json', []);

let loggedOnRoll = 0, loggedOnUID = '';

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
                    fs.writeFileSync('./data/students.json', JSON.stringify(students), e => console.log("Students added to file."));
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
            }else if(body.requestFor === 'loggedOnRoll'){
                if(loggedOnRoll===undefined){
                    loggedOnRoll = 0;
                }
                res.end(JSON.stringify(loggedOnRoll));
                console.log('loggedOnRoll sent');
            }else if(body.requestFor === 'studentLogin'){
                loggedOnRoll = body.identifier[0];
                if(typeof loggedOnRoll === 'string' && students[loggedOnRoll] && students[loggedOnRoll].dob === body.identifier[1]){
                    res.end(JSON.stringify({message: 'Logged in successfully', done: true}))
                    console.log('login successful');
                }else{
                    res.end(JSON.stringify({message: 'Login unsuccessful', done: false}))
                    console.log('login unsuccessful');
                }
            }else if(body.requestFor === 'logoutStudent'){
                loggedOnRoll = 0;
                res.end(JSON.stringify({message: 'logged out successfully', done: true}))
                console.log('logout successful');
            }else if(body.requestFor === 'teacherLogin'){
                // for validation
                let valid=false;

                if(process.env[body.identifier[0]] === body.identifier[1]){
                    valid=true;
                }

                if(valid){
                    loggedOnUID = body.identifier[0];
                    res.end(JSON.stringify({message: 'Logged in successfully', done: true}));
                }else{
                    res.end(JSON.stringify({message: 'Login unsuccessful', done: false}))
                }
                console.log('login successful');
            }else if(body.requestFor === 'logoutTeacher'){
                loggedOnUID = '';
                res.end(JSON.stringify({message: 'logged out successfully', done: true}))
                console.log('logout successful')
            }else if(body.requestFor === 'teacher'){
                res.end(JSON.stringify(teachers[body.uid]));
                console.log('teacher sent');
            }else if(body.requestFor === 'loggedOnTeacher'){
                res.end(JSON.stringify(loggedOnUID));
                console.log('loggedOnTeacher sent')
            }else if(body.requestFor === 'addResource'){
                resources.push(body.resource);
                const fileName = resources[resources.length-1].file.name;

                // There's some problem with the files being saved, having the same contents and extension name but behaving unexpectedly, quite weird huh!?
                fs.writeFileSync('./data/resourceFiles/'+fileName, resources[resources.length-1].file.contents, e => {}); // these functions at the end are callback functions and it gives error when undefined/not specified.

                delete resources[resources.length-1].file.contents;
                resources[resources.length-1].fileURL = '../../../server/data/resourceFiles/'+fileName;
                
                fs.writeFileSync('./data/resources.json', JSON.stringify(resources), e => console.log('resource pushed in database.'));
                
                res.end(JSON.stringify({'message': 'resource added successfully', done:true}))
                console.log('resource added successfully');
            }else if(body.requestFor === 'resources'){
                res.end(JSON.stringify(resources));
                console.log('resources sent');
            }else if(body.requestFor === 'addAnnouncement'){
                announcements.unshift(body.announcement);
                fs.writeFileSync('./data/announcements.json', JSON.stringify(announcements), e => {console.log('announcement pushed to file.')})
                res.end(JSON.stringify({message: 'announcement added', done: true}));
                console.log('announcement added successfully');
            }else if(body.requestFor === 'announcements'){
                res.end(JSON.stringify(announcements));
                console.log('announcements sent');
            }else if(body.requestFor === 'deleteAnnouncement'){
                announcements.splice(body.announceID, 1);
                fs.writeFileSync('./data/announcements.json', JSON.stringify(announcements), e => {console.log('announcement deleted.')})
                res.end(JSON.stringify({message: 'announcement deleted', done: true}));
            }else if(body.requestFor === 'deleteStudent'){
                delete students[body.rollNo];
                fs.writeFileSync('./data/students.json', JSON.stringify(students), e => {console.log('student deleted.')})
                res.end(JSON.stringify({message: 'student deleted', done: true}));
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