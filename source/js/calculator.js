  const depositCalculator = document.getElementById('deposit-calc')
  const depositInput = document.getElementById('deposit');
  const depositValue = document.getElementById('deposit-value');
  const interestRateElement = document.getElementById('interest-rate');
  const finalAmountElement = document.getElementById('final-amount');
  const profitElement = document.getElementById('profit');
  const durationButtons = document.querySelectorAll('.duration-btn');

  let currentMonths = 6;
  let interestRate = 0.22; // 22%

  function updateCalculator() {
    const depositAmount = parseInt(depositInput.value, 10);
    const profit = Math.round(depositAmount * interestRate * (currentMonths / 12));
    const finalAmount = depositAmount + profit;
    depositValue.textContent = new Intl.NumberFormat('ru-RU').format(depositAmount) + ' ₽';
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




  const creditCalculator = document.getElementById('credit')
  const openCreditCalculator = document.getElementById('open-credit-calculator')
  const creditAmountInput = document.getElementById('credit-amount');
  const creditTermInput = document.getElementById('credit-term');
  const creditAmountValue = document.getElementById('credit-amount-value');
  const creditTermValue = document.getElementById('credit-term-value');
  const creditMonthlyPaymentElement = document.getElementById('credit-monthly-payment');
  const creditInterestRate = 0.2999; // 29.99% годовых


  openCreditCalculator.addEventListener('click', () => {

    if (creditCalculator.style.display === 'none' || creditCalculator.style.display === '') {
      creditCalculator.style.display = 'block'
    } else {
      creditCalculator.style.display = 'none';
    }
  })


  function calculateCreditMonthlyPayment(amount, years, rate) {
    const monthlyRate = rate / 12;
    const totalMonths = years * 12;
    return Math.round(
      (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths))
    );
  }
  function updateCreditCalculator() {
    const creditAmount = parseInt(creditAmountInput.value, 10);
    const creditTerm = parseInt(creditTermInput.value, 10);
    const creditMonthlyPayment = calculateCreditMonthlyPayment(creditAmount, creditTerm, creditInterestRate);
    creditAmountValue.textContent = new Intl.NumberFormat('ru-RU').format(creditAmount) + ' ₽';
    creditTermValue.textContent = creditTerm + ' ' + (creditTerm === 1 ? 'год' : 'лет');
    creditMonthlyPaymentElement.textContent = new Intl.NumberFormat('ru-RU').format(creditMonthlyPayment) + ' ₽';
  }
  creditAmountInput.addEventListener('input', updateCreditCalculator);
  creditTermInput.addEventListener('input', updateCreditCalculator);
  // Initial calculation
  updateCreditCalculator();




  const mortgageCalculator = document.getElementById('mortage-calc')
  const openMorgageCalculator = document.getElementById('open-mortgage-calculator')
  const propertyCostInput = document.getElementById('property-cost');
  const downPaymentInput = document.getElementById('down-payment');
  const loanDurationInput = document.getElementById('loan-duration');
  const propertyCostValue = document.getElementById('property-cost-value');
  const downPaymentValue = document.getElementById('down-payment-value');
  const loanDurationValue = document.getElementById('loan-duration-value');
  const monthlyCostElement = document.getElementById('monthly-cost');
  const creditAmountElement = document.getElementById('credit-amount');
  const creditDurationElement = document.getElementById('credit-duration');
  const annualRate = 0.0299; // 2.99% годовых

  openMorgageCalculator.addEventListener('click', () => {

    if (mortgageCalculator.style.display === 'none' || mortgageCalculator.style.display === '') {
        mortgageCalculator.style.display = 'block'
    } else {
      mortgageCalculator.style.display = 'none';
    }
  })

  function calculateMonthlyCost(amount, years, rate) {
    const monthlyRate = rate / 12;
    const totalMonths = years * 12;
    return Math.round(
      (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths))
    );
  }

  function refreshWidget() {
    const propertyCost = parseInt(propertyCostInput.value, 10);
    const downPayment = parseInt(downPaymentInput.value, 10);
    const loanDuration = parseInt(loanDurationInput.value, 10);
    const creditAmount = propertyCost - downPayment;
    const monthlyCost = calculateMonthlyCost(creditAmount, loanDuration, annualRate);
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

  const creditCalculator = document.getElementById('credit')
  const depositCalculator = document.getElementById('deposit-calc')
  const mortgageCalculator = document.getElementById('mortage-calc')



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


  // function borderColor(borderToColor) {
  //   depositCalculator.style.border = "none";
  //   creditCalculator.style.border = "none";
  //   mortgageCalculator.style.border = "none";

  //   borderToColor.style.border = "white";
  // }


  // borderColor(depositCalculator);
  // Получаем кнопки
// const depositButton = document.getElementById('open-deposit-calculator');
// const creditButton = document.getElementById('open-credit-calculator');
// const mortgageButton = document.getElementById('open-mortgage-calculator');

// Функция для удаления класса 'selected' с всех кнопок
// Получаем кнопки
// const depositButton = document.getElementById('open-deposit-calculator');
// const creditButton = document.getElementById('open-credit-calculator');
// const mortgageButton = document.getElementById('open-mortgage-calculator');

// Функция для удаления класса 'selected' с всех кнопок
function removeSelected() {
  depositButton.classList.remove('selected');
  creditButton.classList.remove('selected');
  mortgageButton.classList.remove('selected');
}

// Слушатели событий для кнопок
depositButton.addEventListener('click', () => {
  removeSelected();  // Убираем эффект с других кнопок
  depositButton.classList.add('selected');  // Добавляем эффект на эту кнопку
});

creditButton.addEventListener('click', () => {
  removeSelected();  // Убираем эффект с других кнопок
  creditButton.classList.add('selected');  // Добавляем эффект на эту кнопку
});

mortgageButton.addEventListener('click', () => {
  removeSelected();  // Убираем эффект с других кнопок
  mortgageButton.classList.add('selected');  // Добавляем эффект на эту кнопку
});

});


