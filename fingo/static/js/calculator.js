const depositCalculator = document.getElementById('deposit-calc');
const depositInput = document.getElementById('deposit');
const depositValue = document.getElementById('deposit-value');
const interestRateElement = document.getElementById('interest-rate');
const finalAmountElement = document.getElementById('final-amount');
const profitElement = document.getElementById('profit');
const durationButtons = document.querySelectorAll('.duration-btn');

// Central Bank of Russia's key rate (as of late 2024)
const centralBankKeyRate = 0.21; // 21%
let currentMonths = 6;
let interestRate = centralBankKeyRate; // Deposit rate aligned with key rate

function updateCalculator() {
    const depositAmount = parseInt(depositInput.value, 10);
    const profit = Math.round(depositAmount * interestRate * (currentMonths / 12));
    const finalAmount = depositAmount + profit;
    depositValue.textContent = new Intl.NumberFormat('ru-RU').format(depositAmount) + ' ₽';
    interestRateElement.textContent = (interestRate * 100).toFixed(1) + '%';
    finalAmountElement.textContent = new Intl.NumberFormat('ru-RU').format(finalAmount) + ' ₽';
    profitElement.textContent = new Intl.NumberFormat('ru-RU').format(profit) + ' ₽';
}

depositInput.addEventListener('input', updateCalculator);
durationButtons.forEach(button => {
    button.addEventListener('click', () => {
        durationButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentMonths = parseInt(button.dataset.months, 10);
        updateCalculator();
    });
});
// Initial calculation
updateCalculator();

const creditCalculator = document.getElementById('credit');
const openCreditCalculator = document.getElementById('open-credit-calculator');
const creditAmountInput = document.getElementById('credit-amount');
const creditTermInput = document.getElementById('credit-term');
const creditAmountValue = document.getElementById('credit-amount-value');
const creditTermValue = document.getElementById('credit-term-value');
const creditMonthlyPaymentElement = document.getElementById('credit-monthly-payment');
const creditInterestRate = centralBankKeyRate + 0.0899; // Key rate + 8.99% = 29.99%

openCreditCalculator.addEventListener('click', () => {
    if (creditCalculator.style.display === 'none' || creditCalculator.style.display === '') {
        creditCalculator.style.display = 'block';
    } else {
        creditCalculator.style.display = 'none';
    }
});

function calculateCreditMonthlyPayment(amount, months, rate) {
    const monthlyRate = rate / 12;
    return Math.round(
        (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
    );
}

function getFormattedTerm(months) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    let termText = '';
    if (years > 0) {
        const yearText = years === 1 ? 'год' : (years >= 2 && years <= 4 ? 'года' : 'лет');
        termText = `${years} ${yearText}`;
        if (remainingMonths > 0) {
            const monthText = remainingMonths === 1 ? 'месяц' : (remainingMonths >= 2 && remainingMonths <= 4 ? 'месяца' : 'месяцев');
            termText += ` ${remainingMonths} ${monthText}`;
        }
    } else if (remainingMonths > 0) {
        const monthText = remainingMonths === 1 ? 'месяц' : (remainingMonths >= 2 && remainingMonths <= 4 ? 'месяца' : 'месяцев');
        termText = `${remainingMonths} ${monthText}`;
    }

    return termText || '0 месяцев';
}

function updateCreditCalculator() {
    const creditAmount = parseInt(creditAmountInput.value, 10);
    const creditTermMonths = parseInt(creditTermInput.value, 10); // Now in months
    const creditMonthlyPayment = calculateCreditMonthlyPayment(creditAmount, creditTermMonths, creditInterestRate);
    creditAmountValue.textContent = new Intl.NumberFormat('ru-RU').format(creditAmount) + ' ₽';
    creditTermValue.textContent = getFormattedTerm(creditTermMonths);
    creditMonthlyPaymentElement.textContent = new Intl.NumberFormat('ru-RU').format(creditMonthlyPayment) + ' ₽';
}

creditAmountInput.addEventListener('input', updateCreditCalculator);
creditTermInput.addEventListener('input', updateCreditCalculator);
// Initial calculation
updateCreditCalculator();

