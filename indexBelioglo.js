// Создание класса TransactionAnalyzer для обработки транзакций
class TransactionAnalyzer {
    // Конструктор класса, принимающий список транзакций
    constructor(transactions) {
        // Присвоение списка транзакций в свойство transactions
        this.transactions = transactions;
        // Добавление метода string() к каждой транзакции (это относится к экстра заданию)
        this.transactions.forEach(transaction => {
            transaction.string = function () {
                return JSON.stringify(transaction);
            }
        });
    }

    // Метод для добавления новой транзакции в список
    addTransaction(transaction) {
        this.transactions.push(transaction);
        // Добавление метода string() к добавленной транзакции (это относится к экстра заданию)
        transaction.string = function () {
            return JSON.stringify(transaction);
        }
    }

    // Метод для получения всех транзакций из списка
    getAllTransactions() {
        return this.transactions;
    }

    // Метод для получения уникальных типов транзакций
    getUniqueTransactionTypes() {
        // Создание Set для хранения уникальных типов
        const types = new Set();
        // Итерация по списку транзакций и добавление типов в Set
        this.transactions.forEach(transaction => {
            types.add(transaction.transaction_type);
        });
        // Преобразование Set в массив и возврат результата
        return Array.from(types);
    }

    // Метод для вычисления общей суммы всех транзакций
    calculateTotalAmount() {
        // Инициализация переменной для хранения общей суммы
        let totalAmount = 0;
        // Итерация по списку транзакций и суммирование суммы транзакций
        this.transactions.forEach(transaction => {
            totalAmount += parseFloat(transaction.transaction_amount);
        });
        // Возврат общей суммы, округленной до двух знаков после запятой
        return totalAmount.toFixed(2);
    }

