import { Server as SocketIOServer } from 'socket.io';
import createMachine from './lib/createMachine';
function socketMain(io:any,socket:any) {
    console.log("A socket connected",socket.id);



    // client auth with API key 
	socket.on('clientAuth', (clientAuth: any) => {
		console.log(clientAuth);
		if(clientAuth === 'asdfgohyouehdha@#$%^&*('){
            socket.join('clients')
		}else if(clientAuth === '@#$dfgbyouehdha@#$%^&*('){
            socket.join('ui')
        }
        else{
                // An invalid client has joined
                socket.disconnect(true)
        }        
	})



    // A machine has connected check if it is a new client or an existing client
    // IF it's new add it
	socket.on('initPerformanceData', (performanceData: any) => {
		console.log(performanceData);
        createMachine(performanceData).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
		
	})

	socket.on('performanceData', (performanceData: any) => {
		console.log(performanceData);
		
	})
}
export default socketMain