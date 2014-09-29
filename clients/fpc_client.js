var port = 8080;
var host = location.hostname;
if(host == '') host = 'localhost';
var socket;

window.onload = function() {
    setTimeout(main,1000);
}

function main() {
    setInterval(toggle, 10000);
    socket = io.connect('http://'+host+':'+port);
    socket.on('connect', function () {
        socket.on('message', function (msg) {
            if(msg.event=='update'){
		document.querySelector('#b_pr').innerHTML  = msg.b_pr;
		document.querySelector('#f_pr').innerHTML  = msg.f_pr;
		document.querySelector('#bp_pr').innerHTML = msg.bp_pr;

		document.querySelector('#code_in').innerHTML = f_view(msg.code_in);
		document.querySelector('#code_out').innerHTML = f_mask_view(msg.code_in, msg.code_out);

		document.querySelector('#total_err_count').innerHTML  = msg.total_err_count;
		document.querySelector('#f_err_count').innerHTML  = msg.f_err_count;
		document.querySelector('#bp_err_count').innerHTML = msg.bp_err_count;

            };
        });

        document.querySelector('#polling').onkeypress = function(e) {
            if (e.which == '13') {
	        socket.json.send({'event': 'polling', 'polling': document.querySelector('#polling').value, 'period': document.querySelector('#period').value, 'error_level': document.querySelector('#error_level').value, 'error_mult': document.querySelector('#error_mult').value});
//		document.querySelector('#polling').value='';
            };
        };
        document.querySelector('#error_level').onkeypress = function(e) {
            if (e.which == '13') {
	        socket.json.send({'event': 'polling', 'polling': document.querySelector('#polling').value, 'period': document.querySelector('#period').value, 'error_level': document.querySelector('#error_level').value, 'error_mult': document.querySelector('#error_mult').value});
            };
        };
        document.querySelector('#error_mult').onkeypress = function(e) {
            if (e.which == '13') {
	        socket.json.send({'event': 'polling', 'polling': document.querySelector('#polling').value, 'period': document.querySelector('#period').value, 'error_level': document.querySelector('#error_level').value, 'error_mult': document.querySelector('#error_mult').value});
            };
        };
        document.querySelector('#start_stop').onclick = function() {
            socket.json.send({'event': 'start_stop', 'start_stop': document.querySelector('#start_stop').value, 'polling': document.querySelector('#polling').value, 'period': document.querySelector('#period').value, 'error_level': document.querySelector('#error_level').value, 'error_mult': document.querySelector('#error_mult').value});

	    if(document.querySelector('#start_stop').value=='START'){
		    document.querySelector('#start_stop').value='STOP';
//	            document.querySelector('#polling').value='';
	    }
	    else{
		    document.querySelector('#start_stop').value='START';
	    };
        };

        document.querySelector('#pause_resume').onclick = function() {
            socket.json.send({'event': 'pause_resume', 'pause_resume': document.querySelector('#pause_resume').value, 'polling': document.querySelector('#polling').value, 'period': document.querySelector('#period').value, 'error_level': document.querySelector('#error_level').value, 'error_mult': document.querySelector('#error_mult').value});

	    if(document.querySelector('#pause_resume').value=='PAUSE'){
		    document.querySelector('#pause_resume').value='RESUME';
	    }
	    else{
		    document.querySelector('#pause_resume').value='PAUSE';
	    };
	};
    });
};

function toggle(){
        socket.json.send({'event': 'ping'});
}

function norm(x){
var y = x.toString(2);
    while(y.length<=13){
	y+='0';
    }
    return y;
}

function f_view(x){
var y = '';
    if(x>=610){x-=610;y+='1';}else y+='0';
    if(x>=377){x-=377;y+='1';}else y+='0';
    if(x>=233){x-=233;y+='1';}else y+='0';
    if(x>=144){x-=144;y+='1';}else y+='0';
    if(x>=89) {x-=89 ;y+='1';}else y+='0';
    if(x>=55) {x-=55; y+='1';}else y+='0';
    if(x>=34) {x-=34; y+='1';}else y+='0';
    if(x>=21) {x-=21; y+='1';}else y+='0';
    if(x>=13) {x-=13; y+='1';}else y+='0';
    if(x>=8)  {x-=8;  y+='1';}else y+='0';
    if(x>=5)  {x-=5;  y+='1';}else y+='0';
    if(x>=3)  {x-=3;  y+='1';}else y+='0';
    if(x>=2)  {x-=2;  y+='1';}else y+='0';
    if(x>=1)  {x-=1;  y+='1';}else y+='0';
return y;
}

function f_mask_view(x, m){
var y = '';
var bit = 0;
var mask = parseInt(m,2);
    if(x>=610){x-=610;bit=1;}else bit=0;
    if(mask&0x2000){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
    if(x>=377){x-=377;bit=1;}else bit=0;
    if(mask&0x1000){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
    if(x>=233){x-=233;bit=1;}else bit=0;
    if(mask&0x0800){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
    if(x>=144){x-=144;bit=1;}else bit=0;
    if(mask&0x0400){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
    if(x>=89) {x-=89 ;bit=1;}else bit=0;
    if(mask&0x0200){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
    if(x>=55) {x-=55; bit=1;}else bit=0;
    if(mask&0x0100){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
    if(x>=34) {x-=34; bit=1;}else bit=0;
    if(mask&0x0080){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
    if(x>=21) {x-=21; bit=1;}else bit=0;
    if(mask&0x0040){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
    if(x>=13) {x-=13; bit=1;}else bit=0;
    if(mask&0x0020){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
    if(x>=8)  {x-=8;  bit=1;}else bit=0;
    if(mask&0x0010){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
    if(x>=5)  {x-=5;  bit=1;}else bit=0;
    if(mask&0x0008){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
    if(x>=3)  {x-=3;  bit=1;}else bit=0;
    if(mask&0x0004){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
    if(x>=2)  {x-=2;  bit=1;}else bit=0;
    if(mask&0x0002){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
    if(x>=1)  {x-=1;  bit=1;}else bit=0;
    if(mask&0x0001){if(bit)y+='<font color="red">0</font>';else y+='<font color="red">1</font>';}
    else {if(bit)y+='1';else y+='0';}
return y;
}
