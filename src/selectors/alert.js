const getAlertData = state => state.alert;

const getAlertTypeSelector = state => getAlertData(state).type;

const getAlertTitleSelector = state => getAlertData(state).title

const getAlertMessageSelector = state => getAlertData(state).message

const getAlertDelaySelector = state => getAlertData(state).delay

const getAlertIsShownAlertSelector = state => getAlertData(state).isShownAlert

export {
    getAlertTypeSelector,
    getAlertTitleSelector,
    getAlertDelaySelector,
    getAlertIsShownAlertSelector,
    getAlertMessageSelector
}
