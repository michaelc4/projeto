import React from 'react'
import { ScrollView, TouchableOpacity, View, Text } from 'react-native'
import { getParsedDate, getParsedDateJson, numberToString } from '../util/Util'
import { Icon, Input } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import Toast from 'react-native-simple-toast'
import ImageRender from '../componets/ImageRender'

export default class UsuarioScreen extends React.PureComponent {
    static navigationOptions = {
        title: 'Usuário'
    }

    state = {
        usuario: { codigo: 0, nome: '', data: '', foto: '' },
        isDatePickerVisible: false
    }

    constructor(props) {
        super(props);
        let obj = this.props.route.params
        if (obj != null && obj.usuario != null) {
            this.state.usuario = obj.usuario
        }
    }

    _onDatePress = () => {
        this.setState({ isDatePickerVisible: true })
    }

    _hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false })
    };

    _handleConfirm = (date) => {
        this.setState(prevState => {
            let usuario = Object.assign({}, prevState.usuario);
            usuario.data = getParsedDateJson(date);
            return { usuario, isDatePickerVisible: false };
        })
    };

    _onPressSave = () => {
        let usuario = this.state.usuario
        let error = false

        if (usuario.nome == null || usuario.nome == undefined || usuario.nome.trim() == '') {
            error = true
            Toast.show('Informe o nome');
        }

        if (!error) {
            if (usuario.data != null && usuario.data.trim() == '') {
                usuario.data = null
            }
            if (usuario.foto != null && usuario.foto.trim() == '') {
                usuario.foto = null
            }
            let bodyJson = JSON.stringify(usuario);
            if (usuario.codigo == 0) {
                let data = {
                    method: 'POST',
                    body: bodyJson
                }
                fetch(`http://192.168.92.1:8080/projeto/usuario`, data)
                    .then((response) => response.json())
                    .then((responseData) => {
                        this.props.navigation.navigate('Usuários')
                    })
                    .done()
            } else {
                let data = {
                    method: 'PUT',
                    body: bodyJson
                }
                fetch(`http://192.168.92.1:8080/projeto/usuario/${usuario.codigo}`, data)
                    .then((response) => response.json())
                    .then((responseData) => {
                        this.props.navigation.navigate('Usuários')
                    })
                    .done()
            }
        }
    }

    render() {
        let usuario = this.state.usuario
        var disp = usuario.codigo != 0 ? 'flex' : 'none'
        return (
            <ScrollView style={{ flex: 1, marginTop: 20 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ display: disp }}>
                    <Input
                        label='Código'
                        disabled={true}
                        value={numberToString(usuario.codigo)}
                    />
                </View>
                <Input
                    label='Nome'
                    value={usuario.nome}
                    onChangeText={value => this.setState(prevState => {
                        let usuario = Object.assign({}, prevState.usuario);
                        usuario.nome = value;
                        return { usuario };
                    })}
                />
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 0.8 }} >
                        <Input
                            label='Data de Nascimento'
                            disabled={true}
                            value={usuario.data != '' ? getParsedDate(new Date(usuario.data)) : ''}
                        />
                    </View>
                    <View style={{ flex: 0.2 }} >
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.2)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 70,
                                height: 70,
                                backgroundColor: '#fff',
                                borderRadius: 100
                            }}
                            onPress={() => this._onDatePress()}
                        >
                            <Icon name="calendar" type="font-awesome" size={30} color="#01a699" />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={this.state.isDatePickerVisible}
                            mode="date"
                            onConfirm={(date) => this._handleConfirm(date)}
                            onCancel={() => this._hideDatePicker()}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 80 }}>
                    <ImageRender foto={usuario.foto} />
                </View>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        height: 70,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                    }}

                >
                    <Icon name="save" size={30} color="#01a699" />
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

