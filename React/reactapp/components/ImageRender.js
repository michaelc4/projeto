import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { SEMIMAGEM } from '../image/image'

export default class ImageRender extends Component {

    _onImagePress = () => {

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