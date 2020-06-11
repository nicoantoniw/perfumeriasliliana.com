import store from '../store/index';

export default (err, message) => {
    if (err.response !== undefined && message === 'not here') {
        const statusError = err.response.status;
        switch (statusError) {
            case 500:
                store.dispatch("showLongerAlert", {
                    status: true,
                    type: "warning",
                    text: "Hubo un error en el servidor, intente de nuevo mas tarde"
                });
                break;
            case 422:
                store.dispatch("showAlert", {
                    status: true,
                    type: "error",
                    text: "Los datos ingresados son incorrectos"
                });
                break;
            case 403:
                store.dispatch("showAlert", {
                    status: true,
                    type: "error",
                    text: "No autorizado"
                });
                break;
            case 401:
                store.dispatch("showAlert", {
                    status: true,
                    type: "error",
                    text: "Contraseña incorrecta"
                });
                break;
        }
        return console.log(err);
    } else if (err.response !== undefined && typeof message === 'string') {

        const statusError = err.response.status;
        switch (statusError) {
            case 700:
                store.dispatch("showLongerAlert", {
                    status: true,
                    type: "warning",
                    text: 'Por favor, intente de nuevo en unos instantes'
                });
                break;
            case 605:
                store.dispatch("showLongerAlert", {
                    status: true,
                    type: "warning",
                    text: message
                });
                break;
            case 602:
                store.dispatch("showLongerAlert", {
                    status: true,
                    type: "warning",
                    text: 'Fondos insuficientes en la caja para realizar operacion'
                });
                break;
            case 601:
                store.dispatch("showLongerAlert", {
                    status: true,
                    type: "error",
                    text: 'Para comprobantes tipo A o C, el cliente debe tener un CUIT'
                });
                break;
            case 500:
                store.dispatch("showLongerAlert", {
                    status: true,
                    type: "warning",
                    text: "Hubo un error en el servidor, intente de nuevo mas tarde"
                });
                break;
            case 422:
                store.dispatch("showAlert", {
                    status: true,
                    type: "error",
                    text: "Los datos ingresados son incorrectos"
                });
                break;
            case 403:
                store.dispatch("showAlert", {
                    status: true,
                    type: "error",
                    text: "No autorizado"
                });
                break;
            case 404:
                store.dispatch("showAlert", {
                    status: true,
                    type: "error",
                    text: message
                });
                break;
            case 401:
                store.dispatch("showAlert", {
                    status: true,
                    type: "error",
                    text: "Contraseña incorrecta"
                });
                break;
        }
        console.log(err);
    } else if (err.response !== undefined && typeof message !== 'string') {
        const statusError = err.response.status;
        switch (statusError) {
            case 500:
                store.dispatch("showLongerAlert", {
                    status: true,
                    type: "warning",
                    text: "Hubo un error en el servidor, intente de nuevo mas tarde"
                });
                break;
            case 422:
                store.dispatch("showAlert", {
                    status: true,
                    type: "error",
                    text: "Los datos ingresados son incorrectos"
                });
                break;
            case 404:
                message.shift();
                break;
            case 403:
                store.dispatch("showAlert", {
                    status: true,
                    type: "error",
                    text: "No autorizado"
                });
                break;
            case 401:
                store.dispatch("showAlert", {
                    status: true,
                    type: "error",
                    text: "Contraseña incorrecta"
                });
                break;
        }
        console.log(err);
    } else {
        store.dispatch("showLongerAlert", {
            status: true,
            type: "warning",
            text: "Hubo un error en el servidor, intente de nuevo mas tarde"
        });
        console.log(err);
    }
};