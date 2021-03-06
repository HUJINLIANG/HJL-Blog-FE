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
import SNSLogin from './snsLogin'

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

        return (
        <div>
             <div className="background">
            </div>
            <div className="outer-container">
            <div className="wrap-container">
                <div className="content-outer">
                    <div className="content-inner">
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
                                        <button disabled={ invalid } className="btn btn-primary btn-lg btn-block" type="submit">登 录</button>
                                    </div>

                                </form>

                                <p className="text-center">您还可以通过以下方式直接登录</p>
                                <SNSLogin logins={sns.logins}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        

        )
    }
}
