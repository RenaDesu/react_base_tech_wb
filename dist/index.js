"use strict";
var AccountState;
(function (AccountState) {
    AccountState[AccountState["Open"] = 1] = "Open";
    AccountState[AccountState["Closed"] = 2] = "Closed";
})(AccountState || (AccountState = {}));
class Account {
    constructor(data) {
        this.accountData = data;
        this.balance = this.formatSum(data.balance);
        this.accountState = data.state;
        this.currency = data.currency;
    }
    closeAccount() {
        this.accountState = AccountState.Closed;
        alert(`Success! Your account is closed.`);
    }
    getBalanceState() {
        if (this.isClosedAccount()) {
            this.showAccountStateMessage();
            return;
        }
        return `Your balance is ${this.balance} ${this.currency}`;
    }
    depositMoney(sum) {
        if (this.isClosedAccount()) {
            this.showAccountStateMessage();
            return;
        }
        this.balance = this.formatSum(this.balance + sum);
    }
    withdrawMoney(sum) {
        if (this.isClosedAccount()) {
            this.showAccountStateMessage();
            return;
        }
        const withdrawSum = this.formatSum(sum);
        if (withdrawSum > this.balance) {
            alert('Error, limit exceeded');
            return;
        }
        this.balance = this.formatSum(this.balance - withdrawSum);
    }
    formatSum(sum) {
        return Number(sum.toFixed(1));
    }
    showAccountStateMessage() {
        alert('Error, your account is closed');
    }
    isClosedAccount() {
        return this.accountState === AccountState.Closed;
    }
}
class DebitAccount extends Account {
    // Тут можно было придумать особые условия обслуживания и т.п. Но сосредоточилась на CreditAccount
    constructor(data) {
        super(data);
    }
}
class CreditAccount extends Account {
    constructor(data, creditLimit, debtSum) {
        super(data);
        this.creditLimit = creditLimit;
        this.debtSum = debtSum ? debtSum : 0;
    }
    getCreditLimitState() {
        if (this.isClosedAccount()) {
            this.showAccountStateMessage();
            return;
        }
        return `Your credit limit is ${this.creditLimit} ${this.currency}`;
    }
    getDebtState() {
        if (this.isClosedAccount()) {
            this.showAccountStateMessage();
            return;
        }
        return `Your debt is ${this.debtSum} ${this.currency}`;
    }
    payOffDebt(sum) {
        if (this.formatSum(sum) > this.debtSum) {
            this.balance = this.formatSum(this.balance + (sum - this.debtSum));
            this.creditLimit = this.formatSum(this.creditLimit + this.debtSum);
            this.debtSum = 0;
            return;
        }
        this.debtSum = this.formatSum(this.debtSum - sum);
        this.creditLimit = this.formatSum(this.creditLimit + this.debtSum);
    }
    withdrawMoney(sum) {
        if (this.isClosedAccount()) {
            this.showAccountStateMessage();
            return;
        }
        const sumAvailable = this.balance + this.creditLimit;
        if (this.formatSum(sum) > sumAvailable) {
            alert('Error, limit exceeded');
            return;
        }
        if (this.formatSum(sum) > this.balance) {
            const sumToCredit = this.formatSum(sum - this.balance);
            this._useCreditOption(sumToCredit);
            this.balance = 0;
            return;
        }
        this.balance = this.formatSum(this.balance - sum);
    }
    closeAccount() {
        if (this.debtSum > 0) {
            alert(`Error, you have unpaid debt. Your debt is ${this.debtSum} ${this.currency}`);
            return;
        }
        this.accountState = AccountState.Closed;
        alert(`Success! Your account is closed.`);
    }
    _useCreditOption(sum) {
        if (sum > this.creditLimit) {
            alert('Error, credit limit exceeded');
            return;
        }
        this.creditLimit = this.formatSum(this.creditLimit - sum);
        this.debtSum = this.formatSum(this.debtSum + sum);
    }
}
const debitAccount = new DebitAccount({
    state: 1,
    balance: 5000,
    currency: 'RUB',
});
// Раскомментировать для debitAccount
// console.log(debitAccount.getBalanceState());
// debitAccount.depositMoney(2000.60000);
// console.log(debitAccount.getBalanceState());
// debitAccount.withdrawMoney(4200);
// console.log(debitAccount.getBalanceState());
// debitAccount.withdrawMoney(2800.7);
// console.log(debitAccount.getBalanceState());
// debitAccount.closeAccount();
// debitAccount.withdrawMoney(4200);
const creditAccount = new CreditAccount({
    state: 1,
    balance: 50000,
    currency: 'RUB',
}, 100000);
// Раскомментировать для creditAccount
// console.log(creditAccount.getBalanceState());
// creditAccount.withdrawMoney(49000);
// console.log(creditAccount.getBalanceState());
// creditAccount.withdrawMoney(1000);
// console.log(creditAccount.getBalanceState());
// console.log(creditAccount.getCreditLimitState());
// console.log(creditAccount.getDebtState());
// creditAccount.withdrawMoney(4000);
// console.log(creditAccount.getBalanceState());
// console.log(creditAccount.getCreditLimitState());
// console.log(creditAccount.getDebtState());
// creditAccount.depositMoney(5000);
// console.log(creditAccount.getBalanceState());
// console.log(creditAccount.getCreditLimitState());
// console.log(creditAccount.getDebtState());
// creditAccount.closeAccount();
// creditAccount.payOffDebt(4500);
// console.log(creditAccount.getBalanceState());
// console.log(creditAccount.getCreditLimitState());
// console.log(creditAccount.getDebtState());
// creditAccount.closeAccount();
// creditAccount.depositMoney(5000);
