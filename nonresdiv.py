def binary(decimalNum):  # converts decimal to binary decimalNum is str
    bits_list = []

    while decimalNum > 0:
        num = decimalNum
        b = int(num % 2)
        bits_list.append(str(b))
        num = num // 2
        decimalNum = int(decimalNum / 2)

    bits_list.reverse()
    return bits_list


def Add(valA, valM):
    print("valAL: ", valA)
    print("valML: ", valM)
    carry = 0
    Sum = []
    for i in range(len(valA) - 1, -1, -1):
        # print("varA[i]: ", valA[i], "varM[i]: ", valM[i])
        temp = int(valA[i]) + int(valM[i]) + carry
        # print("temp: ", temp)
        if temp > 1:
            Sum += str(temp % 2)
            carry = 1
        else:
            Sum += str(temp)
            carry = 0

    Sum.reverse()
    print("Sumarr: ", Sum)
    return Sum


def compliment(value, length):
    twoscomp = []
    one = []
    for i in range(length - 1):
        one += '0'
    one += '1'
    # print("one: ", one)
    for i in range(0, len(value)):
        # print(value[i])
        temp = (int(value[i]) + 1) % 2
        # print("temp: ", temp)
        twoscomp += str(temp)

    print("twoscomp: ", twoscomp)
    twoscomp = Add(twoscomp, one)
    return twoscomp


def decimal(bin):
    bin.reverse()
    dec = 0
    for i in range(0, len(bin)):
        if(bin[i] == '1'):
            dec = dec + (int(bin[i]) * (2 ** i))
        elif(bin[i] == '0'):
            pass
    bin.reverse()
    return dec


def nonRestoringDivision(Q, M, valA):
    count = len(M)
    negM = compliment(M, count)
    print("negM: ", negM)
    flag = 'successful'
    print("\n")
    print('Initial Values: valA:', valA, ' Q:', *Q, ' M:', *M)
    while count:
        print("\nstep:", len(M) - count + 1, end='')
        print(' Left Shift and ', end='')
        valA = valA[1:]
        valA += Q[0]
        print("valA after slicing: ", valA)

        if flag == 'successful':
            valA = Add(valA, negM)  # list of int now
            print('subtract: ')
        else:
            valA = Add(valA, M)
            print('Addition: ')

        print('valA:', *valA, ' Q:', *Q[1:], '_', end='')

        if valA[0] == '1':
            Q = Q[1:]
            Q += ['0']
            print(' -Unsuccessful')
            flag = 'unsuccessful'
            print('valA:', *valA, ' Q:', *Q, ' -Addition in next Step')
        else:
            Q = Q[1:]
            Q += ['1']
            print(' Successful')
            flag = 'successful'
            print('valA:', *valA, ' Q:', *Q, ' -Subtraction in next step')

        count -= 1
    print('\nQuotient(Q):', *Q, ' Remainder(valA):', *valA)
    print('\nQuotient(Q):', decimal(Q), ' Remainder(valA):', decimal(valA))

# Driver code
if __name__ == "__main__":

    dividend = int(input("enter the divident: "))
    divisor = int(input("enter the divisor: "))
    binDivident = binary(dividend)
    binDivisor = binary(divisor)

    if len(binDivisor) < len(binDivident):
        diff = len(binDivident) - len(binDivisor)
        for i in range(0, diff):
            binDivisor.insert(0, '0')

    accumulator = '0' * len(binDivident)
    print("Q: ", binDivident)
    print("M: ", binDivisor)
    print("A: ", accumulator)
    print("\n")
    nonRestoringDivision(binDivident, binDivisor, accumulator)