const mortgageCalculator = document.getElementById('mortage-calc');
const openMorgageCalculator = document.getElementById('open-mortgage-calculator');
const propertyCostInput = document.getElementById('property-cost');
const downPaymentInput = document.getElementById('down-payment');
const loanDurationInput = document.getElementById('loan-duration');
const propertyCostValue = document.getElementById('property-cost-value');
const downPaymentValue = document.getElementById('down-payment-value');
const loanDurationValue = document.getElementById('loan-duration-value');
const monthlyCostElement = document.getElementById('monthly-cost');
const creditAmountElement = document.getElementById('credit-amount');
const creditDurationElement = document.getElementById('credit-duration');
const annualRate = centralBankKeyRate - 0.02; // Key rate - 2% = 19%

openMorgageCalculator.addEventListener('click', () => {
    if (mortgageCalculator.style.display === 'none' || mortgageCalculator.style.display === '') {
        mortgageCalculator.style.display = 'block';
    } else {
        mortgageCalculator.style.display = 'none';
    }
});

function calculateMonthlyCost(amount, years, rate) {
    const monthlyRate = rate / 12;
    const totalMonths = years * 12;
    return Math.round(
        (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths))
    );
}

function refreshWidget() {
    const propertyCost = Math.max(300000, parseInt(propertyCostInput.value, 10)); // Minimum 300,000 RUB
    const minDownPayment = Math.round(propertyCost * 0.2); // 20% of property cost
    let downPayment = parseInt(downPaymentInput.value, 10);

    // Ensure down payment is valid and within bounds
    downPayment = Math.max(minDownPayment, downPayment); // Ensure min 20%
    downPayment = Math.min(downPayment, propertyCost); // Cannot exceed property cost

    const loanDuration = parseInt(loanDurationInput.value, 10);
    const creditAmount = propertyCost - downPayment;
    const monthlyCost = calculateMonthlyCost(creditAmount, loanDuration, annualRate);

    // Update input values to reflect constraints
    propertyCostInput.value = propertyCost;
    downPaymentInput.value = downPayment;

    // Update down payment slider min and max
    downPaymentInput.min = minDownPayment;
    downPaymentInput.max = propertyCost;

    propertyCostValue.textContent = new Intl.NumberFormat('ru-RU').format(propertyCost) + ' ₽';
    downPaymentValue.textContent = new Intl.NumberFormat('ru-RU').format(downPayment) + ' ₽';
    loanDurationValue.textContent = loanDuration + ' ' + (loanDuration === 1 ? 'год' : 'лет');
    monthlyCostElement.textContent = new Intl.NumberFormat('ru-RU').format(monthlyCost) + ' ₽';
    creditAmountElement.textContent = new Intl.NumberFormat('ru-RU').format(creditAmount) + ' ₽';
    creditDurationElement.textContent = loanDuration + ' лет';
}

propertyCostInput.addEventListener('input', refreshWidget);
downPaymentInput.addEventListener('input', refreshWidget);
loanDurationInput.addEventListener('input', refreshWidget);
// Initial calculation
refreshWidget();

document.addEventListener("DOMContentLoaded", function () {
    const depositButton = document.getElementById("open-deposit-calculator");
    const creditButton = document.getElementById("open-credit-calculator");
    const mortgageButton = document.getElementById("open-mortgage-calculator");

    const creditCalculator = document.getElementById('credit');
    const depositCalculator = document.getElementById('deposit-calc');
    const mortgageCalculator = document.getElementById('mortage-calc');

    function showCalculator(calculatorToShow) {
        depositCalculator.style.display = "none";
        creditCalculator.style.display = "none";
        mortgageCalculator.style.display = "none";
        calculatorToShow.style.display = "block";
    }

    depositButton.addEventListener("click", function () {
        showCalculator(depositCalculator);
    });

    creditButton.addEventListener("click", function () {
        showCalculator(creditCalculator);
    });

    mortgageButton.addEventListener("click", function () {
        showCalculator(mortgageCalculator);
    });

    showCalculator(depositCalculator);

    function removeSelected() {
        depositButton.classList.remove('selected');
        creditButton.classList.remove('selected');
        mortgageButton.classList.remove('selected');
    }

    depositButton.addEventListener('click', () => {
        removeSelected();
        depositButton.classList.add('selected');
    });

    creditButton.addEventListener('click', () => {
        removeSelected();
        creditButton.classList.add('selected');
    });

    mortgageButton.addEventListener('click', () => {
        removeSelected();
        mortgageButton.classList.add('selected');
    });
});