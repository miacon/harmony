var bone = require('bonescript');

//pin names

//A data in
var A0 = 'P8_7';
var A1 = 'P8_8';
var A2 = 'P8_9';
var A3 = 'P8_10';
var A4 = 'P8_11';
var A5 = 'P8_12';
var A6 = 'P8_13';
var A7 = 'P8_14';
var A8 = 'P8_15';
var A9 = 'P8_16';
var A10 = 'P8_17';
var A11 = 'P8_18';
var A12 = 'P8_19';
var APAR = 'P8_26';

//D data out
var D0 = 'P9_11';
var D1 = 'P9_12';
var D2 = 'P9_13';
var D3 = 'P9_14';
var D4 = 'P9_15';
var D5 = 'P9_16';
var D6 = 'P9_21';
var D7 = 'P9_22';
var D8 = 'P9_23';
var D9 = 'P9_24';
var D10 = 'P9_26';
var D11 = 'P9_27';
var D12 = 'P9_30';
var DPAR = 'P9_41';
var ERROR = 'P9_42';

var f_parity = 0;
var state = 0;

this.initPins = function () {

//led mode
    bone.pinMode('USR0', bone.OUTPUT);

//A out mode
    bone.pinMode(A0, bone.OUTPUT);
    bone.pinMode(A1, bone.OUTPUT);
    bone.pinMode(A2, bone.OUTPUT);
    bone.pinMode(A3, bone.OUTPUT);
    bone.pinMode(A4, bone.OUTPUT);
    bone.pinMode(A5, bone.OUTPUT);
    bone.pinMode(A6, bone.OUTPUT);
    bone.pinMode(A7, bone.OUTPUT);
    bone.pinMode(A8, bone.OUTPUT);
    bone.pinMode(A9, bone.OUTPUT);
    bone.pinMode(A10, bone.OUTPUT);
    bone.pinMode(A11, bone.OUTPUT);
    bone.pinMode(A12, bone.OUTPUT);
    bone.pinMode(APAR, bone.OUTPUT);

//D input mode
    bone.pinMode(D0, bone.INPUT);
    bone.pinMode(D1, bone.INPUT);
    bone.pinMode(D2, bone.INPUT);
    bone.pinMode(D3, bone.INPUT);
    bone.pinMode(D4, bone.INPUT);
    bone.pinMode(D5, bone.INPUT);
    bone.pinMode(D6, bone.INPUT);
    bone.pinMode(D7, bone.INPUT);
    bone.pinMode(D8, bone.INPUT);
    bone.pinMode(D9, bone.INPUT);
    bone.pinMode(D10, bone.INPUT);
    bone.pinMode(D11, bone.INPUT);
    bone.pinMode(D12, bone.INPUT);
    bone.pinMode(DPAR, bone.INPUT);
    bone.pinMode(ERROR, bone.INPUT);

//set pins default state
//led mode state
    bone.digitalWrite('USR0', state);

//address mode state
    bone.digitalWrite(A0, bone.LOW);
    bone.digitalWrite(A1, bone.LOW);
    bone.digitalWrite(A2, bone.LOW);
    bone.digitalWrite(A3, bone.LOW);
    bone.digitalWrite(A4, bone.LOW);
    bone.digitalWrite(A5, bone.LOW);
    bone.digitalWrite(A6, bone.LOW);
    bone.digitalWrite(A7, bone.LOW);
    bone.digitalWrite(A8, bone.LOW);
    bone.digitalWrite(A9, bone.LOW);
    bone.digitalWrite(A10, bone.LOW);
    bone.digitalWrite(A11, bone.LOW);
    bone.digitalWrite(A12, bone.LOW);
    bone.digitalWrite(APAR, bone.LOW);
}

