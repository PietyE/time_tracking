import React from 'react'
import { connect } from 'react-redux'

import Spinner from 'components/ui/spinner'
import { getIsFetchingReport } from 'selectors/timereports'

function SpinnerC({ isFetchingReports }) {
  if (isFetchingReports) {
    return <Spinner />
  }
  return null
}

const mapStateToProps = state => ({
  isFetchingReports: getIsFetchingReport(state),
})

export default connect(mapStateToProps)(SpinnerC)
