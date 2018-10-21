/**
 * 递归
 * Tn=O(2^n) Sn=O(n)
 * @param {number} n 
 */
function Fibonacci_1(n) {
    if (n <= 0) {
        return 0
    } else if (n == 1) {
        return 1
    } else {
        return Fibonacci_1(n - 1) + Fibonacci_1(n - 2)
    }
}

console.log('Fibonacci_1', Fibonacci_1(40))

/**
 * 备忘录法
 * Tn=O(n) Sn=O(n)
 * @param {number} n 
 */
function Fibonacci_2(n) {
    let memory = [0, 1]
    for (let i = 2; i < n + 1; i++) {
        memory.push(memory[i - 1] + memory[i - 2])
    }
    return memory[n]
}
console.log('Fibonacci_2', Fibonacci_2(40))

/**
 * 备忘录法优化，
 * Tn=O(n) Sn=O(1)
 * @param {number} n
 */
function Fibonacci_3(n) {
    let memory = [0, 1]
    for (let i = 2; i < n + 1; i++) {
        let adder = memory[0] + memory[1]
        memory[0] = memory[1]
        memory[1] = adder
    }
    return memory[1]
}
console.log('Fibonacci_3', Fibonacci_3(40))


//矩阵相乘
function matrixMultiplication(a, b) {
    return a.map(function (row) {
        return row.map(function (_, i) {
            return row.reduce(function (sum, cell, j) {
                return sum + cell * b[j][i];
            }, 0);
        });
    });
}

/**
 * 线性代数分析法
 * Tn=O(log(n)) Sn=O(log(n))
 * @param {number} n
 */
function Fibonacci_4(n) {
    let baseMatrix = [
        [1, 1],
        [1, 0]
    ]

    function getMatrixN(n) {
        if (n == 1) {
            return baseMatrix
        } else if ((n & 1) == 0) {
            let matrixNHalf =getMatrixN(n >> 1)
            return matrixMultiplication(matrixNHalf, matrixNHalf)
        } else {
            let matrixNHalf =getMatrixN(n >> 1)
            return matrixMultiplication(matrixMultiplication(matrixNHalf, matrixNHalf), baseMatrix)
        }
    }
    if (n < 1) {
        return 0
    } else if (n == 1) {
        return 1
    } else {
        return getMatrixN(n)[0][1]
    }

}

console.log('Fibonacci_4', Fibonacci_4(40))


/**
 * 线性代数分析法优化，去除不必要的内存消耗
 * 2*2矩阵=>2*1
 * Tn=O(log(n)) Sn=O(log(n))
 * @param {number} n
 */
function Fibonacci_5(n) {
    let baseMatrix = [1, 1]

    function getMatrix2(n) {        
        if (n == 1) {
            return baseMatrix
        } else if ((n & 1) == 0) {
            let matrix2Half = getMatrix2(n >> 1)
            return [matrix2Half[1] * matrix2Half[1] + matrix2Half[0] * matrix2Half[0], (2 * matrix2Half[0] - matrix2Half[1]) * matrix2Half[1]]
        } else {
            let matrix2Half = getMatrix2(n >> 1)
            return [(2 * matrix2Half[1] + matrix2Half[0])*matrix2Half[0], matrix2Half[1] * matrix2Half[1] + matrix2Half[0] * matrix2Half[0]]
        }
    }
    if (n < 1) {
        return 0
    } else if (n == 1) {
        return 1
    } else {
        return getMatrix2(n)[1]
    }

}

console.log('Fibonacci_5', Fibonacci_5(40))