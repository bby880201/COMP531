import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Info from './profileInfo'
import InfoUpdate from './profileUpdate'

// profile page that shows profile of user and could update profile info
export const Profile = ()=>(
	<div className="container text-center">
		<div className="row">
			<div className="col-sm-6">
				<Info />
			</div>
			<div className="col-sm-6">
				<InfoUpdate />
			</div>
		</div>
	</div>
)

export default connect()(Profile)