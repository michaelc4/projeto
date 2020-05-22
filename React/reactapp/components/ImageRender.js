import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { SEMIMAGEM } from '../image/image'
import ImagePicker from 'react-native-image-picker';

export default class ImageRender extends Component {

    _onImagePress = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                this.props.onPressItem(response.data);
            }
        });
    }

    render() {
        if (this.props.foto == null || this.props.foto.trim() == '') {
            return (
                <TouchableOpacity
                    style={{
                        borderWidth: 3,
                        borderColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 205,
                        height: 205,
                        backgroundColor: '#fff',
                    }}
                    onPress={() => this._onImagePress()}
                >
                    <Image style={{ height: 200, width: 200, maxWidth: 200, maxHeight: 200 }} source={SEMIMAGEM} />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    style={{
                        borderWidth: 3,
                        borderColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 205,
                        height: 205,
                        backgroundColor: '#fff',
                    }}
                    onPress={() => this._onImagePress()}
                >
                    <Image style={{ height: 200, width: 200, maxWidth: 200, maxHeight: 200 }} source={{ uri: `data:image/png;base64,${this.props.foto}` }} />
                </TouchableOpacity>
            )
        }
    }
}