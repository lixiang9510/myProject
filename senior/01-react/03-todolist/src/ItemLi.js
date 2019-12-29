
import React,{Component} from 'react';
import PropTypes from 'prop-types'

class ItemLi extends Component{
	render(){
		const { handleDel,content } = this.props;
		return(
				<li onClick={handleDel}>{content}</li>
			)
	}
}
ItemLi.propTypes = {
	handleDel:PropTypes.func,
	content:PropTypes.string.isRequired
}
ItemLi.defaultProps = {
	content:"睡觉"
}
export default ItemLi;