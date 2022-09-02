import { showAlert } from 'actions/alert'
import { DANGER_ALERT } from 'constants/alert-constant'
import {
  googleAuthIsAgreeFalse,
  googleAuthSendGoogleSheetSyncRequest,
} from 'actions/google-auth-success'

const REGEXP_FOR_GOOGLE_SHEET = new RegExp('/spreadsheets/d/([a-zA-Z0-9-_]+)')

export const onGoogleSync = (dispatch) => (googleSheetLink) => {
  if (!REGEXP_FOR_GOOGLE_SHEET.exec(googleSheetLink)) {
    dispatch(
      showAlert({
        type: DANGER_ALERT,
        title: 'Something went wrong',
        message:
          'You paste invalid link to google sheet. Try sync again with correct link',
        delay: 4000,
      })
    )
  } else {
    dispatch(googleAuthIsAgreeFalse())
    dispatch(googleAuthSendGoogleSheetSyncRequest())
  }
}
