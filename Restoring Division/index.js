function decimalBinary(decimalNum) {
    // return decimalNum.toString(2); // returns a string
    
    var bitStr = "";
    while (decimalNum > 0) {
        var num = decimalNum;
        var b = num % 2;
        bitStr += b;
        num = parseInt(num / 2);
        decimalNum = parseInt(decimalNum / 2);
    }
    return bitStr.split('').reverse().join('');
}

function Shift(acc, q) {  // expected parameters as string
    var value = acc + q;
    lenValue = value.length;
    // var k = 0;

    for (k = 0; k < lenValue - 1; k++) {
        value[k] = '0';
        value[k] = value[k + 1];
    }
    value = value.substr(1, value.length + 1);
    return value; // string
}


function compliment(numStr) {  // expected parameters as string
    var onescomp = "";
    var twoscomp = "";

    for (i = 0; i < numStr.length; i++) {
        if (numStr[i] == '0') {
            onescomp += '1';
        } else if (numStr[i] == '1') {
            onescomp += '0';
        }
    }
    
    let carry = 1;
    for (j = numStr.length - 1; j >= 0; j--) {
        if (onescomp[j] == '0' && carry == 1) {
            twoscomp += '1'
            carry = 0
        }
        else if (onescomp[j] == '1' && carry == 1) {
            twoscomp += '0'
            carry = 1
        }
        else if (onescomp[j] == '0' && carry == 0) {
            twoscomp += '0'
            carry = 0
        }
        else if (onescomp[j] == '1' && carry == 0) {
            twoscomp += '1'
            carry = 0
        }
    }
    
    return twoscomp.split('').reverse().join('');
}


function add(acc, m) {  // add returns string
    var add = "";
    var addsec = acc;
    let carry = 0;

    for (i = addsec.length - 1; i >= 0; i--) {
        if (acc[i] == '0' && m[i] == '0' && carry == 0) {
            add += '0';
            carry = 0;  
        }
        
        else if (acc[i] == '0' && m[i] == '0' && carry == 1) {
            add += '1';
            carry = 0;
        }

        else if (acc[i] == '0' && m[i] == '1' && carry == 0) {
            add += '1';
            carry = 0;
        }

        else if (acc[i] == '0' && m[i] == '1' && carry == 1) {
            add += '0';
            carry = 1;
        }

        else if (acc[i] == '1' && m[i] == '0' && carry == 0) {
            add += '1';
            carry = 0;
        }

        else if (acc[i] == '1' && m[i] == '0' && carry == 1) {
            add += '0';
            carry = 1;
        }

        else if (acc[i] == '1' && m[i] == '1' && carry == 0) {
            add += '0';
            carry = 1;
        }

        else if (acc[i] == '1' && m[i] == '1' && carry == 1) {
            add += '1';
            carry = 1;
        }
    }
    // console.log(add);
    return add.split('').reverse().join('');
}




var dividentQ = parseInt(prompt("Enter the divident Q: "));
var divisorM =  parseInt(prompt("Enter the divisor M: "));
var qBin = decimalBinary(dividentQ);  // string
var mBin = decimalBinary(divisorM);  // string
console.log("\n");
console.log("divident Q: ", qBin);

if (mBin.length < qBin.length) {
    var diff = qBin.length - mBin.length;
    var zeros = "";
    for (i = 0; i < diff + 1; i++) {
        zeros += '0';
    }
    mBin = zeros.concat(mBin);
    
} 
console.log("divisor M: ", mBin);
var acc = "";
for (i = 0; i < mBin.length; i++) {
    acc += '0';
}
console.log("Acc: ", acc);

var negM = compliment(mBin);
console.log("Negative M: ", negM);
console.log("\n");
console.log("Steps      ", "        ", "  A    ", "     ", "   Q  ", "         ");
console.log('\n');
let n = 1;
let counter = qBin.length;
while (counter > 0) {
    var a = Shift(acc, qBin);
    // console.log("a: ", a);
    var newA = a.substr(0, acc.length);
    // console.log("newA: ", newA);
    var newQ = a.slice(acc.length, a.length + 1);
    // console.log("newQ: ", newQ);
    // console.log("negM: ", negM);    
    var sumAM = add(newA, negM); // add returns string
    // console.log("sumAM: ", sumAM);
    // var b = newQ.length + 1;


    if (sumAM[0] == '1') {
        newQ += '0';
        sumAM = add(sumAM, mBin);
    }
    else if (sumAM[0] == '0') {
        newQ += '1';
    }
    
    acc = sumAM;
    qBin = newQ;
    console.log("\n");
    // console.log(acc);
    // console.log(qBin);
    console.log("Step : ", n, "         ", acc, "         ", qBin, "     ");
    n += 1
    counter -= 1;
}

console.log("\n");
console.log("Quotient: ", qBin);
console.log("Remainder: ", acc);