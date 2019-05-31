import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {KeyboardAvoidingView, StyleSheet, ImageBackground} from 'react-native';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import Email from './screens/Emaill';
import Qr from './screens/QR';
import {w} from './api/Dimensions';
import * as firebase from "firebase"

export default class FirebaseLogin extends Component {
    componentDidMount() {
        let config = {
            // var firebaseConfig = {
            apiKey: "AIzaSyDg_Lpf0gNlIdBNmmOWKs7T9UvLud3Qgeg",
            authDomain: "verdant-abacus-186311.firebaseapp.com",
            databaseURL: "https://verdant-abacus-186311.firebaseio.com",
            projectId: "verdant-abacus-186311",
            storageBucket: "verdant-abacus-186311.appspot.com",
            messagingSenderId: "687785097148",
            appId: "1:687785097148:web:9e76cbc4e9ed65b0"
            // };
        };
        firebase.initializeApp(config);
    }

    state = {
        currentScreen: 'register', // can be: 'login' or 'register' or 'forgot'
    };

    changeScreen = screenName => () => {
        this.setState({currentScreen: screenName});
    };

    userSuccessfullyLoggedIn = (user) => {
        this.props.login(user);
    };

    render() {
        let screenToShow;

        switch (this.state.currentScreen) {
            case 'login':
                screenToShow = <Login change={this.changeScreen} success={this.userSuccessfullyLoggedIn}/>;
                break;
            case 'register':
                screenToShow = <Register change={this.changeScreen}/>;
                break;
            case 'forgot':
                screenToShow = <ForgotPassword change={this.changeScreen}/>;
                break;
            case 'email':
                screenToShow = <Email change={this.changeScreen}/>
                break;
            case 'qr':
                screenToShow = <Qr change={this.changeScreen}/>
        }

        return (
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={-w(40)}
                style={styles.container}
            >
                <ImageBackground
                    source={this.props.background}
                    style={styles.background}
                    resizeMode="stretch"

                >
                    {screenToShow}
                </ImageBackground>
            </KeyboardAvoidingView>
        )
    }
}

FirebaseLogin.propTypes = {
    login: PropTypes.func.isRequired,
};

FirebaseLogin.defaultProps = {
    background: null,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#555',
    },
    background: {
        width: '100%',
        height: '100%',
    }
});
