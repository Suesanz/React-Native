import React, {Component, PureComponent} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text,} from 'react-native';
import QRCode from 'react-native-qrcode';
import axios from 'axios';
import * as firebase from "firebase";

// import GetStarted from './GetStarted'

class App extends Component {
    constructor() {
        super();
        this.state = {
            inputValue: '',
            valueForQRCode: '',
            inputEmail: ''
            // flag: 'true'
        };
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if( this.flag === false)
    // return false;
    //     else return true;
    // }

    getTextInputValue = () => {

        var user = firebase.auth().currentUser;

        if (user != null) {
            // name = user.displayName;
            // email = user.email;

        } else {
            console.warn("You are not Logged in");
        }

        axios.post('https://us-central1-verdant-abacus-186311.cloudfunctions.net/genqr', {
            email: user.email
        })

            .then((response) => {
                // console.warn("details: ", name+email+uid+response.data)
                this.setState({
                    valueForQRCode: "Name: " + user.displayName + "\n" + "VerifiedEmail id: " + user.email + "\n" + response.data
                })

                // this.setState({valueForQRCode: this.state.inputValue});
                // console.warn("Response: ", response.data);
            })
            .catch((error) => {
                console.warn("Error: ", error);
                // console.warn(this.state.valueForQRCode)
            });

    };


    render() {
        // var user = firebase.auth().currentUser;
        // var name, email, uid;
        //
        // if (user != null) {
        //     name = user.displayName;
        //     email = user.email;
        //     uid = user.uid;
        // }

        return (
            <View style={styles.MainContainer}>
                <QRCode
                    value={this.state.valueForQRCode}
                    //Setting the value of QRCode
                    size={250}
                    bgColor="#000"
                    fgColor="#fff"
                />
                {/*<TextInput*/}
                {/*    // Input to get the value to set on QRCode*/}
                {/*    style={styles.TextInputStyle}*/}
                {/*    onChangeText={text => this.setState({inputEmail: text})}*/}
                {/*    underlineColorAndroid="transparent"*/}
                {/*    placeholder="Enter Email"*/}
                {/*/>*/}
                {/*<TextInput*/}
                {/*    // Input to get the value to set on QRCode*/}
                {/*    style={styles.TextInputStyle}*/}
                {/*    onChangeText={text => this.setState({inputValue: text})}*/}
                {/*    underlineColorAndroid="transparent"*/}
                {/*    placeholder="Enter text to Generate QR Code"*/}
                {/*/>*/}
                {/*<GetStarted*/}

                {/*>*/}


                {/*</GetStarted>*/}
                <TouchableOpacity
                    onPress={
                        this.getTextInputValue
                        // this.setState({
                        //     flag: 'false'
                        // })

                    }
                    activeOpacity={0.7}
                    style={styles.button}>
                    <Text style={styles.TextStyle}> Generate QR Code </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default App;
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        paddingTop: 40,
    },

    TextInputStyle: {
        width: '100%',
        height: 40,
        marginTop: 20,
        borderWidth: 1,
        textAlign: 'center',
    },

    button: {
        width: '100%',
        paddingTop: 8,
        marginTop: 10,
        paddingBottom: 8,
        backgroundColor: '#F44336',
        marginBottom: 20,
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
});