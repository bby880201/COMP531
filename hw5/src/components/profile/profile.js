import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Info from './profileInfo'
import Update from './profileUpdate'

export const Profile = ()=>(
	<div className="container text-center">
		<div className="row">
			<div className="col-sm-6">
				<Info />
			</div>
			<div className="col-sm-6">
				<Update />
			</div>
		</div>
	</div>
)

export default connect()(Profile)