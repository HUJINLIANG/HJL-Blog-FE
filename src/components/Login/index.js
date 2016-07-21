/**
 * Created by jialao on 2016/7/21.
 */
/**
 * Created by jialao on 2016/7/21.
 */
import React,{Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import * as Actions from '../../actions'


const mapStateToProps = (state) => {
    return {
        sns:state.sns.toJS()
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
};

const validate = values => {
    const errors = {};
    if(!values.email){
        errors.email = 'Required';
    }else if((!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(values.email))){
        errors.email = '地址无效'
    }

    if(!values.password){
        errors.password = 'Required';
    }

    return errors;
};

@connect(mapStateToProps,mapDispatchToProps)
@reduxForm({
    form:'signin',
    fields:['email','password'],
    validate
})
export default class Login extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        console.log('login');
        const {values} = this.props;
        console.log(values);
        const {actions} = this.props;
        actions.localLogin(values);
    }
    componentDidMount(){
        const {actions,sns} = this.props;
        if(sns.logins.length <1){
            actions.getSnsLogins();
        }

    }

    validatorCalss(field){
        let initClass = 'form-control'
        if(field.invalid){
            initClass += ' ng-invalid'
        }
        if(field.dirty){
            initClass += ' ng-dirty'
        }
        return initClass
    }

    render(){
        const {sns,fields:{email,password},dirty,invalid} = this.props;
        console.log(this.sns)
        return (
            <div className="signin-box">
                <div className="signin-container">
                    <h4 className="title">登 录</h4>
                    <form className="signin-form form-horizontal" id="signin" name="signin" onSubmit={this.handleSubmit} noValidate>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-envelope-o"></i>
                                </div>
                                <input type="email"
                                       className={ this.validatorCalss(email) }
                                       placeholder="邮箱"
                                    {...email} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-unlock-alt"></i></div>
                                <input type="password"
                                       className={ this.validatorCalss(password) }
                                       placeholder="密码"
                                    {...password} />
                            </div>
                        </div>
                        <div className="form-group">
                            <button disabled={ dirty && invalid } className="btn btn-primary btn-lg btn-block" type="submit">登 录</button>
                        </div>

                    </form>

                    <p className="text-center">您还可以通过以下方式直接登录</p>

                </div>
            </div>
        )
    }
}
//
// import React, { Component, PropTypes } from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import { reduxForm } from 'redux-form'
// import * as Actions from '../../actions'
//
//
// const mapStateToProps = state =>{
//     return {
//         // globalVal : state.globalVal.toJS(),
//         // auth: state.auth.toJS(),
//         sns: state.sns.toJS()
//     }
// }
//
// const mapDispatchToProps = dispatch =>{
//     return {
//         actions: bindActionCreators(Actions, dispatch)
//     }
// }
//
// const validate = values => {
//     const errors = {}
//     if (!values.email) {
//         errors.email = 'Required'
//     } else if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(values.email)) {
//         errors.email = '无效电子邮件地址'
//     }
//
//     if (!values.password) {
//         errors.password = 'Required'
//     } else if (values.password.length > 30) {
//         errors.password = '密码长度不超过30'
//     }
//     // if (!values.captcha) {
//     //   errors.captcha = 'Required'
//     // } else if (values.captcha.length !== 6) {
//     //   errors.captcha = '验证码是6位'
//     // }
//     return errors
// }
//
// @connect(mapStateToProps,mapDispatchToProps)
// @reduxForm({
//     form: 'signin',
//     fields: ['email', 'password'],
//     validate
// })
// export default class Login extends Component {
//     constructor(props){
//         super(props)
//         this.handleSubmit = this.handleSubmit.bind(this)
//         this.changeCaptcha = this.changeCaptcha.bind(this)
//     }
//
//     // static propTypes = {
//     //     actions: PropTypes.object.isRequired,
//     //     globalVal: PropTypes.object.isRequired,
//     //     auth: PropTypes.object.isRequired,
//     //     sns: PropTypes.object.isRequired,
//     //     values: PropTypes.object,
//     //     fields: PropTypes.object,
//     //     dirty: PropTypes.bool,
//     //     invalid: PropTypes.bool
//     // }
//
//     static fetchData(params){
//         return [Actions.getSnsLogins()]
//     }
//
//     changeCaptcha(e){
//         e.preventDefault()
//         const { actions } = this.props
//         actions.getCaptchaUrl()
//     }
//
//     handleSubmit (e) {
//         e.preventDefault();
//         console.log('login')
//         const { values } = this.props
//         const { actions } = this.props
//         actions.localLogin(values)
//     }
//     componentDidMount() {
//         const { actions,sns } = this.props
//         if(sns.logins.length < 1){
//             actions.getSnsLogins()
//         }
//     }
//
//     validatorCalss(field){
//         let initClass = 'form-control'
//         if(field.invalid){
//             initClass += ' ng-invalid'
//         }
//         if(field.dirty){
//             initClass += ' ng-dirty'
//         }
//         return initClass
//     }
//
//     render() {
//         const { sns, fields: { email, password, captcha }, dirty,invalid } = this.props
//         return (
//             <div className="signin-box">
//                 <div className="signin-container">
//                     <h4 className="title">登 录</h4>
//                     <form className="signin-form form-horizontal" onSubmit={this.handleSubmit} noValidate>
//                         <div className="form-group">
//                             <div className="input-group">
//                                 <div className="input-group-addon">
//                                     <i className="fa fa-envelope-o"></i>
//                                 </div>
//                                 <input type="email"
//                                        className={ this.validatorCalss(email) }
//                                        placeholder="邮箱"
//                                     {...email} />
//                             </div>
//                         </div>
//                         <div className="form-group">
//                             <div className="input-group">
//                                 <div className="input-group-addon"><i className="fa fa-unlock-alt"></i></div>
//                                 <input type="password"
//                                        className={ this.validatorCalss(password) }
//                                        placeholder="密码"
//                                     {...password} />
//                             </div>
//                         </div>
//
//                         <div className="form-group">
//                             <button disabled={ dirty && invalid } className="btn btn-primary btn-lg btn-block" type="submit">登 录</button>
//                         </div>
//
//                     </form>
//
//                     <p className="text-center">您还可以通过以下方式直接登录</p>
//
//                 </div>
//             </div>
//         )
//     }
// }