import {
  googleAuthIsAgreeFalse,
  googleAuthSendGoogleSheetSyncRequest,
} from 'actions/google-auth-success'

const REGEXP_FOR_GOOGLE_SHEET = new RegExp('/spreadsheets/d/([a-zA-Z0-9-_]+)')

export const onGoogleSync =
  (dispatch) => (googleSheetLink, setValidationError) => {
    if (!REGEXP_FOR_GOOGLE_SHEET.exec(googleSheetLink)) {
      setValidationError(true)
    } else {
      setValidationError(false)
      dispatch(googleAuthIsAgreeFalse())
      dispatch(googleAuthSendGoogleSheetSyncRequest())
    }
  }
