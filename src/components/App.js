/**
 * Created by jialao on 2016/7/20.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import ScrollTop from '../components/ScrollTop'
import Toaster from '../components/Toaster'
import Header from '../components/Header'
import $ from 'jquery'


const mapStateToProps = state => {
    // console.log(state.globalVal.toJS())
    return {
        showmsg:state.showmsg.toJS(),
        auth:state.auth.toJS()
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
};

@connect(mapStateToProps,mapDispatchToProps)
export default class App extends React.Component{
    constructor(props){
        super(props)
    }
    
    static fetchDate(){
        return [];
    }
    componentDidMount(){
        let {auth,actions} = this.props;
        if(auth.token&&!auth.user){
            actions.getUserInfo();
        }
        window.addEventListener('scroll',function(e){
            console.log(window.scrollY)
        })
        $('body').scroll(function(){
            console.log('top-box-sc')
        })
    }
    
    componentWillReceiveProps(nextProps){
            
    }
    
    render(){
      
        const {showmsg,actions,children,location,auth} = this.props;
        return (
            <div className="main-container">
                <Header changeStyleMode={actions.changeStyleMode} location={location} auth={auth} logout={actions.logout}/>
                {children}
                <Toaster msg={showmsg} hideMsg={actions.hideMsg} />
                <ScrollTop />
            </div>
        )
    }
}