this.addressWrite = function(address, parity) {
    bone.digitalWrite(A12, (address & 0x1000)?bone.HIGH:bone.LOW);
    bone.digitalWrite(A11, (address & 0x0800)?bone.HIGH:bone.LOW);
    bone.digitalWrite(A10, (address & 0x0400)?bone.HIGH:bone.LOW);
    bone.digitalWrite(A9, (address & 0x0200)?bone.HIGH:bone.LOW);
    bone.digitalWrite(A8, (address & 0x0100)?bone.HIGH:bone.LOW);
    bone.digitalWrite(A7, (address & 0x0080)?bone.HIGH:bone.LOW);
    bone.digitalWrite(A6, (address & 0x0040)?bone.HIGH:bone.LOW);
    bone.digitalWrite(A5, (address & 0x0020)?bone.HIGH:bone.LOW);
    bone.digitalWrite(A4, (address & 0x0010)?bone.HIGH:bone.LOW);
    bone.digitalWrite(A3, (address & 0x0008)?bone.HIGH:bone.LOW);
    bone.digitalWrite(A2, (address & 0x0004)?bone.HIGH:bone.LOW);
    bone.digitalWrite(A1, (address & 0x0002)?bone.HIGH:bone.LOW);
    bone.digitalWrite(A0, (address & 0x0001)?bone.HIGH:bone.LOW);
    bone.digitalWrite(APAR, (parity)?bone.HIGH:bone.LOW);
}

this.fiboWrite = function(address, mask) {
var adr = address;
var f_parity_mask;
f_parity = 0;
    adr = this.a_pinWrite(adr, A12, 377, mask&0x1000);
    adr = this.a_pinWrite(adr, A11, 233, mask&0x0800);
    adr = this.a_pinWrite(adr, A10, 144, mask&0x0400);
    adr = this.a_pinWrite(adr, A9, 89, mask&0x0200);
    adr = this.a_pinWrite(adr, A8, 55, mask&0x0100);
    adr = this.a_pinWrite(adr, A7, 34, mask&0x0080);
    adr = this.a_pinWrite(adr, A6, 21, mask&0x0040);
    adr = this.a_pinWrite(adr, A5, 13, mask&0x0020);
    adr = this.a_pinWrite(adr, A4, 8, mask&0x0010);
    adr = this.a_pinWrite(adr, A3, 5, mask&0x0008);
    adr = this.a_pinWrite(adr, A2, 3, mask&0x0004);
    adr = this.a_pinWrite(adr, A1, 2, mask&0x0002);
    adr = this.a_pinWrite(adr, A0, 1, mask&0x0001);
    f_parity_mask = (mask&0x2000)?(f_parity^1):f_parity; 
    bone.digitalWrite(APAR, (f_parity_mask)?bone.HIGH:bone.LOW);
    return f_parity;
}

this.a_pinWrite = function(a, a_pin, pin_value, inv) {
    if(a>=pin_value){a-=pin_value;f_parity^=1;
	bone.digitalWrite(a_pin, (inv)?bone.LOW:bone.HIGH);
    }else bone.digitalWrite(a_pin, (inv)?bone.HIGH:bone.LOW);
    return a;
}

this.incAddress = function(address) {
    address++;
    return address&(16383);
}

this.incAddressFibo = function(address) {
    address++;
    return address&(16383);
}

this.parity = function(a) {
var p = 0;
if(a&0x1000)p^=1;
if(a&0x0800)p^=1;
if(a&0x0400)p^=1;
if(a&0x0200)p^=1;
if(a&0x0100)p^=1;
if(a&0x0080)p^=1;
if(a&0x0040)p^=1;
if(a&0x0020)p^=1;
if(a&0x0010)p^=1;
if(a&0x0008)p^=1;
if(a&0x0004)p^=1;
if(a&0x0002)p^=1;
if(a&0x0001)p^=1;
return p;
}

this.toggleUSR0 = function() {
    state = state^1;
    bone.digitalWrite(state);
}

this.getErrorState = function() {
    return bone.digitalRead(ERROR);
}
