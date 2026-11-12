/* Copyright (c) Fiascko. All rights reserved. | Project: ZeroFiascko | File: dialog.js */

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

document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
        if (event.target !== dialog) {
            return;
        }

        const rect = dialog.getBoundingClientRect();
        const isOutside = event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (isOutside) {
            dialog.close();
        }
    });
});
