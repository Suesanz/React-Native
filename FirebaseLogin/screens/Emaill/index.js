// @flow
import * as React from 'react';
import {Button} from 'react-native';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import InputField from '../../components/InputField';
import PropTypes from 'prop-types';
import {h, totalSize, w} from "../../api/Dimensions";
import {sendGridEmail} from 'react-native-sendgrid'
import * as firebase from "firebase";


export default class Email extends React.Component {
    state = {
        isEmailCorrect: false,
        isName: false,
    };

    changeInputFocus = name => () => {
        switch (name) {
            case 'Name':
                this.setState({isNameCorrect: this.name.getInputValue() === ''});
                this.email.input.focus();
                break;
            case 'Email':
                this.setState({isEmailCorrect: this.email.getInputValue() === ''});
                this.password.input.focus();
                break;
            default:
                this.setState({
                    isRepeatCorrect: (this.repeat.getInputValue() === ''
                        || this.repeat.getInputValue() !== this.password.getInputValue())
                });
        }
    };
    postform = () => {
        var user = firebase.auth().currentUser;
        var  useremail;

        if (user != null) {
            useremail = user.email;

        }
        // const name = this.name.getInputValue()
        const email = this.email.getInputValue()
        const SENDGRIDAPIKEY = "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";
        const FROMEMAIL = useremail;
        const TOMEMAIL = email;
        const SUBJECT = "You have a new message";
        console.warn(FROMEMAIL)
        const ContactDetails = `Hello ${user.displayName} <br> Do you accept the appointment? If yes, <a href="https://us-central1-verdant-abacus-186311.cloudfunctions.net/sendqr?email= ${FROMEMAIL}"> Yes</a> <br> If no, <a href=\"#\">No</a>`
        const sendRequest = sendGridEmail(SENDGRIDAPIKEY, TOMEMAIL, FROMEMAIL, SUBJECT, ContactDetails, "text/html")
        sendRequest.then((response) => {
            console.warn("Success")
            this.props.change('qr')()
        }).catch((error) => {
            console.warn(error)
        });
    }

    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.appointment}>Book an Appointment</Text>
                <InputField
                    placeholder="Email"
                    keyboardType="email-address"
                    style={styles.email}
                    error={this.state.isEmailCorrect}
                    focus={this.changeInputFocus}
                    ref={ref => this.email = ref}
                />
                {/*<InputField*/}
                {/*    placeholder="Name"*/}
                {/*    autoCapitalize="words"*/}
                {/*    error={this.state.isName}*/}
                {/*    style={styles.input}*/}
                {/*    focus={this.changeInputFocus}*/}
                {/*    ref={ref => this.name = ref}*/}
                {/*/>*/}
                <Button
                    onPress={this.postform}
                    title="Learn More"
                    style={styles.button}
                    accessibilityLabel="Book an appointment"
                />
            </View>

        );
    };
};
Email.propTypes = {
    change: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: h(18)
    },
    icon: {
        width: w(70),
        height: h(30),
        marginTop: h(14),
        marginBottom: h(7),
    },
    TextInputStyle: {
        width: '100%',
        height: 40,
        marginTop: 20,
        borderWidth: 1,
        textAlign: 'center',
    },
    appointment: {
        color: 'white',
        fontSize: totalSize(4.5),
        marginBottom: h(5),
        fontWeight: '700',
    },
    textContainer: {
        width: w(100),
        flexDirection: 'row',
        marginTop: h(8),
    },
    qr: {
        width: '100%',
        paddingTop: 8,
        marginTop: 10,
        paddingBottom: 8,
        backgroundColor: '#F44336',
        marginBottom: 20,
    },
    button: {
        width: '80%',
        height: '8.5%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: w(2),
        backgroundColor: '#888',
        borderRadius: w(10),
        marginTop: h(8),
    }, text: {
        color: 'white',
        fontWeight: '700',
        paddingVertical: h(2),
        fontSize: totalSize(3.1),
    },
    email: {
        marginBottom: h(4.5),
        marginVertical: h(1.8),
    },
    input: {
        marginVertical: h(1),
    },
    touchable: {
        flex: 1,
    },
})