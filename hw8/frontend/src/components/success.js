import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { ClearError } from './utilActions'
// an error notification panel that could be reused
export const SuccessPanel = ({strong, errMsg, errReset, className})=>(
	<div className={"alert alert-success fade in "+className}>
		<a href="#" className="close" data-dismiss="alert" aria-label="close" title="close" 
		onClick={(e)=> {
			errReset()
		}}>&times;</a>
		<strong>{strong}</strong>
		<span id="errMsg">{errMsg}</span>
	</div>
)

SuccessPanel.propTypes = {
	strong: PropTypes.string,
	errMsg: PropTypes.string.isRequired,
	errReset: PropTypes.func.isRequired,
	className: PropTypes.string
}

export default connect(null, (dispatch)=>{
	return {
		errReset: ()=>{ClearError()(dispatch)}
	}
})(SuccessPanel)
