document.addEventListener("DOMContentLoaded", function () {
  var cardDetails = document.querySelector(".form");
  var confirmationPopUp = document.querySelector(".confirmation");
  var confirmButton = document.querySelector("#confirm");
  var continueButton = document.querySelector("#continue");
  var cardNumberInput = document.querySelector("#cardNumber");
  var ownerNameInput = document.querySelector("#ownweNameInput");
  var monthInput = document.querySelector("#month");
  var yearInput = document.querySelector("#year");
  var cvvInput = document.querySelector("#cvv");

  var errorMessageCardNumber = document.querySelector(
    "#errorMessageCardNumber"
  );
  var errorMessageDate = document.querySelector("#errorMessageDate");
  var errorMessageCVV = document.querySelector("#errorMessageCVV");

  var cardNumberDisplay = document.querySelector("#card-number");
  var ownerName = document.querySelector("#owner-name");
  var expiryDateElement = document.querySelector("#expiry-date");

  monthInput.addEventListener("input", updateExpiryDate);
  yearInput.addEventListener("input", updateExpiryDate);

  function updateExpiryDate() {
    var monthValue = monthInput.value;
    var yearValue = yearInput.value;
    var montherorr = document.querySelector("#MonthError");

    var cleanedMonth = monthValue.replace(/\D/g, "");

    cleanedMonth = cleanedMonth.slice(0, 2);

    if (
      cleanedMonth !== "" &&
      (parseInt(cleanedMonth, 10) < 1 || parseInt(cleanedMonth, 10) > 12)
    ) {
      montherorr.style.display = "block";
    } else {
      montherorr.style.display = "none";
    }

    expiryDateElement.textContent = formatExpiryDate(monthValue, yearValue);
  }

  function formatExpiryDate(month, year) {
    return month + "/" + year;
  }

  cardNumberInput.addEventListener("input", function () {
    var inputValue = cardNumberInput.value.replace(/\s/g, "");

    var formattedCardNumber = inputValue.replace(/(\d{4})/g, "$1 ").trim();
    cardNumberInput.value = formattedCardNumber;
    cardNumberDisplay.textContent = formattedCardNumber;

    errorMessageCardNumber.style.display = "none";
  });

  ownerNameInput.addEventListener("input", function () {
    var inputValue = ownerNameInput.value;
    ownerName.textContent = inputValue;

    errorMessageCardNumber.style.display = "none";
  });

  confirmButton.addEventListener("click", function () {
    var monthValue = monthInput.value;
    var cleanedMonth = monthValue.replace(/\D/g, "");

    cleanedMonth = cleanedMonth.slice(0, 2);

    if (
      cardNumberInput.value.trim() === "" ||
      ownerNameInput.value.trim() === "" ||
      monthInput.value.trim() === "" ||
      yearInput.value.trim() === "" ||
      (cleanedMonth !== "" &&
        (parseInt(cleanedMonth, 10) < 1 || parseInt(cleanedMonth, 10) > 12))
    ) {
      errorMessageCardNumber.style.display =
        cardNumberInput.value.trim() === "" ? "block" : "none";
      cardNumberInput.style.border =
        cardNumberInput.value.trim() === ""
          ? "1px solid red"
          : "1px solid #e8e8e8";
      errorMessageDate.style.display =
        monthInput.value.trim() === "" || yearInput.value.trim() === ""
          ? "block"
          : "none";
      errorMessageCVV.style.display =
        cvvInput.value.trim() === "" ? "block" : "none";

      return;
    }

    // Clear error messages if all fields are filled
    errorMessageCardNumber.style.display = "none";
    errorMessageDate.style.display = "none";
    errorMessageCVV.style.display = "none";

    confirmationPopUp.style.display = "flex";
    cardDetails.style.display = "none";
  });

  function isNumeric(value) {
    return /^\d+$/.test(value);
  }

  continueButton.addEventListener("click", function () {
    cardNumberInput.value = "";
    ownerNameInput.value = "";
    monthInput.value = "";
    yearInput.value = "";
    document.querySelector("#cvv").value = "";

    cardNumberDisplay.textContent = "0000 0000 0000 0000";
    ownerName.textContent = "JANE APPLESEED";
    expiryDateElement.textContent = "00/00";

    cardDetails.style.display = "flex";
    confirmationPopUp.style.display = "none";
  });
});
