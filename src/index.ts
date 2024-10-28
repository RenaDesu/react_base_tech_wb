interface AccountInterface {
    state: AccountState;
    balance: number;
    currency: string;
}

enum AccountState {
    Open = 1,
    Closed,
}

class Account {
   protected accountData: AccountInterface;
   protected balance: number;
   protected accountState: AccountState;
   protected currency: string;

   constructor(data: AccountInterface) {
    this.accountData = data;
    this.balance = this.formatSum(data.balance);
    this.accountState = data.state;
    this.currency = data.currency;
   }

   closeAccount() {
    this.accountState = AccountState.Closed;
    alert(`Success! Your account is closed.`);   
   }

   getBalanceState(): string | void {
    if (this.isClosedAccount()) {
        this.showAccountStateMessage();
        return;
    }

    return `Your balance is ${this.balance} ${this.currency}`;
   }

   depositMoney(sum: number): void {
    if (this.isClosedAccount()) {
        this.showAccountStateMessage();
        return;
    }

    this.balance = this.formatSum(this.balance + sum);
   }

   withdrawMoney(sum: number): void {
    if (this.isClosedAccount()) {
        this.showAccountStateMessage();
        return;
    }

    const withdrawSum: number = this.formatSum(sum);

    if (withdrawSum > this.balance) {
        alert('Error, limit exceeded');
        return;
    }
    this.balance = this.formatSum(this.balance - withdrawSum);
   }

   protected formatSum(sum: number): number {
    return Number(sum.toFixed(1));
   }

   protected showAccountStateMessage(): void {
    alert('Error, your account is closed');
   }

   protected isClosedAccount(): boolean {
    return this.accountState === AccountState.Closed;
   }
}

class DebitAccount extends Account {
    // Тут можно было придумать особые условия обслуживания и т.п. Но сосредоточилась на CreditAccount
    constructor(data: AccountInterface) {
        super(data);
    }
}

class CreditAccount extends Account {
    protected creditLimit: number;
    protected debtSum: number;

    constructor(data: AccountInterface, creditLimit: number, debtSum?: number) {
        super(data);
        this.creditLimit = creditLimit;
        this.debtSum = debtSum ? debtSum : 0;
    }

    getCreditLimitState(): string | void {
        if (this.isClosedAccount()) {
            this.showAccountStateMessage();
            return;
        }

        return `Your credit limit is ${this.creditLimit} ${this.currency}`;
    }

    getDebtState(): string | void {
        if (this.isClosedAccount()) {
            this.showAccountStateMessage();
            return;
        }

        return `Your debt is ${this.debtSum} ${this.currency}`;
    }

    payOffDebt(sum: number): void {
        if (this.formatSum(sum) > this.debtSum) {
            this.balance = this.formatSum(this.balance + (sum - this.debtSum));

            this.creditLimit = this.formatSum(this.creditLimit + this.debtSum);

            this.debtSum = 0;
            return;
        }

        this.debtSum = this.formatSum(this.debtSum - sum);
        this.creditLimit = this.formatSum(this.creditLimit + this.debtSum);
    }

    withdrawMoney(sum: number): void {
        if (this.isClosedAccount()) {
            this.showAccountStateMessage();
            return;
        }

        const sumAvailable: number = this.balance + this.creditLimit;

        if (this.formatSum(sum) > sumAvailable) {
            alert('Error, limit exceeded');
            return;
        }
        if (this.formatSum(sum) > this.balance) {
            const sumToCredit: number = this.formatSum(sum - this.balance);
            this._useCreditOption(sumToCredit);
            this.balance = 0;
            return;
        }
        this.balance = this.formatSum(this.balance - sum);
    }

    closeAccount(): void {
        if (this.debtSum > 0) {
            alert(`Error, you have unpaid debt. Your debt is ${this.debtSum} ${this.currency}`);
            return;
        }
        this.accountState = AccountState.Closed;
        alert(`Success! Your account is closed.`);
    }

    private _useCreditOption(sum: number): void {
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
},
100000
);

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