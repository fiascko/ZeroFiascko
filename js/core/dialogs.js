const alertDialog = document.getElementById("alertDialog");
const alertDialogTitle = document.getElementById("alertDialogTitle");
const alertDialogMessage = document.getElementById("alertDialogMessage");
const alertDialogOkButton = document.getElementById("alertDialogOkButton");

function showAlert(title, message) {
    alertDialogTitle.textContent = title;
    alertDialogMessage.textContent = message;
    alertDialog.showModal();
    alertDialogOkButton.focus();
}

alertDialogOkButton.addEventListener("click", () => {
    alertDialog.close();
});