    // Метод для вычисления общей суммы транзакций по указанной дате
    calculateTotalAmountByDate(year, month, day) {
        // Инициализация переменной для хранения общей суммы
        let totalAmount = 0;
        // Итерация по списку транзакций и суммирование суммы транзакций за указанную дату
        this.transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            if (
                (!year || transactionDate.getFullYear() === year) &&
                (!month || transactionDate.getMonth() + 1 === month) &&
                (!day || transactionDate.getDate() === day)
            ) {
                totalAmount += parseFloat(transaction.transaction_amount);
            }
        });
        // Возврат общей суммы, округленной до двух знаков после запятой
        return totalAmount.toFixed(2);
    }

    // Метод для получения транзакций указанного типа
    getTransactionsByType(type) {
        return this.transactions.filter(transaction => transaction.transaction_type === type);
    }

    // Метод для получения транзакций в заданном диапазоне дат
    getTransactionsInDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate >= start && transactionDate <= end;
        });
    }

    // Метод для получения транзакций с указанным торговым местом или компанией
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }

    // Метод для вычисления средней суммы транзакций
    calculateAverageTransactionAmount() {
        // Вычисление общей суммы транзакций
        const totalAmount = this.calculateTotalAmount();
        // Вычисление средней суммы по формуле: общая сумма / количество транзакций
        const averageAmount = totalAmount / this.transactions.length;
        // Возврат средней суммы, округленной до двух знаков после запятой
        return averageAmount.toFixed(2);
    }

    // Метод для получения транзакций с суммой в заданном диапазоне
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(transaction => {
            const amount = parseFloat(transaction.transaction_amount);
            return amount >= minAmount && amount <= maxAmount;
        });
    }

    // Метод для вычисления общей суммы дебетовых транзакций
    calculateTotalDebitAmount() {
        // Инициализация переменной для хранения общей суммы дебетовых транзакций
        let totalDebitAmount = 0;
        // Итерация по списку транзакций и суммирование суммы дебетовых транзакций
        this.transactions.forEach(transaction => {
            if (transaction.transaction_type === 'debit') {
                totalDebitAmount += parseFloat(transaction.transaction_amount);
            }
        });
        // Возврат общей суммы, округленной до двух знаков после запятой
        return totalDebitAmount.toFixed(2);
    }

    // Метод для нахождения месяца с наибольшим количеством транзакций
    findMostTransactionsMonth() {
        // Создание Map для хранения количества транзакций по месяцам
        const months = new Map();
        // Итерация по списку транзакций и подсчет количества транзакций по месяцам
        this.transactions.forEach(transaction => {
            const month = new Date(transaction.transaction_date).getMonth() + 1;
            if (months.has(month)) {
                months.set(month, months.get(month) + 1);
            } else {
                months.set(month, 1);
            }
        });
        // Поиск месяца с наибольшим количеством транзакций
        let mostTransactionsMonth = null;
        let maxTransactions = 0;
        months.forEach((count, month) => {
            if (count > maxTransactions) {
                mostTransactionsMonth = month;
                maxTransactions = count;
            }
        });
                // Возврат месяца с наибольшим количеством транзакций
                return mostTransactionsMonth;
            }
        
            // Метод для нахождения месяца с наибольшим количеством дебетовых транзакций
            findMostDebitTransactionMonth() {
                // Создание Map для хранения количества дебетовых транзакций по месяцам
                const debitMonths = new Map();
                // Итерация по списку транзакций и подсчет количества дебетовых транзакций по месяцам
                this.transactions.forEach(transaction => {
                    if (transaction.transaction_type === 'debit') {
                        const month = new Date(transaction.transaction_date).getMonth() + 1;
                        if (debitMonths.has(month)) {
                            debitMonths.set(month, debitMonths.get(month) + 1);
                        } else {
                            debitMonths.set(month, 1);
                        }
                    }
                });
                // Поиск месяца с наибольшим количеством дебетовых транзакций
                let mostDebitTransactionMonth = null;
                let maxDebitTransactions = 0;
                debitMonths.forEach((count, month) => {
                    if (count > maxDebitTransactions) {
                        mostDebitTransactionMonth = month;
                        maxDebitTransactions = count;
                    }
                });
                // Возврат месяца с наибольшим количеством дебетовых транзакций
                return mostDebitTransactionMonth;
            }
        
            // Метод для определения, какой тип транзакций встречается чаще: дебетовые, кредитовые или равное количество
            mostTransactionTypes() {
                // Инициализация переменных для подсчета количества дебетовых и кредитовых транзакций
                let debitCount = 0;
                let creditCount = 0;
                // Итерация по списку транзакций и подсчет количества дебетовых и кредитовых транзакций
                this.transactions.forEach(transaction => {
                    if (transaction.transaction_type === 'debit') {
                        debitCount++;
                    } else if (transaction.transaction_type === 'credit') {
                        creditCount++;
                    }
                });
                // Сравнение количества дебетовых и кредитовых транзакций
                if (debitCount > creditCount) {
                    return 'debit';
                } else if (creditCount > debitCount) {
                    return 'credit';
                } else {
                    return 'equal';
                }
            }
        
            // Метод для получения транзакций, совершенных до указанной даты
            getTransactionsBeforeDate(date) {
                // Преобразование строки с датой в объект Date
                const targetDate = new Date(date);
                // Фильтрация транзакций: оставляем только те, которые были совершены до указанной даты
                return this.transactions.filter(transaction => {
                    const transactionDate = new Date(transaction.transaction_date);
                    return transactionDate < targetDate;
                });
            }
        
            // Метод для поиска транзакции по ее уникальному идентификатору
            findTransactionById(id) {
                // Поиск транзакции по уникальному идентификатору
                return this.transactions.find(transaction => transaction.transaction_id === id);
            }
        
            // Метод для отображения описаний всех транзакций в виде массива
            mapTransactionDescriptions() {
                // Преобразование списка транзакций в список их описаний
                return this.transactions.map(transaction => transaction.transaction_description);
            }
        }
        
        // Создание экземпляра класса TransactionAnalyzer с пустым списком транзакций
        const transactionAnalyzer = new TransactionAnalyzer([]);

        // Добавление новой транзакции
        transactionAnalyzer.addTransaction({
            transaction_id: "1",
            transaction_date: "2019-01-01",
            transaction_amount: "100.00",
            transaction_type: "debit",
            transaction_description: "Payment for groceries",
            merchant_name: "SuperMart",
            card_type: "Visa",
        });
        

        // Пример использования метода string() для первой транзакции (это относится к экстра заданию)
        console.log('String representation of the first transaction:', transactionAnalyzer.getAllTransactions()[0].string());

        // Примеры использования методов класса
        const uniqueTransactionTypes = transactionAnalyzer.getUniqueTransactionTypes();
        console.log('Unique Transaction Types:', uniqueTransactionTypes);
        
        const totalAmount = transactionAnalyzer.calculateTotalAmount();
        console.log('Total Amount:', totalAmount);
        
        const totalAmountByDate = transactionAnalyzer.calculateTotalAmountByDate(2019, 1, 1);
        console.log('Total Amount by Date:', totalAmountByDate);
        
        const debitTransactions = transactionAnalyzer.getTransactionsByType('debit');
        console.log('Debit Transactions:', debitTransactions);
        
        const transactionsInRange = transactionAnalyzer.getTransactionsInDateRange('2019-01-01', '2019-12-31');
        console.log('Transactions in Date Range:', transactionsInRange);
        
        const transactionsByMerchant = transactionAnalyzer.getTransactionsByMerchant('SuperMart');
        console.log('Transactions by Merchant:', transactionsByMerchant);
        
        const averageTransactionAmount = transactionAnalyzer.calculateAverageTransactionAmount();
        console.log('Average Transaction Amount:', averageTransactionAmount);
        
        const transactionsByAmountRange = transactionAnalyzer.getTransactionsByAmountRange(50, 150);
        console.log('Transactions by Amount Range:', transactionsByAmountRange);
        
        const totalDebitAmount = transactionAnalyzer.calculateTotalDebitAmount();
        console.log('Total Debit Amount:', totalDebitAmount);
        
        // Нахождение месяца с наибольшим количеством транзакций
        const mostTransactionsMonth = transactionAnalyzer.findMostTransactionsMonth();
        console.log('Month with Most Transactions:', mostTransactionsMonth);

        // Нахождение месяца с наибольшим количеством дебетовых транзакций
        const mostDebitTransactionMonth = transactionAnalyzer.findMostDebitTransactionMonth();
        console.log('Month with Most Debit Transactions:', mostDebitTransactionMonth);

        // Определение типа транзакций (дебетовые, кредитовые или равное количество)
        const mostTransactionType = transactionAnalyzer.mostTransactionTypes();
        console.log('Most Transaction Type:', mostTransactionType);

        // Получение транзакций, совершенных до указанной даты
        const transactionsBeforeDate = transactionAnalyzer.getTransactionsBeforeDate('2019-06-30');
        console.log('Transactions Before Date:', transactionsBeforeDate);

        // Поиск транзакции по ее уникальному идентификатору
        const transactionById = transactionAnalyzer.findTransactionById('1');
        console.log('Transaction by ID:', transactionById);

        // Получение списка описаний всех транзакций
        const transactionDescriptions = transactionAnalyzer.mapTransactionDescriptions();
        console.log('Transaction Descriptions:', transactionDescriptions);

        