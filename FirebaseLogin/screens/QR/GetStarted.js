import React from 'react';
import axios from "axios";
import {StyleSheet, View, TextInput, TouchableOpacity, Text,} from 'react-native';
import {View} from "react-native";

export default class GetStarted extends Component {
    constructor(props) {
        super();
        this.state = {
            inputValue: '',
            valueForQRCode: '',
            inputEmail: '',
            flag: 'true',
            res: ''
        };
    }

    getTextInputValue = () => {
        axios.post('https://us-central1-verdant-abacus-186311.cloudfunctions.net/genqr', {
            email: 'yadavsourav24071998@gmail.com'
        })
            .then(function (response) {

                this.setState({
                    res: response.data
                })
                // this.setState({valueForQRCode: this.state.inputValue});
                console.warn("Response: ", response.data);
            })
            .catch(function (error) {
                console.warn("Error: ", error);
            });
    };

    render() {

        return (
            <div>
                <TouchableOpacity
                    onPress={
                        this.getTextInputValue
                    }
                    activeOpacity={0.7}
                    style={styles.button}>
                    <Text style={styles.TextStyle}> Generate QR Code </Text>
                </TouchableOpacity>
            </div>
        )
    }

}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        paddingTop: 40,
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    }
});