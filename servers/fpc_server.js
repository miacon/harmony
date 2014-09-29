var io = require('socket.io').listen(8080);
var watchdog_count = 3;
var pollingInterval = 2000;
var period = 100;
var error_level = 50;
var error_mult = 8;
var intervalID = 0;
var f_pr = 0, bp_pr = 0;
var total_err_count = 0, f_err_count = 0, bp_err_count = 0;
var fpc = require('./fpc.js');
var FIBO_MAX = 609;

fpc.initPins();

setInterval(watchdog, 10000);
//intervalID = setInterval(toggle, pollingInterval);

io.sockets.on('connection', function (socket) {
    socket.on('message', function (msg) {
	if(msg.event=='ping')watchdog_count = 3;
	if(msg.event=='polling'){
		clearInterval(intervalID);
		pollingInterval = msg.polling;
		period = msg.period;
		error_level = msg.error_level;
		error_mult = msg.error_mult;
		intervalID = setInterval(toggle, pollingInterval);
	}
	if(msg.event=='start_stop'){
		clearInterval(intervalID);
		pollingInterval = msg.polling;
		period = msg.period;
		error_level = msg.error_level;
		error_mult = msg.error_mult;
		if(msg.start_stop=='START'){
		    total_err_count=0;
		    f_err_count=0;
		    bp_err_count=0;
		    intervalID = setInterval(toggle, pollingInterval);
		    total_err_count=0;
		    f_err_count=0;
		    bp_err_count=0;
		}
	}
	if(msg.event=='pause_resume'){
		clearInterval(intervalID);
		pollingInterval = msg.polling;
		period = msg.period;
		error_level = msg.error_level;
		error_mult = msg.error_mult;
		if(msg.pause_resume=='RESUME'){
			intervalID = setInterval(toggle, pollingInterval);
		}
	}
//	console.log(msg);
    });
    socket.on('disconnect', function() {
    });
});

function toggle(){
	fpc.toggleUSR0();
	var code_in = Math.round(Math.random()*FIBO_MAX);
	var code_out= '00000000000000';
	var r = Math.random()*100;
	var s = '';
	if(r<error_level){
	    total_err_count++;
	    r=1+Math.floor(error_mult*r/error_level);
	    if(r&1)bp_err_count++;
	    for(var i = 0; i<r; i++) s+='1';
	    for(;i<14;i++){
		r = Math.round(Math.random()*(s.length));
		s = s.substr(0,r)+'0'+s.substr(r);
	    }
	    code_out=s;
	}
	var parity = fpc.fiboWrite(code_in, parseInt(code_out,2));
	code_in+=parity*610;
	if(fpc.getErrorState()){
	    //if(r<error_level)
	    f_err_count++;
	    //else console.log('.');
	}
	f_pr = Math.round(10000*f_err_count/total_err_count)/100;
	bp_pr = Math.round(10000*bp_err_count/total_err_count)/100;
        io.sockets.json.send({'event': 'update', 'b_pr': '0.00', 'f_pr': f_pr.toFixed(2), 'bp_pr': bp_pr.toFixed(2), 'code_in': code_in, 'code_out': code_out, 'total_err_count': total_err_count, 'f_err_count': f_err_count, 'bp_err_count': bp_err_count});
}

function watchdog(){
	watchdog_count--;
	if(watchdog_count==0) process.kill(process.pid);
}

function my_rand(){
	return(Math.round(Math.random()*10000)/100);
}
