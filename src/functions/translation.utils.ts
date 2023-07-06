export const getStatusColor = (status: string) => {
    switch (status) {
        //orders status
        case 'canceled':
            return '220, 38, 38'
        case 'accepted':
            return '21, 128, 61'
        case 'preparation':
            return '249, 115, 22'
        case 'completed':
            return '21, 128, 61'
        case 'shipped':
            return '37, 99, 235'
        case 'delivered':
            return '21, 128, 61'
    }
}

export const getTranslatedStatus = (status: string) => {
    switch (status) {
        //orders status
        case 'canceled':
            return 'Annulé'
        case 'accepted':
            return 'Accepté'
        case 'preparation':
            return 'En préparation'
        case 'completed':
            return 'Terminé'
        case 'shipped':
            return 'Expédié'
        case 'delivered':
            return 'Livré'
    }
}

export const getPaymentStatusColor = (status: string) => {
    switch (status) {
        //orders status
        case 'canceled':
            return '220, 38, 38'
        case 'awaiting':
            return '249, 115, 22'
        case 'paid':
            return '21, 128, 61'
    }
}

export const getTranslatedPaymentStatus = (status: string) => {
    switch (status) {
        //Payment status
        case 'awaiting':
            return 'En attente'
        case 'paid':
            return 'Payé'
        case 'canceled':
            return 'Annulé'
    }
}