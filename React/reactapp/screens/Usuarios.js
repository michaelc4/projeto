import React from 'react'
import { TouchableOpacity, View, FlatList, Text, Image } from 'react-native'
import { getParsedDate } from '../util/Util'
import { SEMIMAGEM } from '../image/image'
import { Icon } from 'react-native-elements'
import { EventRegister } from 'react-native-event-listeners'

export default class UsuariosScreen extends React.PureComponent {
    static navigationOptions = {
        title: 'Usuários'
    }

    state = {
        dados: []
    }

    async componentDidMount() {
        this.loadData()
        this.listener = EventRegister.addEventListener('reloadData', (data) => {
            this.loadData()
        });
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    async loadData() {
        const response = await fetch(`http://192.168.92.1:8080/projeto/usuario`)
        const responseJson = await response.json()
        this.setState({ dados: responseJson })
    }

    _renderItem = ({ item }) => {
        let data = getParsedDate(new Date(item.data));
        if (item.foto == null || item.foto.trim() == '') {
            return (
                <TouchableOpacity onPress={() => this._onItemPress(item)} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                    <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={SEMIMAGEM} />
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{ marginLeft: 10, fontSize: 18 }}>{item.nome}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 15 }}>{data}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this._onItemPress(item)} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                    <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={{ uri: `data:image/png;base64,${item.foto}` }} />
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{ marginLeft: 10, fontSize: 18 }}>{item.nome}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 15 }}>{data}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    _onItemPress = (item) => {
        this.props.navigation.navigate('Usuário', { usuario: item })
    }

    _onButtonPress = () => {
        this.props.navigation.navigate('Usuário', { usuario: null })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.dados}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.codigo.toString()}
                    ItemSeparatorComponent={() =>
                        <View style={{ height: 1, backgroundColor: '#f7f7f7' }}
                        />}
                />
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
                    onPress={() => this._onButtonPress()}
                >
                    <Icon name="add" size={30} color="#01a699" />
                </TouchableOpacity>
            </View>
        )
    }
}