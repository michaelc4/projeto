import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { SEMIMAGEM } from '../image/image'

export default class ImageRender extends Component {
    render() {
        if (this.props.foto == null || this.props.foto.trim() == '') {
            return (
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        height: 70,
                        backgroundColor: '#fff',
                    }}
                >
                    <Image style={{ height: 200, width: 200 }} source={SEMIMAGEM} />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        height: 70,
                        backgroundColor: '#fff',
                    }}
                >
                    <Image style={{ height: 200, width: 200 }} source={{ uri: `data:image/png;base64,${this.props.foto}` }} />
                </TouchableOpacity>
            )
        }
    }
}