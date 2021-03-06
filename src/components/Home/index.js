/**
 * Created by jialao on 2016/7/22.
 */
import React,{Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions'
import Tags from './tags'
import Articles from './article'
import Footer from './footer'
import LoadMore from './loadMore'
import {getCookie} from '../../utiles/authService'

const mapStateToProps = (state) => {

  return {
      tagList:state.tagList.toJS(),
      articleList:state.articleList.toJS(),
      options:state.options.toJS(),
      auth:state.auth.toJS()
  }
};

const mapDispatchToProps = dispatch => {
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
};

@connect(mapStateToProps,mapDispatchToProps)
export default class Home extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){

        console.log('didmount')
        const{actions,tagList,articleList} = this.props;
        if(tagList.length < 1){
            actions.getTagList()
        }
        // if(articleList.items.length < 1){
            actions.getArticleList()
        // }
        //bug!
        
        // let token = getCookie('token');
        // if(token){
        //     actions.loginSuccess(token);
        //     actions.getUserInfo(token);
        // }
        // actions.loginSuccess(token);
        // debugger;
        // let {auth} = this.props;
        // if(auth.token&&!auth.user){
        //     actions.getUserInfo();
        // }
    }

    handleChange(e,option,isAdd=false){
        e.preventDefault();
        const {actions} = this.props;
        actions.changeOptions(option);
        actions.getArticleList(isAdd)
    }

    render(){
        const {tagList,articleList,options} = this.props;

        return (

            <div>
                <div className="background">
                </div>
                <div className="outer-container">
                    <div className="wrap-container">
                        <div className="content-outer">
                            <div className="content-inner">
                                <Tags tagList={tagList} options={options} isFetching={articleList.isFetching} changeSort={this.handleChange}/>
                                <h1>归档
                                    <span className="list-count">共{articleList.count}篇文章</span>
                                </h1>
                                <Articles articleList={articleList.items} changeSort={this.handleChange}/>
                                {(articleList.items.length > 0&&
                                    <LoadMore options={options} isMore={articleList.isMore} isFetching={articleList.isFetching} addData={this.handleChange}/>
                                )}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
            
        )
    }
}