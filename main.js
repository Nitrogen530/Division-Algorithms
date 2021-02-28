$(document).ready(function () {
	$('input[name="divide"]').click(function () {
		divide();
	});
});

function decimalBinary(decimalNum) {
     // returns a string
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


function Add(varA, varM) {
    let carry = 0;
    var sumArr = "";

    for (i = varA.length - 1; i >=0; i--) {
        var temp = Number(varA[i]) + Number(varM[i]) + carry;
        // console.log("temp: ", temp);
        if (temp > 1) {
            var currentval = Number(temp % 2);
            sumArr += currentval.toString();
            carry = 1;
        } else {
            sumArr += temp.toString();
            carry = 0;
        }
    }
    
    return sumArr.split('').reverse().join('');
}

function compliment(value, len) {
    twoscomp = "";
    one = "";
    for (i = 0; i < len - 1; i++) {
        one += '0';
    }
    one += '1';

    for (i = 0; i < value.length; i++) {
        var currenttemp = Number(Number(value[i]) + 1) % 2;
        twoscomp += currenttemp.toString();
    }
    // console.log("twoscomp: ", twoscomp);
    twoscomp = Add(twoscomp, one);
    return twoscomp;
}

function writeRow(table, a, q) {
	table.append('<tr><td>' + a + '</td><td>' + q+ '</td></tr>')
}

function divide() {
    var tableResult = $('#results tbody');
	tableResult.html('');
    var divident = parseInt($('input[name="divident"]').val());
	var divisor = parseInt($('input[name="divisor"]').val());
	var q = decimalBinary(divident);
    var m = decimalBinary(divisor);
    
    
    if (m.length < q.length) {
        var diff = q.length - m.length;
        var zeros = "";
        for (i = 0; i < diff + 1; i++) {
            zeros += '0';
        }
        m = zeros.concat(m);
    }

    var acc = "";
    for (i = 0; i < m.length; i++) {
        acc += '0';
    }

    let count = m.length;
    var negM = compliment(m, count);
    var flag = '1';
    writeRow(tableResult, acc, q);
    while (count > 1) {
        acc = acc.slice(1, );
        acc += q[0];
        
        if (flag == '1') {
            acc = Add(acc, negM);
        }
        else {
            acc = Add(acc, m);
        }
        writeRow(tableResult, acc, q);
        if (acc[0] == '1') {
            q = q.slice(1, );
            q += '0';
            flag = '0';
            writeRow(tableResult, acc, q);
        } else {
            q = q.slice(1, );
            q += '1';
            flag = '1';
            writeRow(tableResult, acc, q);
        }
        count -= 1;
    }
}

