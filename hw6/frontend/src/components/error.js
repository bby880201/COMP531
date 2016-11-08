import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { ClearError } from './utilActions'
// an error notification panel that could be reused
export const ErrorPanel = ({strong, errMsg, errReset, className})=>(
	<div className={"alert alert-danger fade in "+className}>
		<a href="#" className="close" data-dismiss="alert" aria-label="close" title="close" 
		onClick={(e)=> {
			errReset()
		}}>&times;</a>
		<strong>{strong}</strong>{errMsg}
	</div>
)

ErrorPanel.propTypes = {
	strong: PropTypes.string,
	errMsg: PropTypes.string.isRequired,
	errReset: PropTypes.func.isRequired,
	className: PropTypes.string
}

export default connect(null, (dispatch)=>{
	return {
		errReset: ()=>{ClearError()(dispatch)}
	}
})(ErrorPanel)
