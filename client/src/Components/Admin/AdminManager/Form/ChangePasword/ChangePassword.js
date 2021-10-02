import React from 'react'
import axios from 'axios'
import './ChangePassword.scss'


class ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {

            }, 
            confirm_password: '',
            invalid: ''
        }
        this.error_confirm_password = React.createRef()
        this.error_new_password = React.createRef()
        this.error_old_password = React.createRef()
    }

    //Submit form
    handleSubmit = ()=>{

    }

    //Update input items
    handleChange = async (e)=>{
        const {name, value} = e.target
        const regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])([A-Za-z0-9]{10,20})$/
        if(name==='confirm_password'){
            this.setState({confirm_password: value})
        }else
            this.setState(pre=>({user:{...pre.user, [name]: value}}))
        let validConfirm = 0, validPassword = 0
        if(!regexp_password.test(this.state.user.new_password)){
            if(name === 'new_password'){
                validPassword = 0
                this.error_new_password.current.innerHTML = 'The length is from 10-20 chars:  number, upper & lower.'
            }
        }else {
            validPassword = 1
            this.error_new_password.current.innerHTML = ''
        }

        if(this.state.user.old_password !== this.state.confirm_password){
            if(name === 'confirm_password'){
                validConfirm = 0
                this.error_confirm_password.current.innerHTML = 'Password do not match'
            }  
        }else {
                validConfirm = 1
                this.error_confirm_password.current.innerHTML = ''
        }

        if(validConfirm && validPassword) {
            this.setState({invalid: 0})
        }else{
            this.setState({invalid: 1})
        }
    }

    //Hide user's changed password form
    onHideMemberForm = ()=>{
        this.props.onHideChangePasswordForm()
    }

    render() {
        return (
            <div className='change-password-background'>
                <div className='change-password'>
                    <p className='banner'>Change Password</p>
                    <div className='body'>
                        <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                            <div className='elm'>
                                <p>Old Password:</p>
                                <input type='password' name='old_password' required value={this.state.user.old_password} onChange={this.handleChange}/>
                                <p className='error-message' ref={this.error_old_password}></p>
                            </div>
                            <div className='elm'>
                                <p>New Password:</p>
                                <input type='password' name='new_password' required value={this.state.user.new_password} onChange={this.handleChange}/>
                                <p className='error-message' ref={this.error_new_password}></p>
                            </div>
                            <div className='elm'>
                                <p>Confirm Password:</p>
                                <input type='password' name='confirm_password' required value={this.state.confirm_password} onChange={this.handleChange}/>
                                <p className='error-message error-message-re-password' ref={this.error_confirm_password}></p>
                            </div>
                            <div className='elm elm-col'>
                                <input type='submit' className='btn' value='Change'/>
                                <input type='button' className='btn btn-primary' value='Cancel' onClick={this.onHideMemberForm}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default ChangePassword